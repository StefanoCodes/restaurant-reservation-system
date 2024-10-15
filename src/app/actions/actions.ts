"use server";
import {
  loginSchema,
  registerSchema,
  reservationSchema,
} from "@/app/validations/index";
import { db } from "@/db/db";
import { reservationsTable, Table, tablesTable, usersTable } from "@/db/schema";
import { ReservationDetails, User } from "@/lib/types";
import { createClient } from "@/supabase/utils/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BOOKING_DURATION } from "@/lib/data";
import { formatDateForReservation, getEndTime } from "@/lib/utils";

// Authentication Actions
export async function registerUser(formData: FormData) {
  // retreiving form data
  const registrationData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: formData.get("phoneNumber"),
  };

  // checking the data against our zod schema to ensure its in the essential format
  const isRegistrationDataValid = registerSchema.safeParse(registrationData);
  console.log(isRegistrationDataValid);
  // handling the errors / messages taht we would get back from zod if not successfull
  if (!isRegistrationDataValid.success) {
    return {
      success: false,
      error: isRegistrationDataValid.error.flatten().fieldErrors,
    };
  }
  const supabase = createClient();

  // authenticating the user and creating the user session
  const { data, error } = await supabase.auth.signUp({
    email: isRegistrationDataValid.data.email,
    password: isRegistrationDataValid.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.code,
    };
  }

  const { user } = data;

  if (!user)
    return {
      success: false,
      error: "User not found",
    };
  // adding a new user to the user table

  try {
    await db.insert(usersTable).values({
      name: isRegistrationDataValid.data.name,
      email: isRegistrationDataValid.data.email,
      phoneNumber: isRegistrationDataValid.data.phoneNumber,
      userId: user.id,
      role: "user",
    });
  } catch (error) {
    console.error("Error inserting user into database:", error);

    return {
      success: false,
      error: "Error inserting user into database",
    };
  }
  revalidatePath("/register");
  return {
    success: true,
    message: "User registered successfully",
  };
}

export async function loginUser(formData: FormData) {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const isLoginDataValid = loginSchema.safeParse(loginData);

  if (!isLoginDataValid.success) {
    return {
      success: false,
      error: isLoginDataValid.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: isLoginDataValid.data.email,
    password: isLoginDataValid.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.code,
    };
  }

  const { user } = data;

  if (!user)
    return {
      success: false,
      error: "User not found",
    };

  revalidatePath("/", "layout");
  return {
    success: true,
    message: "User logged in successfully",
  };
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  return {
    success: true,
    message: "User logged out successfully",
  };
}
export const getUserDetails = async (userId: string): Promise<User | null> => {
  const userDetails = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));
  if (!userDetails[0]) {
    return null;
  }
  return userDetails[0];
};
export const getUserReservationDetails = async (userId: string) => {
  const userDetails = await db
    .select({
      name: usersTable.name,
      email: usersTable.email,
      phoneNumber: usersTable.phoneNumber,
      userId: usersTable.userId,
    })
    .from(usersTable)
    .where(eq(usersTable.userId, userId));
  if (!userDetails[0]) {
    return null;
  }
  return userDetails[0];
};
export const getBookings = async (userId: string) => {
  // we will join the table and user tables to the reservations table to get the table name and the user name
  const bookings = await db
    .select({
      reservation: reservationsTable,
      table: tablesTable,
      user: usersTable,
    })
    .from(reservationsTable)
    .where(eq(reservationsTable.userId, userId))
    .innerJoin(tablesTable, eq(reservationsTable.tableId, tablesTable.id))
    .innerJoin(usersTable, eq(reservationsTable.userId, usersTable.userId));
    console.table(bookings)
  if (!bookings[0]) {
    return [];
  }
  return bookings;
};
export const getTables = async (): Promise<Table[]> => {
  const tables = await db.select().from(tablesTable);
  if (!tables[0]) {
    return [];
  }
  return tables;
};
export const createReservation = async (
  formData: FormData,
  reservationDetails: ReservationDetails
) => {
  // data received from client
  const unvalidatedReservationData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    numberOfPeople: formData.get("numberOfPeople"),
    date: reservationDetails.date,
    time: reservationDetails.time,
    tableId: reservationDetails.tableId,
    userId: reservationDetails.userId,
  };
  console.log(unvalidatedReservationData);
  //  passing data received from client to zod to ensure its the shape we want it in
  const isReservationDataValid = reservationSchema.safeParse(
    unvalidatedReservationData
  );
  // handling the errors / messages taht we would get back from zod if not successfull
  if (!isReservationDataValid.success) {
    return {
      success: false,
      error: isReservationDataValid.error.flatten().fieldErrors,
    };
  }
  // prevent duplicate reservations

  // prevent overlapping reseravtions

  // insert reservation into database

  await db.insert(reservationsTable).values({
    userId: reservationDetails.userId,
    tableId: reservationDetails.tableId,
    startTime: reservationDetails.time,
    endTime: getEndTime(reservationDetails.time, BOOKING_DURATION),
    numberOfPeople: isReservationDataValid.data.numberOfPeople,
    notes: isReservationDataValid.data.specialRequests,
  });
  revalidatePath("/book-table");
  return {
    success: true,
    message: "Reservation created successfully",
  };
};
