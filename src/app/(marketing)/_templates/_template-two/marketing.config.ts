import { marketingConfig } from "../_template-one/marketing.config";

export const templateTwoConfig = {
  Navbar: {
    ...marketingConfig.Navbar,
  },
  Header: {
    ...marketingConfig.Header,
    title: "Elevate Your Dining Experience",
    description:
      "Experience the ultimate dining experience with our exquisite menu and impeccable service. Our restaurant offers a unique dining experience that will leave you wanting more.",
    primaryCta: {
      title: "Reserve a Table",
      href: "/book-table",
    },
    secondaryCta: {
      title: "View Menu",
      href: "/menu",
    },
  },
};
