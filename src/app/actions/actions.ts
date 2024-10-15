"use server";
import { loginSchema, registerSchema } from "@/app/validations/index";
import { db } from "@/db/db";
import { Table, tablesTable, usersTable } from "@/db/schema";
import { User } from "@/lib/types";
import { createClient } from "@/supabase/utils/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
    })
    .from(usersTable)
    .where(eq(usersTable.userId, userId));
  if (!userDetails[0]) {
    return null;
  }
  return userDetails[0];
};

export const getTables = async (): Promise<Table[]> => {
  const tables = await db.select().from(tablesTable);
  if (!tables[0]) {
    return [];
  }
  return tables;
};
