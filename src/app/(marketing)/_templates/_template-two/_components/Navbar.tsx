"use client";
import Link from "next/link";
import { use, useState } from "react";
import { templateTwoConfig } from "@/app/(marketing)/_templates/_template-two/marketing.config";
import { User } from "@/db/schema";
import { NavUser } from "@/app/(marketing)/_components/navbar/nav-user-toggle";
const { Navbar: navItems } = templateTwoConfig;

export default function Navbar({ user }: { user: Promise<User | null> }) {
  const userDetails = use(user);
  const [openNavbar, setOpenNavbar] = useState(false);
  const toggleNavbar = () => {
    setOpenNavbar((openNavbar) => !openNavbar);
  };
  const closeNavbar = () => {
    setOpenNavbar(false);
  };
  return (
    <>
      <div
        onClick={() => {
          closeNavbar();
        }}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-gray-800/40 ${openNavbar ? "flex lg:hidden" : "hidden"}`}
      />
      <header className="absolute inset-x-0 top-0 z-50 flex h-20 items-center">
        <div className="relative z-50 mx-auto w-full px-5 sm:px-10 md:px-12 lg:max-w-7xl lg:px-5">
          <nav className="relative flex w-full items-center justify-between">
            <div className="relative inline-flex bg-inherit">
              <Link href="#" className="flex items-center gap-2">
                <span className="flex">
                  <span className="flex h-6 w-3 rounded-l-full bg-template-two" />
                  <span className="bg-template-two-accent mt-2 flex h-6 w-3 rounded-r-full" />
                </span>
                <span className="text-lg text-gray-700 dark:text-white">
                  Gourmet
                </span>
              </Link>
            </div>
            <div
              className={`absolute top-10 flex w-full origin-top flex-col rounded-xl border border-gray-200 bg-white px-5 py-6 shadow-lg shadow-gray-100 transition-all duration-300 ease-linear dark:border-gray-800 dark:bg-gray-950 dark:shadow-transparent sm:px-8 md:px-12 lg:relative lg:top-0 lg:z-auto lg:flex-row lg:justify-between lg:rounded-none lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:pt-0 lg:shadow-none lg:dark:bg-transparent ${openNavbar ? "" : "invisible translate-y-6 opacity-20 lg:visible lg:translate-y-0 lg:opacity-100"} `}
            >
              <ul className="flex w-full flex-col gap-y-4 text-gray-700 dark:text-gray-100 lg:w-full lg:flex-row lg:items-center lg:justify-center lg:gap-x-8">
                {navItems.links.map((navItem) => (
                  <li key={navItem.href}>
                    <Link
                      href={navItem.href}
                      className="text-lg transition ease-linear hover:text-template-two"
                    >
                      {navItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex w-full flex-col gap-4 sm:w-max lg:mt-0 lg:min-w-max lg:flex-row lg:items-center">
                {/* Profile dropdown */}
                {userDetails ? (
                  <NavUser user={userDetails} />
                ) : (
                  <Link
                    href="/login"
                    className="before:bg-template-two/5 dark:before:bg-template-two/10 relative flex h-12 w-full items-center justify-center px-7 text-template-two before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95 sm:w-max"
                  >
                    <span className="relative text-template-two">Login</span>
                  </Link>
                )}
              </div>
            </div>
            <div className="ml-2 flex min-w-max items-center gap-x-3 border-l border-gray-100 pl-2 dark:border-gray-800">
              <button
                onClick={() => {
                  toggleNavbar();
                }}
                aria-label="toggle navbar"
                className="children:flex relative flex h-auto w-7 flex-col outline-none lg:hidden"
              >
                <span
                  aria-hidden="true"
                  className={`h-0.5 w-6 origin-right rounded-full bg-gray-700 transition-all duration-300 ease-linear dark:bg-gray-200 ${openNavbar ? "-translate-y-[0.375rem] -rotate-[40deg] scale-x-100" : "scale-x-75"} `}
                />
                <span
                  aria-hidden="true"
                  className={`mt-1 h-0.5 w-6 origin-center rounded-full bg-gray-700 transition-all duration-300 ease-linear dark:bg-gray-200 ${openNavbar ? "scale-x-0 opacity-0" : ""} `}
                />
                <span
                  aria-hidden="true"
                  className={`mt-1 h-0.5 w-6 origin-right rounded-full bg-gray-700 transition-all duration-300 ease-linear dark:bg-gray-200 ${openNavbar ? "-translate-y-[0.150rem] rotate-[40deg] scale-x-100" : "scale-x-50"} `}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
