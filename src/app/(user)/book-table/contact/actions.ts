"use server";
import { logout } from "@/app/auth";
import { db } from "@/db/db";
import { reservationsTable } from "@/db/schema";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { getTableIdByName } from "@/lib/data/user";
import { formatZodErrors, getEndTime } from "@/lib/utils";
import { BOOKING_DURATION } from "@/utils/constants";
import { stepThreeSchema } from "@/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { resetAllUserFormCompletionStatus } from "../_date/actions";
import { checkIfReservationAlreadyExists } from "@/lib/data/data";

export async function stepThreeAction(
	formDataObject: z.infer<typeof stepThreeSchema>
) {
	const { user, userInDb } = await isAuthorizedUser();
	if (!user) {
		redirect("/login");
	}
	if (!userInDb) {
		await logout();
		return {
			success: false,
			message: "You are not authorized to create a reservation",
		};
	}

	// pass the data through zod
	const isDataValid = stepThreeSchema.safeParse(formDataObject);
	if (!isDataValid.success) {
		return {
			success: false,
			errors: formatZodErrors(isDataValid.error),
		};
	}

	try {
		const tableId = await getTableIdByName(isDataValid.data.tableName);
		if (!tableId) {
			throw new Error("Table not found");
		}
		// before insertion we need to double check the same logic of the date and time because a user could be waiting and then his spot may be taken
		// we need to check if there is a reservation made already for the same date and time
		const isReservationAlreadyExists = await checkIfReservationAlreadyExists(
			isDataValid.data.date,
			isDataValid.data.time,
			tableId
		);
		if (isReservationAlreadyExists) {
			throw new Error("Reservation already exists");
		}
		// if the reservation is not already exists we will insert the reservation
		const insertReservation = await db.insert(reservationsTable).values({
			reservationName: isDataValid.data.name,
			reservationPhone: isDataValid.data.phone,
			reservationEmail: isDataValid.data.email,
			userId: userInDb.userId,
			reservationDate: isDataValid.data.date,
			tableId: tableId,
			startTime: isDataValid.data.time,
			endTime: getEndTime(isDataValid.data.time, BOOKING_DURATION),
			numberOfPeople: isDataValid.data.numberOfPeople,
			notes: isDataValid.data.specialRequests,
		});
		// if the insertion is successful we will return the success message
	} catch (error) {
		// if the error is an instance of Error we will return the error message
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			};
		}
	}
	// reset the user form completion status to false
	const { success: ResetSucess } = await resetAllUserFormCompletionStatus(
		userInDb.userId
	);
	// if the reset is not successful we will throw an error
	if (!ResetSucess) {
		throw new Error("Failed to reset form completion status");
	}

	revalidatePath("/book-table");
	revalidatePath("/bookings");
	revalidatePath("/admin/bookings");
	return {
		success: true,
		message: "Reservation Created Successfully",
	};
}
