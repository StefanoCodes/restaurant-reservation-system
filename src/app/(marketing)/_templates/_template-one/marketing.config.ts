// all the content for the marketing page
// this is a config file that contains all the content for the marketing page

import { WEEKDAYS } from "@/lib/constants";
import {
  Award,
  Clock,
  Facebook,
  Flame,
  Instagram,
  Leaf,
  Twitter,
  Users,
  Utensils,
  Wifi,
} from "lucide-react";
// Template 1
export const marketingConfig = {
  Navbar: {
    logo: "/logo.jpg",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book Table", href: "/book-table" },
    ],
  },
  Header: {
    title: "Welcome To Our Restaurant",
    description:
      "We are a restaurant that serves delicious food and drinks. We are " +
      "located in the heart of the city and we are open from " +
      "10am to 10pm.",
    primaryCta: {
      label: "Make a Reservation",
      href: "/book-table",
    },
    secondaryCta: {
      label: "View Menu",
      href: "/menu",
    },
    socialProof: {
      title: "Loved by 1000+ customers",
      avatarUrls: [
        "/daniel.webp",
        "/dan.webp",
        "/blake.webp",
        "/daniel.webp",
        "/blake.webp",
      ],
      rating: 5,
    },
    images: [
      "/marketing_1.jpg",
      "/marketing_2.jpg",
      "/marketing_3.jpg",
      "/marketing_4.jpg",
      "/marketing_5.jpg",
      "/marketing_6.jpg",
    ],
  },
  Features: {
    title: "Why Choose",
    highlightedText: "Us",
    description:
      "Discover the unique features that set our restaurant apart and make your dining experience unforgettable.",
    cards: [
      {
        icon: Utensils,
        title: "Gourmet Cuisine",
        description:
          "Experience exquisite flavors crafted by our world-class chefs using only the finest ingredients.",
      },
      {
        icon: Clock,
        title: "24/7 Service",
        description:
          "Enjoy our delectable offerings any time of day or night with our round-the-clock dining options.",
      },
      {
        icon: Award,
        title: "Award-Winning",
        description:
          "Savor dishes from our Michelin-starred kitchen, recognized for culinary excellence.",
      },
      {
        icon: Leaf,
        title: "Sustainable Practices",
        description:
          "We're committed to eco-friendly operations and sourcing ingredients from local, organic farms.",
      },
      {
        icon: Users,
        title: "Private Dining",
        description:
          "Host memorable events in our elegant private dining rooms, perfect for any occasion.",
      },
      {
        icon: Wifi,
        title: "Free High-Speed Wi-Fi",
        description:
          "Stay connected with complimentary high-speed internet access throughout our restaurant.",
      },
    ],
  },
  AboutUs: {
    title: "Our",
    highlightedText: "Story",
    description:
      "Welcome to Gourmet Haven, where culinary artistry meets warm hospitality. Our passion for exceptional food and memorable dining experiences has been our driving force since 1995.",
    keyPoints: [
      {
        icon: Clock,
        title: "Established 1995",
        description: "Over 25 years of culinary excellence",
      },
      {
        icon: Award,
        title: "Michelin Starred",
        description: "Recognized for our outstanding cuisine",
      },
      {
        icon: Leaf,
        title: "Farm to Table",
        description: "Committed to using fresh, local ingredients",
      },
      {
        icon: Flame,
        title: "Award Winning",
        description: "Recognized for our outstanding cuisine",
      },
    ],
    teamMembers: [
      {
        name: "Jason Chen",
        role: "Head Chef",
        image: "/blake.webp",
      },
      {
        name: "Michael Roberts",
        role: "Sommelier",
        image: "/daniel.webp",
      },
      {
        name: "John Johnson",
        role: "Pastry Chef",
        image: "/dan.webp",
      },
    ],
  },
  ContactUs: {
    title: "Contact",
    highlightedText: "Us",
    description:
      "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    address: "123 Gourmet Street, Foodie City, FC 12345",
    phone: "(123) 456-7890",
    email: "info@gourmethaven.com",
  },
  Footer: {
    copyright: `© ${new Date().getFullYear()} Gourmet Haven. All rights reserved.`,
    socialLinks: [
      { icon: Facebook, href: "https://www.facebook.com/gourmethaven" },
      { icon: Instagram, href: "https://www.instagram.com/gourmethaven" },
      { icon: Twitter, href: "https://www.twitter.com/gourmethaven" },
    ],
    businessHours: WEEKDAYS,
  },
};
