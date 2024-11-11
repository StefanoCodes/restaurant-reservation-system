import { Facebook, Twitter, Instagram } from "lucide-react";
import BusinessHours from "./business-hours";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-12 dark:bg-gray-800">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gourmet Haven
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Exquisite dining experiences since 1995.
            </p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-primary-brand-color cursor-pointer text-gray-400" />
              <Twitter className="hover:text-primary-brand-color cursor-pointer text-gray-400" />
              <Instagram className="hover:text-primary-brand-color cursor-pointer text-gray-400" />
            </div>
          </div>
          <nav className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-brand-color text-sm text-gray-500 dark:text-gray-400"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-brand-color text-sm text-gray-500 dark:text-gray-400"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-brand-color text-sm text-gray-500 dark:text-gray-400"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-brand-color text-sm text-gray-500 dark:text-gray-400"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-brand-color text-sm text-gray-500 dark:text-gray-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Opening Hours
            </h3>
            <BusinessHours />
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          © 2024 Gourmet Haven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
