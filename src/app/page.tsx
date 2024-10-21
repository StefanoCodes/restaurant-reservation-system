import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import Container from "./Container";
import LogoutButton from "./logout-button";
import { createClient } from "@/supabase/utils/server";
import { getUserDetails, getUserRole } from "@/lib/data";
import { redirect } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
	keywords: ["restaurant", "reservation", "system", "login", "register"],
	title: "Restaurant Reservation System",
	openGraph: {
		description:
			"This is a restaurant reservation system that allows you to manage your reservations and customers.",
		images: [""],
	},
	twitter: {
		card: "summary_large_image",
		title: "Restaurant Reservation System",
		description:
			"This is a restaurant reservation system that allows you to manage your reservations and customers.",
		siteId: "",
		creator: "@StefanoCodes",
		creatorId: "",
		images: [""],
	},
};

export default async function MarketingPage() {
	const { auth } = createClient();
	// reading the session
	const user = (await auth.getUser()).data.user;
	if (!user) redirect("/login");
	// to check if the user is in the db
	const userDetails = await getUserDetails(user.id);
	if (!userDetails) redirect("/login");
	// to check if the user is an admin
	const userRole = await getUserRole(user.id);
	if (user && userRole === "user") redirect("/book-table");
	if (user && userRole === "admin") redirect("/admin");
	return (
		<Container>
			<div className="flex flex-col min-h-screen items-center mt-[2.5rem] p-3 w-full">
				<h1 className="text-black scroll-m-20 text-5xl font-bold tracking-tight text-center">
					Restaurant Reservation System
				</h1>
				<p className="mx-auto max-w-[600px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
					This is a resturant reservation system that allows you to manage your
					reservations and customers.
				</p>
				<div className="flex gap-2 mt-4 items-center">
					<Button asChild>
						<Link href={`/register`}>Register</Link>
					</Button>
					<Button asChild>
						<Link href="/login">Login</Link>
					</Button>
				</div>
			</div>
		</Container>
	);
}
