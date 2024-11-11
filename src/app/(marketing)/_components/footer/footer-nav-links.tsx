import FooterNavLink from "./footer-nav-link";
import { marketingConfig } from "@/app/(marketing)/marketing.config";
const { links } = marketingConfig.Navbar;

export default function FooterNavLinks() {
  return (
    <nav className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Quick Links
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <FooterNavLink key={link.label} link={link} />
        ))}
      </ul>
    </nav>
  );
}
