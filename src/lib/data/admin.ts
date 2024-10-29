import "server-only";

import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { db } from "@/db/db";
import {
	permissionsTable,
	reservationsTable,
	Table,
	tablesTable,
	usersTable,
} from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

// Admin GET Requests

export async function getAllUsers() {
	await isAuthorizedAdmin();

	try {
		const allUsersInDb = await db
			.select({ userId: permissionsTable.memberId })
			.from(permissionsTable)
			.where(eq(permissionsTable.role, "user"));
		// userId is a string and we need to filter out the null values from the array
		const userIds = allUsersInDb
			.map((user) => user.userId)
			.filter((id): id is string => id !== null);
		// now we need to get all the users from the usersTable which have the userId in the userIds array
		const allUsers = await db
			.select()
			.from(usersTable)
			.where(inArray(usersTable.userId, userIds));

		return allUsers ? allUsers : [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getAllBookings() {
	await isAuthorizedAdmin();
	try {
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
		return bookings;
	} catch (error) {
		console.error(error);
		return [];
	}
}
