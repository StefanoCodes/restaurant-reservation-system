import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import ManageBookings from "./_components/manage-bookings";
import { Suspense } from "react";
import H1 from "../h1";
import BookingCardLoadingSkeleton from "./_components/booking-card-loading-skeleton";

export default async function ManageBookingsPage() {
	await isAuthorizedAdmin();
	return (
		<div className="flex flex-col justify-center items-center sm:justify-start sm:items-start w-full h-full gap-4">
			<H1>Manage Bookings</H1>
			<Suspense fallback={<BookingCardLoadingSkeleton />}>
				<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<ManageBookings />
				</div>
			</Suspense>
		</div>
	);
}
