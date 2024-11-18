import "server-only";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { permissionsTable, usersTable } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { logout } from "@/app/(user)/auth-utils";

export async function isAuthenticatedUser() {
  const client = await createClient();
  const {
    data: { user },
    error: sessionError,
  } = await client.auth.getUser();

  if (!user) {
    return {
      user: null,
      userInDb: null,
    };
  }

  // 1. First check: Validate Supabase session
  if (sessionError) {
    throw new Error("Invalid Session");
  }

  const { userInDb } = await getUserDetails(user.id);
  return { user, userInDb };
}

// ensuring any route that requires an admin is protected
export async function isAuthorizedAdmin() {
  const { user, userInDb } = await isAuthenticatedUser();
  if (!user || !userInDb) redirect("/login");
  const userRole = await getUserRole(userInDb.userId);
  if (userRole !== "admin") {
    redirect("/");
  }

  console.log(user, userInDb);

  return { user, userInDb };
}
export async function isAuthorizedUser() {
  const { user, userInDb } = await isAuthenticatedUser();
  if (!userInDb)
    return {
      user: null,
      userInDb: null,
    };
  const userRole = await getUserRole(userInDb.userId);

  if (userRole !== "user") {
    redirect("/admin");
  }

  return { user, userInDb };
}

// USER Get Requests
export const getUserDetails = async (userId: string) => {
  try {
    const userDetails = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userId, userId));

    if (!userDetails[0]) {
      await logout();
      throw new Error("User Not Found");
    }
    return {
      errorMessage: null,
      userInDb: userDetails[0],
    };
  } catch (error) {
    throw new Error("User Not Found");
  }
};

export const getUserRole = async (userId: string) => {
  const [user] = await db
    .select({
      role: permissionsTable.role,
    })
    .from(permissionsTable)
    .where(eq(permissionsTable.memberId, userId));

  if (!user) {
    return null;
  }
  return user.role;
};
