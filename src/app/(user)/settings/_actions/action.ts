"use server";

import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { formatZodErrors } from "@/lib/utils";
import { updateUserInformationSchema } from "@/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
// import { errorsState } from "../_components/edit-user-information-form";

export async function updateUserInformation(
  prevState: any,
  formData: FormData,
  userId: string,
) {
  const unvalidatedData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
  };
  console.log(unvalidatedData);
  const validatedData = updateUserInformationSchema.safeParse(unvalidatedData);
  if (!validatedData.success) {
    return {
      success: false,
      errors: formatZodErrors(validatedData.error),
    };
  }
  const { name, email, phoneNumber } = validatedData.data;
  try {
    await db
      .update(usersTable)
      .set({
        name,
        email,
        phoneNumber,
      })
      .where(eq(usersTable.userId, userId));
    revalidatePath("/settings", "layout");
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      errors: { message: "Something went wrong" },
    };
  }
}
