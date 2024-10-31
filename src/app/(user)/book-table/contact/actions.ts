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
import { getAvailableTables } from "@/lib/data/data";

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
		const isTableAvailable = await getAvailableTables(
			isDataValid.data.date,
			isDataValid.data.time,
			isDataValid.data.numberOfPeople.toString()
		);
		if (isTableAvailable.length === 0) {
			// because the table is not available we will redirect the user to the book-table page again to start his reservation from the beginning
			redirect("/book-table");
		}
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
	} catch (error) {
		console.error("Reservation creation failed:", error);

		return {
			success: false,
			message: "Error creating reservation",
		};
	}
	// reset the user form completion status to false
	const { success: ResetSucess } = await resetAllUserFormCompletionStatus(
		userInDb.userId
	);
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
