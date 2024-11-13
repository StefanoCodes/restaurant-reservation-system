"use server";

import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { formatZodErrors } from "@/lib/utils";
import { createClient } from "@/supabase/utils/server";
import { updateUserInformationSchema } from "@/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type UpdateUserResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

async function updateUserEmail(
  email: string,
): Promise<{ error: Error | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    email,
  });
  return { error };
}
export async function updateUserInformation(
  prevState: any,
  formData: FormData,
  userId: string,
): Promise<UpdateUserResponse> {
  const unvalidatedData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
  };
  const supabase = await createClient();
  const userEmail = (await supabase.auth.getUser()).data.user?.email;

  const validatedData = updateUserInformationSchema.safeParse(unvalidatedData);
  if (!validatedData.success) {
    return {
      success: false,
      errors: formatZodErrors(validatedData.error),
    };
  }
  const { name, email, phoneNumber } = validatedData.data;
  let emailUpdateError: Error | null = null;

  try {
    // so since the user can change their email or name at the same time we should have this data mutation to be sequential in a trascation
    await db.transaction(async (tx) => {
      await tx
        .update(usersTable)
        .set({
          name,
          email,
          phoneNumber,
        })
        .where(eq(usersTable.userId, userId));
      if (userEmail !== email) {
        const { error } = await updateUserEmail(email);
        if (error) {
          emailUpdateError = error;
          throw new Error(error.message);
        }
      }
    });
    revalidatePath("/settings", "layout");
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Profile updated Failed", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
