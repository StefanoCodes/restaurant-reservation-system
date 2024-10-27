"use server";

import { db } from "@/db/db";
import { reservationFormCompletionStatusTable, Table } from "@/db/schema";
import { isAuthenticatedUser } from "@/lib/data";
import { formatZodErrors } from "@/lib/utils";
import { stepTwoSchema } from "@/validations";
import { eq } from "drizzle-orm";

export const handleStepTwoAction = async (selectedTable: Table, userId: string) => {
	// protect the action
	const { user, userInDb } = await isAuthenticatedUser();
	if (!userInDb || !user) throw new Error("Unauthorized");
	const unvalidatedData = stepTwoSchema.safeParse(selectedTable);
	if (!unvalidatedData.success)
		return {
			success: false,
			error: formatZodErrors(unvalidatedData.error),
		};
	await db
		.update(reservationFormCompletionStatusTable)
		.set({
			stepTwo: true,
		})
		.where(eq(reservationFormCompletionStatusTable.userId, userId));
	return {
		success: true,
		message: "Table details submitted successfully",
	};
};
