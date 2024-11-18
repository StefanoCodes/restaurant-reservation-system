import { getUser } from "@/app/(user)/auth-utils";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import CompaniesLogos from "../../_components/utils/companies";
import Features from "./_components/Features";
import AboutUs from "./_components/About";
import Faq from "./_components/Faq";
import FinalCTA from "./_components/final-cta";
import Footer from "./_components/Footer";

export default function TemplateTwo({
  preview = false,
}: {
  preview?: boolean;
}) {
  const user = getUser();
  return (
    <>
      {!preview && <Navbar user={user} />}
      <Header />
      <CompaniesLogos />
      <Features />
      <AboutUs />
      <Faq />
      <FinalCTA />
      <Footer />
    </>
  );
}
