import BusinessHours from "./_components/business-hours";
import { getAdminSettings } from "@/lib/data/admin";
import BookingDurationHours from "./_components/booking-duration-interval";

export default async function AdminSettingsPage() {
  const { businessHours, bookingDurationInterval } = await getAdminSettings();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold md:hidden">Admin Settings Page</h1>
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <BusinessHours initialHours={businessHours} />
        <BookingDurationHours
          bookingDurationInterval={bookingDurationInterval}
        />
      </div>
    </div>
  );
}
