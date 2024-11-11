import { Metadata } from "next";
import Navbar from "./_components/Navbar";
import Header from "./_components/Header";
import Features from "./_components/Features";
import AboutUs from "./_components/About-us";
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
  return (
    <main className="relative overflow-hidden" id="home">
      <Navbar />
      <Header />
      <Features />
      <AboutUs />
      <ContactUs />
      <Footer />
    </main>
  );
}
