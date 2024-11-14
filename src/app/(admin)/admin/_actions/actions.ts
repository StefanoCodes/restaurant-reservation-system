"use server";

import {
  BusinessHourData,
  marketingTemplatesTable,
  settingsTable,
} from "@/db/schema";
import { db } from "@/db/db";
import {
  businessHoursTable,
  reservationsTable,
  tablesTable,
} from "@/db/schema";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { formatZodErrors } from "@/lib/utils";
import {
  addNewTableSchema,
  bookingDurationIntervalSchema,
  businessHourSchema,
} from "@/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Deleting a user Reservation + Sending an email to the user letting them know their reservation has been deleted

export async function deleteUserReservationAction(reservationId: string) {
  // we will make sure this is protected and authorized users only can trigger it
  await isAuthorizedAdmin();
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

// Approving a user reservation

export async function approveUserReservationAction(reservationId: string) {
  try {
    const userReservation = await db
      .update(reservationsTable)
      .set({
        reservationStatus: "confirmed",
      })
      .where(eq(reservationsTable.id, reservationId));
    if (!userReservation) {
      return {
        success: false,
        message: "Reservation not found",
      };
    }

    // TODO: an email would be then sent to the user letting them know that their reservation has been approved
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message: "Failed to approve reservation",
    };
  }
  revalidatePath("/admin/bookings", "page");
  revalidatePath("/bookings", "page");
  return {
    success: true,
    message: "Reservation approved successfully",
  };
}

// Adding a new table

export async function addNewTableAction(formData: FormData) {
  await isAuthorizedAdmin();
  // if user is authenticaed & authrozied can execute the following
  const name = formData.get("tableName");
  const capacity = formData.get("tableCapacity");

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

export async function deleteTableAction(tableId: string) {
  await isAuthorizedAdmin();
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
  await isAuthorizedAdmin();
  // Get Form Data
  const name = formData.get("tableName");

  const capacity = formData.get("tableCapacity");
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

// Change Table Status to Available or Not Available

export async function changeTableStatusAction(tableId: string, status: string) {
  await isAuthorizedAdmin();

  // validate the status first tough
  if (status !== "available" && status !== "unavailable") {
    return {
      success: false,
      message: "Invalid status",
    };
  }

  try {
    // updating the table status in the db thhrough one transaction
    await db
      .update(tablesTable)
      .set({
        status: status === "available" ? "unavailable" : "available",
      })
      .where(eq(tablesTable.id, tableId));
  } catch (error) {
    return {
      success: false,
      message: "Failed to change table status",
    };
  }
  revalidatePath("/admin/tables");
  revalidatePath("/book-table/availability");
  return {
    success: true,
    message: "Table status changed successfully",
  };
}

// update business hours action

export async function updateBusinessHoursAction(hours: BusinessHourData[]) {
  await isAuthorizedAdmin();
  // validate data from zod

  const isValidBusinessHours = businessHourSchema.safeParse(hours);

  if (!isValidBusinessHours.success) {
    return {
      success: false,
      message: "Invalid business hours",
    };
  }

  // if data is valid we can update the business hours in the database
  try {
    await db.transaction(async (tx) => {
      await tx.delete(businessHoursTable);
      await tx.insert(businessHoursTable).values(isValidBusinessHours.data);
    });
  } catch (error) {
    return {
      success: false,
      message: "Failed to update business hours",
    };
  }
  revalidatePath("/admin/settings");
  revalidatePath("/book-table/availability");
  return {
    success: true,
    message: "Business hours updated successfully",
  };

  // we can send an email to the users letting them know that the business hours have been updated
}

export async function updateBookingDurationInterval(formData: FormData) {
  await isAuthorizedAdmin();

  const interval = formData.get("bookingDurationInterval");

  // validate Zod Schema
  const isValidInterval = bookingDurationIntervalSchema.safeParse({ interval });
  if (!isValidInterval.success) {
    return {
      success: false,
      error: formatZodErrors(isValidInterval.error),
    };
  }
  // update the booking duration interval in the database

  try {
    const updateBookingDurationIntervalInDb = await db
      .update(settingsTable)
      .set({ bookingDurationInterval: isValidInterval.data.interval });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update booking duration interval",
    };
  }
  revalidatePath("/admin/settings");
  revalidatePath("/book-table/availability");
  return {
    success: true,
    message: "Booking duration interval updated successfully",
  };
}

//

export async function updateMarketingTemplateAction(formData: FormData) {
  await isAuthorizedAdmin();

  const templateName = formData.get("templateName") as string;
  console.log(templateName);
  if (
    templateName !== "TemplateOne" &&
    templateName !== "TemplateTwo" &&
    templateName !== "TemplateThree"
  ) {
    return {
      success: false,
      message: "Invalid template name",
    };
  }

  // update the marketing template in the database
  try {
    await db
      .update(marketingTemplatesTable)
      .set({ selectedTemplate: templateName });
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return {
      success: true,
      message: "Marketing template updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update marketing template",
    };
  }
}
