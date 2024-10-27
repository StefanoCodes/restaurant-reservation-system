import "server-only";
import { db } from "@/db/db";
import { and, desc, eq } from "drizzle-orm";
import {
	permissionsTable,
	reservationsTable,
	Table,
	tablesTable,
	usersTable,
} from "@/db/schema";
import { ReservationCardProps, User } from "@/lib/types";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { BOOKING_DURATION, CLOSE_HOURS, OPEN_HOURS } from "@/utils/constants";
export async function isAuthenticatedUser() {
	const client = await createClient();
	const {
		data: { user },
		error,
	} = await client.auth.getUser();
	if (error) {
		throw new Error(error.message);
	}
	if (!user) {
		redirect("/login");
	}

	const userInDb = await getUserDetails(user.id);
	if (!userInDb) {
		throw new Error("User not found");
	}

	return { user, userInDb };
}
export async function isAuthorizedUser() {
	const { user, userInDb } = await isAuthenticatedUser();
	if (!user || !userInDb) return;
	const userRole = await getUserRole(user.id);
	if (userRole !== "admin") return;
	return { user, userInDb };
}
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
export const getBookingsForUser = async (
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

export const getBookings = async (): Promise<ReservationCardProps[]> => {
	const client = await createClient();
	const {
		data: { user },
		error,
	} = await client.auth.getUser();
	if (error || !user) {
		redirect("/login");
	}
	const userRole = await getUserRole(user.id);
	if (userRole !== "admin") {
		return [];
	}

	// now we protected this action / function to ensure that the only person calling is authroized and authenticated to do so

	const bookings = await db
		.select({
			reservation: reservationsTable,
			table: tablesTable,
			user: usersTable,
			reservationDate: reservationsTable.reservationDate,
		})
		.from(reservationsTable)
		.innerJoin(tablesTable, eq(reservationsTable.tableId, tablesTable.id))
		.innerJoin(usersTable, eq(reservationsTable.userId, usersTable.userId));
	if (!bookings) {
		return [];
	}
	return bookings;
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

export const getAvailableTables = async (
	date: Date,
	numberOfPeople: number,
	time: string
) => {
	// based on the date, time and number of people we will get the available tables
	// we will use the getReservationsForDateSelected function to get the reservations for the date selected
	// then we will filter the tables based on the capacity and the time slot
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
	const maxNumberOfPeople = await db
		.select({
			capacity: tablesTable.capacity,
		})
		.from(tablesTable)
		.orderBy(desc(tablesTable.capacity));
	return maxNumberOfPeople[0].capacity;
}
