import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import IsUserLoggedInButton from "./isUserLoggedIn-button";
import Container from "./Container";
import LogoutButton from "./logout-button";
import { createClient } from "@/supabase/utils/server";
import LoginButton from "./login-button";

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
  const user = (await auth.getUser()).data.user;
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
          <IsUserLoggedInButton />
          {!user?.id && <LoginButton />}
          {user?.id && (
            <Link href="/reservations">
              <Button
                variant="outline"
                className="bg-orange-500 text-white hover:text-white hover:bg-orange-600"
              >
                View Reservations
              </Button>
            </Link>
          )}
          {user?.id && <LogoutButton />}
        </div>
      </div>
    </Container>
  );
}
