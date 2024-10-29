"use server";
import { logout } from "@/actions/actions";
import { db } from "@/db/db";
import {
	ReservationFormCompletionStatus,
	reservationFormCompletionStatusTable,
} from "@/db/schema";
import { isAuthenticatedUser, isAuthorizedUser } from "@/app/(auth)/auth";
import { formatZodErrors } from "@/lib/utils";
import { createBookTableSchema } from "@/validations";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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

// reset user form completion status
export const resetAllUserFormCompletionStatus = async (userId: string) => {
	try {
		await db
			.update(reservationFormCompletionStatusTable)
			.set({
				stepOne: false,
				stepTwo: false,
				stepThree: false,
			})
			.where(eq(reservationFormCompletionStatusTable.userId, userId));
		return {
			success: true,
		};
	} catch (error) {
		return {
			success: false,
		};
	}
};

// RESET USER FORM COMPLETION STATUS everytime the user goes back to the previous step
export const resetUserFormCompletionStatus = async (
	userId: string,
	step: "one" | "two" | "three"
) => {
	const stepToReset = `step${step.slice(0, 1).toUpperCase()}${step.slice(1)}`;
	
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
	const { user, userInDb } = await isAuthorizedUser();
	if (!user) {
		redirect("/login");
	}
	if (!userInDb) {
		await logout();
	}
	const isDataValidSchema = await createBookTableSchema();
	const isDataValid = isDataValidSchema.safeParse(formData);
	if (!isDataValid.success) {
		return {
			success: false,
			errors: formatZodErrors(isDataValid.error),
		};
	}
	await db
		.update(reservationFormCompletionStatusTable)
		.set({
			stepOne: true,
		})
		.where(eq(reservationFormCompletionStatusTable.userId, userId));
	return {
		success: true,
		message: "Completed successfully",
	};
};
