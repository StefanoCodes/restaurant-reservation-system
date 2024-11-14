import Loading from "@/components/loading-spinner";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { Suspense } from "react";
import AddNewTable from "./_components/add-new-table";
import TablesList from "./_components/manage-tables";
import H1 from "@/app/(admin)/admin/_components/h1";
export default async function AdminTablesPage() {
  await isAuthorizedAdmin();
  return (
    <main className="h-full w-full">
      <div className="flex h-full w-full flex-col items-start justify-start gap-4">
        <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
          <H1>Manage Resturaunts Tables</H1>
          <AddNewTable />
        </div>
        <div className="w-full">
          <Suspense fallback={<Loading />}>
            <TablesList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
