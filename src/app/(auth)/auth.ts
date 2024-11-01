import "server-only";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { permissionsTable, usersTable } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { getErrorMessage } from "@/lib/utils";

import { logout } from "@/app/auth";
import { LRUCache } from "lru-cache";
// Ensures that we have a session and that the user in the session exists in the db

// const userCache = new LRUCache<string, any>({
//   max: 500, // Maximum number of items
//   ttl: 1000 * 60 * 5, // 5 minutes
// });

export async function isAuthenticatedUser() {
  try {
    const client = await createClient();
    // const cachedSession = userCache.get("current-session");
    // if (cachedSession) {
    //   return cachedSession;
    // }

    const {
      data: { user },
      error: sessionError,
    } = await client.auth.getUser();

    // 1. First check: Validate Supabase session
    if (sessionError) {
      await logout();
      throw new Error("Invalid session");
    }

    if (!user) {
      await logout();
      redirect("/login"); // Redirect to login instead of throwing error
    }

    // const result = { user };
    // userCache.set("current-session", result);

    // 2. Second check: Validate user exists in our database
    const { userInDb, errorMessage } = await getUserDetails(user.id);
    if (!userInDb || errorMessage) {
      await logout();
      redirect("/login");
    }

    return { user, userInDb };
  } catch (error: unknown) {
    console.error("Authentication check error:", error);
    throw error;
  }
}

// ensuring any route that requires an admin is protected
export async function isAuthorizedAdmin() {
  const { user, userInDb } = await isAuthenticatedUser();
  const userRole = await getUserRole(user.id);

  if (userRole !== "admin") {
    redirect("/");
  }

  return { user, userInDb };
}

// ensuring any route that requires a user is protected and admins cannot access them
export async function isAuthorizedUser() {
  const { user, userInDb } = await isAuthenticatedUser();
  const userRole = await getUserRole(user.id);

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
      return { userInDb: null, errorMessage: "User not found" };
    }
    return {
      errorMessage: null,
      userInDb: userDetails[0],
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getUserRole = async (userId: string) => {
  // we will get the role of the user from the permissions table
  // const [user] = await db
  // 	.select({
  // 		role: permissionsTable.role,
  // 	})
  // 	.from(permissionsTable)
  // 	.where(eq(permissionsTable.memberId, userId));

  // we will get the role of the user from the users table using the index we created

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
