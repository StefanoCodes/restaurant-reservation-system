import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import ManageBookings from "./_components/manage-bookings";
import { Suspense } from "react";
import Loading from "@/app/loading-spinner";

export default async function ManageBookingsPage() {
	await isAuthorizedAdmin();

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
