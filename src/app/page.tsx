import { Button } from "@/components/ui/button";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { Metadata } from "next";
import Link from "next/link";

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
	const { userInDb } = await isAuthorizedUser();

	return (
		<div className="flex flex-col min-h-screen items-center mt-[2.5rem] p-3 w-full">
			<h1 className="text-black scroll-m-20 text-5xl font-bold tracking-tight text-center">
				Restaurant Reservation System
			</h1>
			<p className="mx-auto max-w-[600px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
				This is a resturant reservation system that allows you to manage your
				reservations and customers.
			</p>
			{userInDb && (
				<Button asChild>
					<Link className={`mt-2`} href="/book-table" prefetch={false}>
						Book a table
					</Link>
				</Button>
			)}
		</div>
	);
}
