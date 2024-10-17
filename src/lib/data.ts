"use server";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import {
	permissionsTable,
	reservationsTable,
	Table,
	tablesTable,
	usersTable,
} from "@/db/schema";
import { ReservationCardProps, User } from "@/lib/types";

export const getUserDetails = async (userId: string): Promise<User | null> => {
	const userDetails = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.userId, userId));
	if (!userDetails[0]) {
		return null;
	}
	return userDetails[0];
};

export const getUserReservationDetails = async (userId: string) => {
	const userDetails = await db
		.select({
			name: usersTable.name,
			email: usersTable.email,
			phoneNumber: usersTable.phoneNumber,
			userId: usersTable.userId,
		})
		.from(usersTable)
		.where(eq(usersTable.userId, userId));
	if (!userDetails[0]) {
		return null;
	}
	return userDetails[0];
};
// Bookings Actions
export const getBookings = async (
	userId: string
): Promise<ReservationCardProps[]> => {
	// we will join the table and user tables to the reservations table to get the table name and the user name
	const bookings = await db
		.select({
			reservation: reservationsTable,
			table: tablesTable,
			user: usersTable,
			reservationDate: reservationsTable.reservationDate,
		})
		.from(reservationsTable)
		.where(eq(reservationsTable.userId, userId))
		.innerJoin(tablesTable, eq(reservationsTable.tableId, tablesTable.id))
		.innerJoin(usersTable, eq(reservationsTable.userId, usersTable.userId));
	if (!bookings) {
		return [];
	}
	return bookings as ReservationCardProps[];
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
export const getTables = async (): Promise<Table[]> => {
	const tables = await db.select().from(tablesTable);
	if (!tables[0]) {
		return [];
	}
	return tables;
};

export const getUserRole = async (userId: string) => {
	// we will get the role of the user from the permissions table
	const user = await db
		.select()
		.from(permissionsTable)
		.where(eq(permissionsTable.memberId, userId));
	if (!user[0]) {
		return null;
	}
	return user[0].role;
};
