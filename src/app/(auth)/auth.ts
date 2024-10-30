import "server-only";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { permissionsTable, usersTable } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { getErrorMessage } from "@/lib/utils";

import { logout } from "@/app/auth";
// Ensures that we have a session and that the user in the session exists in the db
export async function isAuthenticatedUser() {
	try {
		const client = await createClient();
		const {
			data: { user },
			error: sessionError,
		} = await client.auth.getUser();

		// auth status
		if (sessionError) throw new Error(sessionError.message);
		if (!user) return { user: null };

		// database status
		const { userInDb, errorMessage } = await getUserDetails(user.id);
		if (errorMessage || !userInDb) {
			await logout();
			return { user: null, userInDb: null };
		}

		return { user, userInDb };
	} catch (error) {
		// Check for network errors
		if (error instanceof TypeError && error.message.includes("network")) {
			// You could either:

			throw new Error(
				"Unable to verify authentication. Please check your connection."
			);
		}
		return { user: null, userInDb: null };
	}
}

// ensuring any route that requires an admin is protected
export async function isAuthorizedAdmin() {
	const { user, userInDb } = await isAuthenticatedUser();
	if (!user) return { user: null };
	const userRole = await getUserRole(user.id);
	if (userRole !== "admin") redirect("/");
	return { user, userInDb };
}
// ensuring any route that requires a user is protected and admins cannot access them
export async function isAuthorizedUser() {
	const { user, userInDb } = await isAuthenticatedUser();
	if (!user) return { user: null };
	const userRole = await getUserRole(user.id);
	if (userRole !== "user") redirect("/admin");
	return { user, userInDb };
}

// USER Get Requests
export const getUserDetails = async (userId: string) => {
	try {
		const userDetails = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.userId, userId));

		if (!userDetails[0]) {
			return { userInDb: null, errorMessage: "User not found" };
		}
		return {
			errorMessage: null,
			userInDb: userDetails[0],
		};
	} catch (error) {
		return { userInDb: null, errorMessage: getErrorMessage(error) };
	}
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
