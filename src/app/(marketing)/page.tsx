import { Metadata } from "next";
import Navbar from "./_components/navbar/Navbar";
import Header from "./_components/header/Header";
import Features from "./_components/features/Features";
import AboutUs from "./_components/about-us/About-us";
import ContactUs from "./_components/contact/contact-us";
import Footer from "./_components/footer/footer";
import { marketingConfig } from "./marketing.config";
const {
  restaurantName,
  openGraphImage,
  twitterImage,
  keywords,
  creator,
  siteUrl,
  description,
} = marketingConfig.Meta;

export const metadata: Metadata = {
  keywords: keywords,
  title: restaurantName,
  openGraph: {
    description: description,
    images: [openGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: restaurantName,
    description: description,
    siteId: siteUrl,
    creator: creator,
    images: [twitterImage],
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
