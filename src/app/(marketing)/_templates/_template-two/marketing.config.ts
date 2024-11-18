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
  FAQ: {
    heading: "Frequently Asked Questions",
    description:
      "If you have any questions, please feel free to contact us. We are always here to help you.",
    faq: [
      {
        question: "Do I need to make a reservation?",
        answer:
          "While walk-ins are welcome, we highly recommend making a reservation, especially for weekend dining and special occasions. You can book through our website or call us directly.",
        id: "1",
      },
      {
        question: "What are your opening hours?",
        answer:
          "We are open Tuesday through Sunday from 10am to 10pm. We are closed on Mondays.",
        id: "2",
      },
      {
        question: "Do you accommodate dietary restrictions?",
        answer:
          "Yes, we offer various options for vegetarian, vegan, and gluten-free diets. Please inform your server about any allergies or dietary restrictions when ordering.",
        id: "3",
      },
      {
        question: "Is there parking available?",
        answer:
          "Yes, we offer complimentary valet parking for our guests. There is also street parking and a public parking garage within walking distance.",
        id: "4",
      },
    ],
  },
  FinalCTA: {
    heading: "Ready to Elevate Your Dining Experience?",
    description:
      "Indulge in exquisite flavors and unforgettable moments at our restaurant. From farm-fresh ingredients to innovative recipes, every dish tells a story.",
    primaryCta: {
      title: "Reserve a Table",
      href: "/book-table",
    },
    image: "/marketing_4.jpg",
  },
  Footer: {
    heading: "Contact Us",
    description:
      "If you have any questions, please feel free to contact us. We are always here to help you.",
    links: [
      {
        title: "Overview",
        href: "#overview",
      },
      {
        title: "Features",
        href: "#features",
      },
      {
        title: "About Us",
        href: "#about-us",
      },
      {
        title: "Contact Us",
        href: "#contact-us",
      },
    ],
    socialLinks: [
      {
        title: "Facebook",
        href: "https://www.facebook.com",
      },
      {
        title: "Instagram",
        href: "https://www.instagram.com",
      },
      {
        title: "Twitter",
        href: "https://www.twitter.com",
      },
    ],
  },
};
