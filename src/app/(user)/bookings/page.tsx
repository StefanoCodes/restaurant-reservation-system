import Loading from "@/app/loading-spinner";
import { Suspense } from "react";
import UserBookings from "./_components/user-bookings";
import { isAuthorizedUser } from "@/app/(auth)/auth";
export default async function Bookings() {
	await isAuthorizedUser();

	return (
		<main>
			<section className="max-w-7xl flex flex-col gap-4 mx-auto py-8 px-10 md:px-4 text-center md:text-left">
				<h1 className="text-2xl font-semibold">Your Bookings:</h1>
				<Suspense fallback={<Loading />}>
					<UserBookings />
				</Suspense>
			</section>
		</main>
	);
}
