import Loading from "@/app/loading-spinner";
import { getUserRole } from "@/lib/data";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AddNewTable from "./_components/add-new-table";
import TablesList from "./_components/manage-tables";

export default async function AdminUsersPage() {
	const { auth } = createClient();
	const {
		data: { user },
		error,
	} = await auth.getUser();
	if (error || !user) {
		return <div>Error fetching user data: {error?.message}</div>;
	}
	const userRole = await getUserRole(user.id);
	if (userRole !== "admin") redirect("/");

	return (
		<main className="w-full h-full">
			<div className="flex flex-col justify-start items-start w-full h-full gap-4">
				<div className="flex flex-row justify-between items-center w-full mb-4">
					<h1>Manage Resturaunts Tables</h1>
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
