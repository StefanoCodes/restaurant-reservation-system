import Loading from "@/app/loading-spinner";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { Suspense } from "react";
import ManageUsers from "./_components/manage-users";
import H1 from "../h1";

export default async function AdminUsersPage() {
	await isAuthorizedAdmin();

	return (
		<div className="flex flex-col justify-start items-start w-full h-full gap-4">
			<H1>Manage Users</H1>
			<Suspense fallback={<Loading />}>
				<div className="w-full">
					<ManageUsers />
				</div>
			</Suspense>
		</div>
	);
}
