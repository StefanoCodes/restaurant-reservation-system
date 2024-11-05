"use server";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { formatZodErrors } from "@/lib/utils";
import { createBookTableSchema } from "@/validations";
import { redirect } from "next/navigation";
// HANDLE STEP ONE ACTION

export const handleStepOneAction = async (formData: {
  date: string;
  time: string;
  numberOfPeople: string;
}) => {
  // zod validation
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");
  const isDataValidSchema = await createBookTableSchema();
  const isDataValid = isDataValidSchema.safeParse(formData);
  if (!isDataValid.success) {
    return {
      success: false,
      errors: formatZodErrors(isDataValid.error),
    };
  }
  return {
    success: true,
    message: "Completed successfully",
  };
};
