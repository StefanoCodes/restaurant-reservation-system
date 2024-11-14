import Header from "@/app/(marketing)/_components/header/Header";
import Navbar from "@/app/(marketing)/_components/navbar/Navbar";
import Features from "@/app/(marketing)/_components/features/Features";
import AboutUs from "@/app/(marketing)/_components/about-us/About-us";
import ContactUs from "@/app/(marketing)/_components/contact/contact-us";
import Footer from "@/app/(marketing)/_components/footer/footer";

export default function TemplateOne() {
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
