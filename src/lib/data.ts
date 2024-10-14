import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserDetails = async (userId: string) => {
  const userDetails = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));
  if (!userDetails[0]) {
    return {
      user: null,
    };
  }
  return {
    user: userDetails[0],
  };
};
