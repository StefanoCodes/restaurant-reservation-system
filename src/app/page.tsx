import { Button } from "@/components/ui/button";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { Metadata } from "next";
import Link from "next/link";
import LogoutButton from "./logout-button";
import { redirect } from "next/navigation";

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
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");
  return (
    <div className="mt-[2.5rem] flex min-h-screen w-full flex-col items-center p-3">
      <h1 className="scroll-m-20 text-center text-5xl font-bold tracking-tight text-black">
        Restaurant Reservation System
      </h1>
      <p className="mx-auto mt-2 max-w-[600px] text-center text-gray-500 dark:text-gray-400 md:text-lg">
        This is a resturant reservation system that allows you to manage your
        reservations and customers.
      </p>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {userInDb && <LogoutButton />}
        {userInDb && (
          <Button asChild>
            <Link href="/book-table">Book a table</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
