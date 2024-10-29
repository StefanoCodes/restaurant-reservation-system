"use server";
import { logout } from "@/actions/actions";
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
import { resetAllUserFormCompletionStatus } from "../(date)/actions";

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

	console.log(formDataObject);

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
