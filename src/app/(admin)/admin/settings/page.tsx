import BusinessHours from "./_components/business-hours";
import { getBookingDurationInterval, getBusinessHours } from "@/lib/data/admin";
import BookingDurationHours from "./_components/booking-duration-interval";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import ScheduleClosedDate from "./_components/schedule-closed-date";
import { getClosedDates } from "@/lib/data/user";
import CalendarComponent from "@/components/calendar";

export default async function AdminSettingsPage() {
  await isAuthorizedAdmin();
  // passing down the promise to the client component and using it there to fasten the initial page load
  const initialBusinessHours = getBusinessHours();
  const bookingDurationInterval = getBookingDurationInterval();
  const closedDates = getClosedDates();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold md:hidden">Admin Settings Page</h1>
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <BusinessHours initialHoursPromise={initialBusinessHours} />
        </div>
        <div className="flex flex-[0.4] flex-col gap-4">
          <BookingDurationHours
            bookingDurationIntervalPromise={bookingDurationInterval}
          />
          <ScheduleClosedDate closedDatesPromise={closedDates} />
        </div>
      </div>
    </div>
  );
}
