"use server";
import { Table } from "@/db/schema";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { formatZodErrors } from "@/lib/utils";
import { stepTwoSchema } from "@/validations";
import { redirect } from "next/navigation";

export const handleStepTwoAction = async (selectedTable: Table) => {
  // protect the action
  const { userInDb } = await isAuthorizedUser();
  if (!userInDb) redirect("/login");
  const unvalidatedData = stepTwoSchema.safeParse(selectedTable);
  if (!unvalidatedData.success)
    return {
      success: false,
      errors: formatZodErrors(unvalidatedData.error),
    };
  return {
    success: true,
    message: "Completed Successfully",
  };
};
