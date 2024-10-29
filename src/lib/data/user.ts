import "server-only";
import { db } from "@/db/db";
import { reservationsTable, tablesTable, usersTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

import { isAuthorizedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";

// User Bookings Get Requests
// User Bookings Get Requests
export const getBookingsForUser = async () => {
	const { userInDb } = await isAuthorizedUser();
	if (!userInDb) redirect("/login");
	try {
		const bookings = await db
			.select({
				reservation: reservationsTable,
				table: tablesTable,
				user: usersTable,
				reservationDate: reservationsTable.reservationDate,
			})
			.from(reservationsTable)
			.where(eq(reservationsTable.userId, userInDb.userId))
			.innerJoin(tablesTable, eq(reservationsTable.tableId, tablesTable.id))
			.innerJoin(usersTable, eq(reservationsTable.userId, usersTable.userId));
		return bookings;
	} catch (error) {
		console.error("Error fetching bookings:", error);
		return [];
	}
};

export const getReservationById = async (reservationId: string) => {
	const reservation = await db
		.select()
		.from(reservationsTable)
		.where(eq(reservationsTable.id, reservationId))
		.innerJoin(tablesTable, eq(reservationsTable.tableId, tablesTable.id))
		.innerJoin(usersTable, eq(reservationsTable.userId, usersTable.userId));
	if (!reservation[0]) {
		return null;
	}
	return reservation[0];
};
export const getTableIdByName = async (tableName: string) => {
	try {
		const tableId = await db
			.select({ id: tablesTable.id })
			.from(tablesTable)
			.where(eq(tablesTable.name, tableName));
		return tableId[0].id;
	} catch (error) {
		console.error("Error fetching table ID:", error);
		return null;
	}
};
// TODO: this function will be used to check if the table is already booked for the selected date and time
export const getReservationsForDateSelected = async (
	tableId: string,
	date: Date,
	time: string
) => {
	const reservations = await db
		.select({
			reservationDate: reservationsTable.reservationDate,
			startTime: reservationsTable.startTime,
			endTime: reservationsTable.endTime,
		})
		.from(reservationsTable)
		.where(
			and(
				eq(reservationsTable.tableId, tableId),
				eq(reservationsTable.reservationDate, date.toDateString()),
				eq(reservationsTable.startTime, time)
			)
		);
	if (!reservations[0]) {
		return [];
	}
	return reservations;
};

export async function getMaxCapacity() {
	try {
		const maxNumberOfPeople = await db
			.select({
				capacity: tablesTable.capacity,
			})
			.from(tablesTable)
			.orderBy(desc(tablesTable.capacity));
		return maxNumberOfPeople[0].capacity;
	} catch (error) {
		console.error("Error fetching max capacity:", error);
		return null;
	}
}
