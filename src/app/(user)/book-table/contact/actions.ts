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
import { checkIfReservationAlreadyExists } from "@/lib/data/data";

export async function stepThreeAction(
  formDataObject: z.infer<typeof stepThreeSchema>,
) {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) {
    return redirect("/login");
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
      return {
        success: false,
        message: "Something Went Wrong!",
      };
    }
    const isReservationAlreadyExists = await checkIfReservationAlreadyExists(
      isDataValid.data.date,
      isDataValid.data.time,
      tableId,
    );
    if (isReservationAlreadyExists) {
      return {
        success: false,
        message: "Reservation already exists",
      };
    }
    // if the reservation is not already exists we will insert the reservation
    await db.insert(reservationsTable).values({
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
  revalidatePath("/bookings");
  revalidatePath("/admin/bookings");
  return {
    success: true,
    message: "Reservation Created Successfully",
  };
}
