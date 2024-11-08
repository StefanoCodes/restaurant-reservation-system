import "server-only";

import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { db } from "@/db/db";
import {
  businessHoursTable,
  permissionsTable,
  reservationsTable,
  settingsTable,
  tablesTable,
  usersTable,
} from "@/db/schema";
import { BOOKING_DURATION } from "@/lib/constants";
import { eq, inArray } from "drizzle-orm";

// Admin GET Requests

export async function getAllUsers() {
  await isAuthorizedAdmin();

  try {
    const allUsersInDb = await db
      .select({ userId: permissionsTable.memberId })
      .from(permissionsTable)
      .where(eq(permissionsTable.role, "user"));
    // userId is a string and we need to filter out the null values from the array
    const userIds = allUsersInDb
      .map((user) => user.userId)
      .filter((id): id is string => id !== null);
    // now we need to get all the users from the usersTable which have the userId in the userIds array
    const allUsers = await db
      .select()
      .from(usersTable)
      .where(inArray(usersTable.userId, userIds));

    return allUsers ? allUsers : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getAllBookings() {
  await isAuthorizedAdmin();
  try {
    const bookings = await db
      .select({
        reservation: reservationsTable,
        table: tablesTable,
        user: usersTable,
        reservationDate: reservationsTable.reservationDate,
      })
      .from(reservationsTable)
      .innerJoin(tablesTable, eq(reservationsTable.tableId, tablesTable.id))
      .innerJoin(usersTable, eq(reservationsTable.userId, usersTable.userId));
    return bookings;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getAllTablesAdmin() {
  await isAuthorizedAdmin();
  try {
    const tables = await db.select().from(tablesTable);
    return tables;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getBusinessHours() {
  await isAuthorizedAdmin();
  try {
    const businessHours = await db.select().from(businessHoursTable);
    return businessHours;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getAdminSettings() {
  await isAuthorizedAdmin();
  try {
    const settings = await db.transaction(async (tx) => {
      const businessHours = await tx.select().from(businessHoursTable);
      const [{ bookingDurationInterval }] = await tx
        .select({
          bookingDurationInterval: settingsTable.bookingDurationInterval,
        })
        .from(settingsTable);

      return {
        businessHours,
        bookingDurationInterval,
      };
    });

    return settings;
  } catch (error) {
    console.error(error);
    return {
      businessHours: [],
      bookingDurationInterval: BOOKING_DURATION,
    };
  }
}
