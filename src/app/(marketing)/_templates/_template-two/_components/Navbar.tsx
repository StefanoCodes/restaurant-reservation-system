"use client";
import Link from "next/link";
import { useState } from "react";
import { templateTwoConfig } from "@/app/(marketing)/_templates/_template-two/marketing.config";
const { Navbar: navItems } = templateTwoConfig;

export default function Navbar() {
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
                  <span className="flex h-6 w-3 rounded-l-full bg-emerald-500" />
                  <span className="mt-2 flex h-6 w-3 rounded-r-full bg-[#f88fc2]" />
                </span>
                <span className="text-lg text-gray-700 dark:text-white">
                  Podux
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
                      className="text-lg transition ease-linear hover:text-emerald-500"
                    >
                      {navItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex w-full flex-col gap-4 sm:w-max lg:mt-0 lg:min-w-max lg:flex-row lg:items-center">
                <Link
                  href="#"
                  className="relative flex h-12 w-full items-center justify-center px-7 text-emerald-500 before:absolute before:inset-0 before:rounded-full before:bg-emerald-500/5 before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95 dark:before:bg-emerald-500/10 sm:w-max"
                >
                  <span className="relative text-emerald-500">Signin</span>
                </Link>
                <Link
                  href="#"
                  className="relative flex h-12 w-full items-center justify-center px-7 text-white before:absolute before:inset-0 before:rounded-full before:bg-emerald-500 before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-white"> Join Us</span>
                </Link>
              </div>
            </div>
            <div className="ml-2 flex min-w-max items-center gap-x-3 border-l border-gray-100 pl-2 dark:border-gray-800">
              <button className="relative flex p-3 text-gray-700 outline-none dark:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hidden h-6 w-6 dark:flex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 dark:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
                <span className="sr-only">switch theme</span>
              </button>
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
