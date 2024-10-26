import Loading from "@/app/loading-spinner";
import { getUserRole } from "@/lib/data";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ManageUsers from "./_components/manage-users";

export default async function AdminUsersPage() {
	const { auth } = await createClient();
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
		<div className="flex flex-col justify-start items-start w-full h-full gap-4">
			<Suspense fallback={<Loading />}>
				<div className="w-full">
					<ManageUsers />
				</div>
			</Suspense>
		</div>
	);
}
