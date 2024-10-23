import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import BookingForm from "./components/booking-form";
import { getTables, getUserReservationDetails, getUserRole } from "@/lib/data";
import { Suspense } from "react";
import Loading from "@/app/loading-spinner";
import { Metadata } from "next";
export const metadata: Metadata = {
	keywords: ["restaurant", "reservation", "system", "book", "table"],
	title: "Book a Table",
	openGraph: {
		description:
			"This is a restaurant reservation system that allows you to book a table.",
		images: [""],
	},
	twitter: {
		card: "summary_large_image",
		title: "Book a Table",
		description:
			"This is a restaurant reservation system that allows you to book a table.",
		siteId: "",
		creator: "@StefanoCodes",
		creatorId: "",
		images: [""],
	},
};
// dont forget to add the functionality to check if a user has already booked a table for that day if so he cant book another table for that day
async function BookingFormWrapper() {
	const client = await createClient();
	const session = (await client.auth.getUser()).data.user;
	if (!session) redirect("/login");
	const userRole = await getUserRole(session.id);
	if (userRole !== "user") redirect("/");
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
			<section className="max-w-7xl flex flex-col gap-4 mx-auto py-8 px-10 md:px-4 text-center md:text-left">
				<Suspense fallback={<Loading />}>
					<BookingFormWrapper />
				</Suspense>
			</section>
		</main>
	);
}
