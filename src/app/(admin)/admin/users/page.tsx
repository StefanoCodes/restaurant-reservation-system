import Loading from "@/components/loading-spinner";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { Suspense } from "react";
import ManageUsers from "./_components/manage-users";
import H1 from "../h1";

export default async function AdminUsersPage() {
  await isAuthorizedAdmin();

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-4">
      <H1>Manage Users</H1>
      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <ManageUsers />
        </div>
      </Suspense>
    </div>
  );
}
