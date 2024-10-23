"use server";

import { db } from "@/db/db";
import { reservationsTable, Table, tablesTable } from "@/db/schema";
import { isAuthorizedUser } from "@/lib/data";
import { formatZodErrors } from "@/lib/utils";
import { addNewTableSchema } from "@/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Deleting a user Reservation + Sending an email to the user letting them know their reservation has been deleted

export async function deleteUserReservation(reservationId: string) {
	// we will make sure this is protected and authorized users only can trigger it
	const authorizedUser = await isAuthorizedUser();
	if (!authorizedUser) return;
	const { user, userInDb } = authorizedUser;
	if (!user || !userInDb) return;
	// if all checks went good we can delete the reservation
	const deleteReservationInDb = await db
		.delete(reservationsTable)
		.where(eq(reservationsTable.id, reservationId));
	// on error
	if (!deleteReservationInDb) {
		return {
			success: false,
			message: "Failed to delete reservation",
		};
	}
	// we can send an email to the user letting them know that their reservation has been delete with a specific reason
	// using resend

	// on success
	revalidatePath("/admin/bookings", "page");
	revalidatePath("/bookings", "page");
	return {
		success: true,
		message: "Reservation deleted successfully",
	};
}

// Adding a new table

export async function addNewTable(formData: FormData) {
	const authorizedUser = await isAuthorizedUser();
	if (!authorizedUser) return;
	const { user, userInDb } = authorizedUser;
	if (!user || !userInDb) return;
	// if user is authenticaed & authrozied can execute the following
	const name = formData.get("tableName");
	const capacity = formData.get("tableCapacity");

	const isValidTableData = addNewTableSchema.safeParse({
		name,
		capacity,
	});

	if (!isValidTableData.success) {
		console.log(isValidTableData.error);
		return {
			success: false,
			error: formatZodErrors(isValidTableData.error),
		};
	}
	// we can add the table to the database
	const addTableToDb = await db.insert(tablesTable).values({
		name: isValidTableData.data.name,
		capacity: isValidTableData.data.capacity,
	});
	if (!addTableToDb) {
		return {
			success: false,
			message: "Failed to add table",
		};
	}
	revalidatePath("/admin/tables", "page");
	revalidatePath("/tables", "page");
	return {
		success: true,
		message: "Table added successfully",
	};
}

// Deleting a table

export async function deleteTable(tableId: string) {
	const authorizedUser = await isAuthorizedUser();
	if (!authorizedUser) return;
	const { user, userInDb } = authorizedUser;
	if (!user || !userInDb) return;
	// if all checks went good we can delete the table

	const deleteTableInDb = await db
		.delete(tablesTable)
		.where(eq(tablesTable.id, tableId));
	if (!deleteTableInDb) {
		return {
			success: false,
			message: "Failed to delete table",
		};
	}

	revalidatePath("/admin/tables", "page");
	revalidatePath("/tables", "page");
	return {
		success: true,
		message: "Table deleted successfully",
	};
}

// Editing a table data

export async function editTableDataAction(formData: FormData, tableId: string) {
	console.log(formData);
	const authorizedUser = await isAuthorizedUser();
	if (!authorizedUser) return;
	const { user, userInDb } = authorizedUser;
	if (!user || !userInDb) return;
	// Get Form Data
	const name = formData.get("tableName");

	const capacity = formData.get("tableCapacity");
	console.log(name, capacity);
	const isValidTableData = addNewTableSchema.safeParse({
		name,
		capacity,
	});

	if (!isValidTableData.success) {
		return {
			success: false,
			error: formatZodErrors(isValidTableData.error),
		};
	}

	// Update Table Data in Database
	const updateTableDataInDb = await db
		.update(tablesTable)
		.set({
			name: isValidTableData.data.name,
			capacity: isValidTableData.data.capacity,
		})
		.where(eq(tablesTable.id, tableId));
	if (!updateTableDataInDb) {
		return {
			success: false,
			message: "Failed to update table data",
		};
	}
	revalidatePath("/admin/tables", "page");
	revalidatePath("/tables", "page");
	return {
		success: true,
		message: "Updated successfully",
	};
}
