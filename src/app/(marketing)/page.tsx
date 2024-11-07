import { isAuthorizedUser } from "@/app/(auth)/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "./_components/Navbar";
import Header from "./_components/Header";
import Features from "./_components/Features";
import AboutUsSection from "./_components/About-us";
import { getUser } from "../auth";
import ContactUs from "./_components/contact-us";
import Footer from "./_components/footer";
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
  const user = await getUser();
  // check if the user is an admin
  if (user) {
    // check if the user is an admin
    if (await isAuthorizedUser()) {
      redirect("/admin");
    }
  }
  return (
    <main className="relative overflow-hidden" id="home">
      <Navbar user={user} />
      <Header />
      <Features />
      <AboutUsSection />
      <ContactUs />
      <Footer />
    </main>
  );
}
/* <div className="mt-[2.5rem] flex min-h-screen w-full flex-col items-center p-3">
        <span className="text-7xl">🧑‍🍳</span>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          )}
    //   />
    //   <h1 className="scroll-m-20 text-center text-5xl font-bold tracking-tight text-black">
    //     Restaurant Reservation System
    //   </h1>
    //   <p className="mx-auto mt-2 max-w-[600px] text-center text-gray-500 dark:text-gray-400 md:text-lg">
    //     This is a resturant reservation system that allows you to manage your
    //     reservations and customers.
    //   </p>
    //   <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {userInDb && (
          <RainbowButton link="/book-table">Book a table</RainbowButton>
        )}
      </div>
  ); */
