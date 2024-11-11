import Loading from "@/components/loading-spinner";
import { Suspense } from "react";
import UserBookings from "./_components/user-bookings";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
export default async function Bookings() {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");

  return (
    <main>
      <section className="mx-auto flex max-w-7xl flex-col gap-4 px-10 py-8 text-center md:px-4 md:text-left">
        <h1 className="text-2xl font-semibold">Your Bookings:</h1>
        <Suspense fallback={<Loading />}>
          <UserBookings />
        </Suspense>
      </section>
    </main>
  );
}
