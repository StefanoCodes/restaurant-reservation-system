import { getUserRole } from "@/lib/data";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import ManageBookings from "./_components/manage-bookings";
import { Suspense } from "react";
import Loading from "@/app/loading-spinner";

export default async function ManageBookingsPage() {
	const client = await createClient();
	const {
		data: { user },
		error,
	} = await client.auth.getUser();
	if (error || !user) {
		return redirect("/login");
	}
	const userRole = await getUserRole(user.id);
	if (userRole !== "admin") redirect("/");

	return (
		<div className="flex flex-col justify-start items-start w-full h-full gap-4">
			<Suspense fallback={<Loading />}>
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<ManageBookings />
				</div>
			</Suspense>
		</div>
	);
}
