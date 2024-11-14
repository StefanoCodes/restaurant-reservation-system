import { getUser } from "@/app/(user)/auth-utils";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import CompaniesLogos from "../../_components/utils/companies";

export default function TemplateTwo() {
  const user = getUser();
  return (
    <>
      <Navbar user={user} />
      <Header />
      <CompaniesLogos />
    </>
  );
}
