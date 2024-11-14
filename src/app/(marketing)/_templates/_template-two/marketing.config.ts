import { marketingConfig } from "../_template-one/marketing.config";

export const templateTwoConfig = {
  Navbar: {
    ...marketingConfig.Navbar,
  },
  Header: {
    ...marketingConfig.Header,
    title: "Elevate Your Dining Experience",
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
