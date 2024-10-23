import "server-only";

import { createClient } from "@/supabase/utils/server";
import { getUserDetails, getUserRole } from "../data";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { permissionsTable, usersTable } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function getAllUsers() {
	// first we protect this get request  for only admins
	const client = await createClient();
	const { auth } = client;
	// CHECKING FOR THE SESSION
	const {
		data: { user },
		error,
	} = await auth.getUser();
	if (error || !user) {
		redirect("/");
	}
	// CHECKING USER EXISTS IN THE DATABASE
	const userInDb = await getUserDetails(user.id);
	if (!userInDb) return;
	// CHECKING FOR THE ROLE OF THE USER
	const userRole = await getUserRole(user.id);
	if (userRole !== "admin") {
		redirect("/");
	}

	// getting all the users which are not admins and to do that we need to look them up in the permosions table

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
