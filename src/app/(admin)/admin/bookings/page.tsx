import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import ManageBookings from "./_components/manage-bookings";
import { Suspense } from "react";
import H1 from "../h1";
import BookingCardLoadingSkeleton from "./_components/booking-card-loading-skeleton";

export default async function ManageBookingsPage() {
  await isAuthorizedAdmin();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:items-start sm:justify-start">
      <H1>Manage Bookings</H1>
      <Suspense fallback={<BookingCardLoadingSkeleton />}>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ManageBookings />
        </div>
      </Suspense>
    </div>
  );
}
