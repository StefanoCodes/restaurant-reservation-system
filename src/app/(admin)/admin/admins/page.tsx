import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import ButtonPendingLoader from "@/components/button-pending-loader";
import { Suspense } from "react";
import AddNewAdmin from "./_components/add-new-admin";
import ManageAdmins from "./_components/manage-admins";

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
