"use server";
import { db } from "@/db/db";
import {
	ReservationFormCompletionStatus,
	reservationFormCompletionStatusTable,
} from "@/db/schema";
import { isAuthenticatedUser } from "@/lib/data";
import { formatZodErrors } from "@/lib/utils";
import { createBookTableSchema } from "@/validations";
import { eq } from "drizzle-orm";

// GET USER FORM COMPLETION STATUS FROM DB
export const getUserFormCompletionStatus = async (
	userId: string
): Promise<ReservationFormCompletionStatus | null> => {
	await isAuthenticatedUser();
	const userFormCompletionStatus = await db
		.select()
		.from(reservationFormCompletionStatusTable)
		.where(eq(reservationFormCompletionStatusTable.userId, userId));
	if (!userFormCompletionStatus) {
		return null;
	}
	return userFormCompletionStatus[0];
};
// RESET USER FORM COMPLETION STATUS everytime the user goes back to the previous step
export const resetUserFormCompletionStatus = async (
	userId: string,
	step: "one" | "two" | "three"
) => {
	const stepToReset = `step${step.slice(0, 1).toUpperCase()}${step.slice(1)}`;
	console.log(stepToReset);
	await db
		.update(reservationFormCompletionStatusTable)
		.set({
			[stepToReset]: false,
		})
		.where(eq(reservationFormCompletionStatusTable.userId, userId));
};

// HANDLE STEP ONE ACTION

export const handleStepOneAction = async (
	formData: {
		date: string;
		time: string;
		numberOfPeople: string;
	},
	userId: string
) => {
	// zod validation
	const isDataValidSchema = await createBookTableSchema();
	const isDataValid = isDataValidSchema.safeParse(formData);
	if (!isDataValid.success) {
		return {
			success: false,
			errors: formatZodErrors(isDataValid.error),
		};
	}

	// keep track of the data
	const { date, time, numberOfPeople } = isDataValid.data;
	// we would prorably use something like context to keep track of the data
	// but for now we will just log it
	console.log(date, time, numberOfPeople);

	// we need to update in the database that the first step for this user is completed
	await db
		.update(reservationFormCompletionStatusTable)
		.set({
			stepOne: true,
		})
		.where(eq(reservationFormCompletionStatusTable.userId, userId));
	// send a response
	return {
		success: true,
		message: "Completed successfully",
	};
};
