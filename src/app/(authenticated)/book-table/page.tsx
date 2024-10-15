import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import BookingForm from "./components/booking-form";
import { getTables, getUserReservationDetails } from "@/app/actions/actions";
import { Suspense } from "react";
import Loading from "../loading";

async function BookingFormWrapper() {
  const { auth } = createClient();
  const session = (await auth.getUser()).data.user;
  if (!session) redirect("/login");

  const userId = session.id;
  const [user, tables] = await Promise.all([
    getUserReservationDetails(userId),
    getTables(),
  ]);

  if (!user) {
    // Handle the case when user details are not found
    return <div>User details not found. Please try again later.</div>;
  }

  return <BookingForm user={user} tables={tables} />;
}
export default async function BookTablePage() {
  return (
    <main>
      <section className="max-w-7xl flex flex-col gap-4 mx-auto py-10 ">
        <h1 className="text-2xl font-semibold capitalize">Select a Table</h1>
        <Suspense fallback={<Loading />}>
          <BookingFormWrapper />
        </Suspense>
      </section>
    </main>
  );
}
