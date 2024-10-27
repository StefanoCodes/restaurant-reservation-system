import "server-only";

import { isAuthorizedAdmin } from "../data";
import { db } from "@/db/db";
import { permissionsTable, usersTable } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function getAllUsers() {
	await isAuthorizedAdmin();

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
}
// but we need to check their roles first in the memebership table and then list all the users which dont have an admin role
