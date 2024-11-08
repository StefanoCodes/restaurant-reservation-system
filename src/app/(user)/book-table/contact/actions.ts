"use server";
import { db } from "@/db/db";
import { reservationsTable } from "@/db/schema";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { getTableIdByName } from "@/lib/data/user";
import { formatZodErrors, getEndTime } from "@/lib/utils";
import { BOOKING_DURATION } from "@/lib/constants";
import { stepThreeSchema } from "@/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkIfReservationAlreadyExists } from "@/lib/data/data";
type StepThreeFormData = {
  date: string;
  time: string;
  tableName: string;
  numberOfPeople: number;
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
};
export async function stepThreeAction(formDataObject: StepThreeFormData) {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) {
    return redirect("/login");
  }

  // pass the data through zod
  const isDataValid = await stepThreeSchema();
  const isDataValidSchema = isDataValid.safeParse(formDataObject);
  if (!isDataValidSchema.success) {
    return {
      success: false,
      errors: formatZodErrors(isDataValidSchema.error),
    };
  }

  try {
    const tableId = await getTableIdByName(isDataValidSchema.data.tableName);
    if (!tableId) {
      return {
        success: false,
        message: "Something Went Wrong!",
      };
    }
    const isReservationAlreadyExists = await checkIfReservationAlreadyExists(
      isDataValidSchema.data.date,
      isDataValidSchema.data.time,
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
      reservationName: isDataValidSchema.data.name,
      reservationPhone: isDataValidSchema.data.phone,
      reservationEmail: isDataValidSchema.data.email,
      userId: userInDb.userId,
      reservationDate: isDataValidSchema.data.date,
      tableId: tableId,
      startTime: isDataValidSchema.data.time,
      endTime: getEndTime(isDataValidSchema.data.time, BOOKING_DURATION),
      numberOfPeople: isDataValidSchema.data.numberOfPeople,
      notes: isDataValidSchema.data.specialRequests,
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
