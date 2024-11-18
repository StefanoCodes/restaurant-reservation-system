"use server";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { permissionsTable, usersTable } from "@/db/schema";
import { loginSchema, registerSchema } from "@/validations";
import { eq } from "drizzle-orm";

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  const userInDatabase = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, data.user.id));
  return userInDatabase[0] || null;
}
export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  // Add redirect after successful logout
  redirect("/");
}

export async function registerUser(
  prevState: any,
  formData: FormData,
  retryCount = 0,
) {
  // retreiving form data
  const registrationData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    phoneNumber: formData.get("phoneNumber") as string,
  };

  // checking the data against our zod schema to ensure its in the essential format
  const isRegistrationDataValid = registerSchema.safeParse(registrationData);

  // handling the errors / messages taht we would get back from zod if not successfull
  if (!isRegistrationDataValid.success) {
    return {
      success: false,
      formData: registrationData,
      error: isRegistrationDataValid.error.flatten().fieldErrors,
    };
  }
  const supabase = await createClient();

  // authenticating the user and creating the user session
  const { data, error } = await supabase.auth.signUp({
    email: isRegistrationDataValid.data.email,
    password: isRegistrationDataValid.data.password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const { user } = data;

  if (!user)
    return {
      success: false,
      message: "User not found",
    };

  // adding a new user to the user table

  try {
    await db.transaction(async (tx) => {
      const [insertedUser] = await tx
        .insert(usersTable)
        .values({
          name: isRegistrationDataValid.data.name,
          email: isRegistrationDataValid.data.email,
          phoneNumber: isRegistrationDataValid.data.phoneNumber,
          userId: user.id,
        })
        .returning({ userId: usersTable.userId });

      await tx.insert(permissionsTable).values({
        memberId: insertedUser.userId,
        // by default the role is set to user so the only thing we need to do is to insert the memberID
      });
    });
    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.error("Error inserting user into database:", error);

    // Limit retries to prevent infinite loops
    if (retryCount >= 2) {
      return {
        success: false,
        message:
          "Registration failed after multiple attempts. Please try again later.",
      };
    }

    // Delete user from auth table
    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      user.id,
    );
    if (deleteError) {
      console.error("Error deleting user from auth table:", deleteError);
      return {
        success: false,
        message: "An error occurred during registration. Please try again.",
      };
    }

    // Retry with incremented counter
    return registerUser(prevState, formData, retryCount + 1);
  }
}

export async function loginUser(prevState: any, formData: FormData) {
  const loginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const isLoginDataValid = loginSchema.safeParse(loginData);

  if (!isLoginDataValid.success) {
    return {
      success: false,
      formData: loginData,
      message: "Invalid email or password",
      error: isLoginDataValid.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: isLoginDataValid.data.email,
    password: isLoginDataValid.data.password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const { user } = data;

  if (!user)
    return {
      success: false,
      message: "User not found",
    };

  return {
    success: true,
    message: "User logged in successfully",
  };
}
