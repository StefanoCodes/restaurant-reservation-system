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
  await isAuthorizedUser();
  // zod validation
  const isDataValidSchema = await createBookTableSchema();
  const isDataValid = isDataValidSchema.safeParse(formData);
  if (!isDataValid.success) {
    return {
      success: false,
      errors: formatZodErrors(isDataValid.error),
    };
  }

  // check if the date does not land on a closed day so we need to check if the date selected is a closed day
  return {
    success: true,
    message: "Completed successfully",
  };
};
