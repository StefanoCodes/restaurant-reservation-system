import { getUser } from "@/app/(user)/auth-utils";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import CompaniesLogos from "../../_components/utils/companies";
import Features from "./_components/Features";
import AboutUs from "./_components/About";

export default function TemplateTwo() {
  const user = getUser();
  return (
    <>
      <Navbar user={user} />
      <Header />
      <CompaniesLogos />
      <Features />
      <AboutUs />
    </>
  );
}
