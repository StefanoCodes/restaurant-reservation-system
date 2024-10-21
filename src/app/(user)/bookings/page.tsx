import { getUserRole } from "@/lib/data";
import Loading from "@/app/loading-spinner";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import UserBookings from "./_components/user-bookings";

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

	const userRole = await getUserRole(user.id);
	if (userRole !== "user") redirect("/");

	return (
		<main>
			<section className="max-w-7xl flex flex-col gap-4 mx-auto py-8 px-10 md:px-4 text-center md:text-left">
				<h1 className="text-2xl font-semibold">Your Bookings:</h1>
				<Suspense fallback={<Loading />}>
					<UserBookings userId={user.id} />
				</Suspense>
			</section>
		</main>
	);
}
