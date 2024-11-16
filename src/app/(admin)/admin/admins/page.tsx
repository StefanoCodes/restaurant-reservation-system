import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import ManageUsers from "../users/_components/manage-users";
import ManageAdmins from "./_components/manage-admins";
import AddNewAdmin from "./_components/add-new-admin";
import { Suspense } from "react";
import ButtonPendingLoader from "@/components/button-pending-loader";

export default async function Page() {
  await isAuthorizedAdmin();
  return (
    <div className="flex flex-col gap-4">
      <AddNewAdmin />
      <Suspense
        fallback={
          <div className="flex min-h-[500px] items-center justify-center">
            <ButtonPendingLoader />
          </div>
        }
      >
        <ManageAdmins />
      </Suspense>
    </div>
  );
}
