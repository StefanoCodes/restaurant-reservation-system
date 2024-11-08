import "server-only";
import { reservationsTable, Table } from "@/db/schema";
import { tablesTable } from "@/db/schema";
import { db } from "@/db/db";
import { eq, and, or, gte, lt, lte, gt } from "drizzle-orm";
import { BOOKING_DURATION } from "@/lib/constants";

export const getAllTables = async (): Promise<Table[]> => {
  try {
    const tables = await db
      .select()
      .from(tablesTable)
      .where(eq(tablesTable.status, "available"));
    return tables;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAvailableTables = async (
  date: string,
  time: string,
  numberOfPeople: string,
) => {
  // Ensure time is in HH:mm format
  const requestedStartTime = time; // e.g., "16:00 --- 18:00" "17:00 --- 19:00"

  // Calculate end time (add 2 hours)
  const [hours, minutes] = time.split(":").map(Number);
  const endHours = (hours + BOOKING_DURATION).toString().padStart(2, "0");
  const requestedEndTime = `${endHours}:${minutes.toString().padStart(2, "0")}`; // e.g., "18:00"

  // Get all tables first
  const allTables = await getAllTables();

  // Get reservations for each table separately for the specified date
  const availableTables = await Promise.all(
    allTables.map(async (table) => {
      const tableReservations = await db
        .select()
        .from(reservationsTable)
        .where(
          and(
            eq(reservationsTable.reservationDate, date),
            eq(reservationsTable.tableId, table.id),
            or(
              // New reservation starts during an existing reservation
              and(
                lte(reservationsTable.startTime, requestedStartTime),
                gt(reservationsTable.endTime, requestedStartTime),
              ),
              // New reservation ends during an existing reservation
              and(
                lt(reservationsTable.startTime, requestedEndTime),
                gte(reservationsTable.endTime, requestedEndTime),
              ),
              // Existing reservation falls completely within requested time
              and(
                gte(reservationsTable.startTime, requestedStartTime),
                lte(reservationsTable.endTime, requestedEndTime),
              ),
            ),
          ),
        );
      // so here we are overriding the status of the table based on the reservations but not in the db changing the status of the table
      return {
        ...table,
        status:
          tableReservations.length === 0
            ? table.capacity >= parseInt(numberOfPeople, 10)
              ? "available"
              : "unavailable"
            : "reserved",
      };
    }),
  );
  return availableTables.sort((a, b) => a.capacity - b.capacity);
};

export const checkIfReservationAlreadyExists = async (
  date: string,
  time: string,
  tableId: string,
) => {
  // Calculate end time (add 2 hours)
  const [hours, minutes] = time.split(":").map(Number);
  const endHours = (hours + BOOKING_DURATION).toString().padStart(2, "0");
  const requestedEndTime = `${endHours}:${minutes.toString().padStart(2, "0")}`;

  const reservation = await db
    .select()
    .from(reservationsTable)
    .where(
      and(
        eq(reservationsTable.reservationDate, date),
        eq(reservationsTable.tableId, tableId),
        or(
          // New reservation starts during an existing reservation
          and(
            lte(reservationsTable.startTime, time),
            gt(reservationsTable.endTime, time),
          ),
          // New reservation ends during an existing reservation
          and(
            lt(reservationsTable.startTime, requestedEndTime),
            gte(reservationsTable.endTime, requestedEndTime),
          ),
          // Existing reservation falls completely within requested time
          and(
            gte(reservationsTable.startTime, time),
            lte(reservationsTable.endTime, requestedEndTime),
          ),
        ),
      ),
    );
  return reservation.length > 0;
};
