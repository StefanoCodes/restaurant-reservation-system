import Loading from "@/app/loading-spinner";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { Suspense } from "react";
import AddNewTable from "./_components/add-new-table";
import TablesList from "./_components/manage-tables";
import H1 from "../h1";

export default async function AdminTablesPage() {
	await isAuthorizedAdmin();

	return (
		<main className="w-full h-full">
			<div className="flex flex-col justify-start items-start w-full h-full gap-4">
				<div className="flex flex-row justify-between items-center w-full mb-4">
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
