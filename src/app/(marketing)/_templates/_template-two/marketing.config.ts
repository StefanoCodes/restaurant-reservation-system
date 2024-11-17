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
  Features: {
    heading: "Why Choose Our Restaurant?",
    description:
      "Our restaurant offers a unique dining experience that will leave you wanting more. We are a restaurant that serves delicious food and drinks. We are located in the heart of the city and we are open from 10am to 10pm.",
    stats: [
      {
        title: "45k+",
        description: "Happy Customers",
      },
      {
        title: "200K+",
        description: "Meals Served",
      },
    ],
    image: "/marketing_5.jpg",
  },
  AboutUs: {
    heading: "About Us",
    description:
      "Our restaurant offers a unique dining experience that will leave you wanting more. We are a restaurant that serves delicious food and drinks. We are located in the heart of the city and we are open from 10am to 10pm.",
    mainImage: "/marketing_3.jpg",
    customers: [
      {
        image: "/daniel.webp",
        name: "Daniel",
        review:
          "I have been using the Business Solution services for the past year, and I am extremely satisfied with the results. Their innovative solutions and expertise have transformed my business operations.",
      },
      {
        image: "/blake.webp",
        name: "Blake",
        review:
          "I have been using the Business Solution services for the past year, and I am extremely satisfied with the results. Their innovative solutions and expertise have transformed my business operations.",
      },
    ],
  },
};
