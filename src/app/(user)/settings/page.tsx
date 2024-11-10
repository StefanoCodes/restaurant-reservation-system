import { Suspense } from "react";
import Loading from "../loading";
import UserSettings from "./_components/user-settings";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";

export default async function UserSettingsPage() {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");
  const dtoUser = {
    name: userInDb.name,
    email: userInDb.email,
    phoneNumber: userInDb.phoneNumber,
    createdAt: userInDb.createdAt,
  };
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <UserSettings user={dtoUser} />
      </Suspense>
    </main>
  );
}
