"use server";
import {
	loginSchema,
	registerSchema,
	reservationSchema,
} from "@/validations/index";
import { db } from "@/db/db";
import { permissionsTable, reservationsTable, usersTable } from "@/db/schema";
import { ReservationDetails } from "@/lib/types";
import { createClient } from "@/supabase/utils/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { BOOKING_DURATION } from "@/utils/constants";
import { formatZodErrors, getEndTime } from "@/lib/utils";
import { sendEmailPendingConfirmation } from "./email";

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
			error: error.code,
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
			error: error.code,
		};
	}

	const { user } = data;

	if (!user)
		return {
			success: false,
			error: "User not found",
		};

	revalidatePath("/", "layout");
	return {
		success: true,
		message: "User logged in successfully",
	};
}

export async function logout() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}

	revalidatePath("/", "layout");
	return {
		success: true,
		message: "User logged out successfully",
	};
}
// Creating a reservation
export const createReservation = async (
	formData: FormData,
	reservationDetails: ReservationDetails
) => {
	// data received from client
	const unvalidatedReservationData = {
		name: formData.get("name"),
		email: formData.get("email"),
		phoneNumber: formData.get("phoneNumber"),
		numberOfPeople: formData.get("numberOfPeople"),
		specialRequests: formData.get("specialRequests"),
		reservationDate: reservationDetails.reservationDate,
		time: reservationDetails.time,
		tableId: reservationDetails.tableId,
		userId: reservationDetails.userId,
	};
	//  passing data received from client to zod to ensure its the shape we want it in
	const isReservationDataValid = reservationSchema.safeParse(
		unvalidatedReservationData
	);
	// handling the errors / messages taht we would get back from zod if not successfull
	if (!isReservationDataValid.success) {
		return {
			success: false,
			error: formatZodErrors(isReservationDataValid.error),
		};
	}
	// prevent duplicate reservations

	// prevent overlapping reseravtions

	// Email Being Sent to the user

	// insert reservation into database

	// sending email to the user

	const insertReservation = await db
		.insert(reservationsTable)
		.values({
			userId: isReservationDataValid.data.userId,
			reservationDate: isReservationDataValid.data.reservationDate,
			tableId: isReservationDataValid.data.tableId,
			startTime: isReservationDataValid.data.time,
			endTime: getEndTime(isReservationDataValid.data.time, BOOKING_DURATION),
			numberOfPeople: isReservationDataValid.data.numberOfPeople,
			notes: isReservationDataValid.data.specialRequests,
		})
		.returning({
			reservationId: reservationsTable.id,
		});
	const { error: emailError } = await sendEmailPendingConfirmation(
		"stefanovidmarbusiness@gmail.com",
		"Reservation Pending Confirmation",
		insertReservation[0].reservationId
	);
	if (emailError) {
		await db
			.delete(reservationsTable)
			.where(eq(reservationsTable.id, insertReservation[0].reservationId));
		return {
			success: false,
			emailError: emailError.message,
		};
	}
	revalidatePath("/bookings", "page");
	revalidatePath("/admin/bookings", "page");
	return {
		success: true,
		message: "Reservation created successfully",
	};
};
