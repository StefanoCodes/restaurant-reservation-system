import "server-only";
import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
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
import { revalidatePath } from "next/cache";
export async function isAuthenticatedUser() {
	const client = await createClient();
	const {
		data: { user },
		error,
	} = await client.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	const userInDb = await getUserDetails(user.id);
	if (!userInDb) {
		throw new Error("User not found");
	}

	if (error) {
		throw new Error(error.message);
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

// BOOKING CHECKS

// Check if the table is available for the selected time and date
// export const checkTableAvailability = async (tableId: string, date: Date, time: string) => {
// 	const reservation = await db
// 		.select()
// 		.from(reservationsTable)
// 		.where(and(eq(reservationsTable.tableId, tableId), eq(reservationsTable.reservationDate, date), eq(reservationsTable.reservationTime, time)));
// 	if (reservation[0]) {
// 		return false;
// 	}
// Check for overlapping reservations using inbetween times function
// export const checkForOverlappingReservations = async (
// 	tableId: string,
// 	date: Date,
// 	time: string
// ) => {
// 	const reservation = await db
// 		.select()
// 		.from(reservationsTable)
// 		.where(and(eq(reservationsTable.tableId, tableId), eq(reservationsTable.reservationDate, date), eq(reservationsTable.reservationTime, time)));

// 	}

// import { and, eq, or, sql } from "drizzle-orm";

// ... existing imports ...

// export const checkForOverlappingReservations = async (
// 	tableId: string,
// 	date: Date,
// 	time: string
// ): Promise<boolean> => {
// 	const reservationTime = new Date(`${date.toDateString()} ${time}`);
// 	const endTime = new Date(reservationTime.getTime() + 2 * 60 * 60 * 1000); // Assuming 2-hour reservation slots

// 	const overlappingReservations = await db
// 		.select()
// 		.from(reservationsTable)
// 		.where(
// 			and(
// 				// Ensure we're checking for the specific table
// 				eq(reservationsTable.tableId, tableId),
// 				// Check for the same date
// 				eq(reservationsTable.reservationDate, date),
// 				// Check for time overlaps
// 				or(
// 					// New reservation starts during an existing reservation
// 					and(
// 						sql`TIME(${reservationsTable.reservationTime}) <= TIME(${time})`,
// 						sql`TIME(${reservationsTable.reservationTime}) + INTERVAL 2 HOUR > TIME(${time})`
// 					),
// 					// New reservation ends during an existing reservation
// 					and(
// 						sql`TIME(${reservationsTable.reservationTime}) < TIME(${endTime.toTimeString().split(' ')[0]})`,
// 						sql`TIME(${reservationsTable.reservationTime}) + INTERVAL 2 HOUR >= TIME(${endTime.toTimeString().split(' ')[0]})`
// 					)
// 				)
// 			)
// 		);

// 	return overlappingReservations.length > 0;
// };
