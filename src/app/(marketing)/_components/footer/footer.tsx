import BusinessHours from "./business-hours";
import FooterNavLinks from "./footer-nav-links";
import SocialLinks from "./social-links";
import { marketingConfig } from "@/app/(marketing)/marketing.config";
const { copyright } = marketingConfig.Footer;

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-12 dark:bg-gray-800">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <SocialLinks />
          <FooterNavLinks />
          <BusinessHours />
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
