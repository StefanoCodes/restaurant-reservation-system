import { getBookings } from "@/lib/data";
import Loading from "@/app/loading";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import BookingCard from "@/app/(user)/book-table/components/booking-card";
import NoBookingsFound from "../book-table/components/no-bookings-found";

export default async function Bookings() {
  const { auth } = createClient();
  const {
    data: { user },
    error,
  } = await auth.getUser();
  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }
  if (!user) redirect("/login");

  const bookings = await getBookings(user.id).catch((error) => {
    console.error("Error fetching bookings:", error);
    return [];
  });

  return (
    <main>
      <section className="max-w-7xl flex flex-col gap-4 mx-auto py-8 px-10 md:px-4 text-center md:text-left">
        <h1 className="text-2xl font-semibold">Your Bookings:</h1>
        <Suspense fallback={<Loading />}>
          {bookings.length === 0 ? (
            <NoBookingsFound />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.map(({ reservation, table, user }) => (
                <BookingCard
                  key={reservation.id}
                  reservation={{
                    ...reservation,
                  }}
                  table={table}
                  user={user}
                />
              ))}
            </div>
          )}
        </Suspense>
      </section>
    </main>
  );
}
