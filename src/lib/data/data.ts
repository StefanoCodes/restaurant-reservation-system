import "server-only";
import { reservationsTable, Table } from "@/db/schema";
import { tablesTable } from "@/db/schema";
import { db } from "@/db/db";
import { eq, and, or, gte, lt, lte, gt, sql } from "drizzle-orm";
import { BOOKING_DURATION } from "@/utils/constants";

export const getAllTables = async (): Promise<Table[]> => {
	try {
		const tables = await db.select().from(tablesTable);
		return tables;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getAvailableTables = async (
	date: string,
	time: string,
	numberOfPeople: string
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
								gt(reservationsTable.endTime, requestedStartTime)
							),
							// New reservation ends during an existing reservation
							and(
								lt(reservationsTable.startTime, requestedEndTime),
								gte(reservationsTable.endTime, requestedEndTime)
							),
							// Existing reservation falls completely within requested time
							and(
								gte(reservationsTable.startTime, requestedStartTime),
								lte(reservationsTable.endTime, requestedEndTime)
							)
						)
					)
				);
			return {
				...table,
				status:
					tableReservations.length === 0
						? table.capacity >= parseInt(numberOfPeople, 10)
							? "available"
							: "unavailable"
						: "reserved",
			};
		})
	);
	return availableTables;
};
