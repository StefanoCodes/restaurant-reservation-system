import "server-only";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import {
	permissionsTable,
	reservationFormCompletionStatusTable,
	usersTable,
} from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { getErrorMessage } from "@/lib/utils";
import { loginSchema, registerSchema } from "@/validations";
import { revalidatePath } from "next/cache";
import { logout } from "../logout";

// AUTH
export async function registerUser(formData: FormData) {
	// retreiving form data
	const registrationData = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		phoneNumber: formData.get("phoneNumber"),
	};

	// checking the data against our zod schema to ensure its in the essential format
	const isRegistrationDataValid = registerSchema.safeParse(registrationData);

	// handling the errors / messages taht we would get back from zod if not successfull
	if (!isRegistrationDataValid.success) {
		return {
			success: false,
			error: isRegistrationDataValid.error.flatten().fieldErrors,
		};
	}
	const supabase = await createClient();

	// authenticating the user and creating the user session
	const { data, error } = await supabase.auth.signUp({
		email: isRegistrationDataValid.data.email,
		password: isRegistrationDataValid.data.password,
	});

	if (error) {
		return {
			success: false,
			error: error.message,
		};
	}

	const { user } = data;

	if (!user)
		return {
			success: false,
			error: "User not found",
		};
	// adding a new user to the user table

	try {
		await db.transaction(async (tx) => {
			const [insertedUser] = await tx
				.insert(usersTable)
				.values({
					name: isRegistrationDataValid.data.name,
					email: isRegistrationDataValid.data.email,
					phoneNumber: isRegistrationDataValid.data.phoneNumber,
					userId: user.id,
				})
				.returning({ userId: usersTable.userId });

			await tx.insert(permissionsTable).values({
				memberId: insertedUser.userId,
				// by default the role is set to user so the only thing we need to do is to insert the memberID
			});
			await tx.insert(reservationFormCompletionStatusTable).values({
				userId: insertedUser.userId,
			});
		});
	} catch (error) {
		console.error("Error inserting user into database:", error);

		return {
			success: false,
			error: "Error inserting user into database",
		};
	}
	revalidatePath("/register");
	return {
		success: true,
		message: "User registered successfully",
	};
}

export async function loginUser(formData: FormData) {
	const loginData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const isLoginDataValid = loginSchema.safeParse(loginData);

	if (!isLoginDataValid.success) {
		return {
			success: false,
			error: isLoginDataValid.error.flatten().fieldErrors,
		};
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: isLoginDataValid.data.email,
		password: isLoginDataValid.data.password,
	});

	if (error) {
		return {
			success: false,
			error: error.message,
		};
	}

	const { user } = data;

	if (!user)
		return {
			success: false,
			error: "User not found",
		};

	revalidatePath("/");
	return {
		success: true,
		message: "User logged in successfully",
	};
}

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
