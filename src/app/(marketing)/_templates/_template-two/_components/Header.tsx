import { templateTwoConfig } from "@/app/(marketing)/_templates/_template-two/marketing.config";
import AvatarCircles from "@/components/ui/avatar-circles";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const { socialProof, title, primaryCta, secondaryCta } =
  templateTwoConfig.Header;
export default function Header() {
  return (
    <>
      <section className="relative w-full">
        <div className="absolute inset-x-0 top-0 flex h-64 items-start">
          <div className="h-24 w-2/3 bg-gradient-to-br from-emerald-500 opacity-20 blur-2xl dark:invisible dark:from-[#570cac] dark:opacity-40"></div>
          <div className="h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl dark:from-[#670ccf] dark:opacity-40"></div>
        </div>
        <div className="relative mx-auto w-full px-5 sm:px-10 md:px-12 lg:max-w-7xl lg:px-5">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-44 dark:flex"
          >
            <div className="h-full w-full bg-gradient-to-tr opacity-40 dark:from-[#570cac] dark:opacity-20 dark:blur-2xl md:h-1/2 lg:h-full"></div>
          </div>
          <div className="relative mx-auto grid max-w-2xl gap-10 pt-24 md:max-w-3xl lg:max-w-none lg:grid-cols-2 xl:gap-14">
            <div className="lg:py-6">
              <div className="text-center lg:text-left">
                <span className="rounded-md bg-gray-100 px-2 py-1 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  #1 Italian Restaurant &nbsp;
                  <Link
                    href={secondaryCta.href}
                    className="font-semibold text-emerald-700 underline dark:text-white"
                  >
                    {secondaryCta.title}
                  </Link>
                </span>
                <h1 className="pt-4 text-4xl font-bold text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </div>
              <p className="mx-auto mt-8 max-w-xl text-center text-gray-600 dark:text-gray-300 lg:text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                beatae omnis ipsa magnam neque ut nam nesciunt esse fugit
                praesentium hic magni possimus illo consequatur.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:mx-auto sm:w-max sm:flex-row lg:mx-0">
                <Link
                  href={primaryCta.href}
                  className="relative flex h-12 w-full items-center justify-center px-7 text-white before:absolute before:inset-0 before:rounded-full before:bg-emerald-500 before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-white">
                    {primaryCta.title}
                  </span>
                </Link>
                <Link
                  href={secondaryCta.href}
                  className="relative flex h-12 w-full items-center justify-center px-7 text-emerald-500 before:absolute before:inset-0 before:rounded-full before:bg-emerald-500/5 before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95 dark:before:bg-emerald-500/10 sm:w-max"
                >
                  <span className="relative flex items-center gap-x-3 text-emerald-500">
                    {secondaryCta.title}
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </div>
              <div className="mx-auto mt-8 flex w-max flex-col items-center gap-4 text-center sm:flex-row sm:gap-0 lg:mx-0">
                <div className="flex items-center -space-x-2">
                  <AvatarCircles avatarUrls={socialProof.avatarUrls} />
                </div>
                <span className="pl-2 text-gray-600 dark:text-gray-200">
                  {" "}
                  300+ WordWide listners{" "}
                </span>
              </div>
            </div>
            <div className="hidden md:flex lg:h-full">
              <div className="relative flex h-96 min-h-[24rem] w-full items-center lg:h-full lg:min-h-[none] lg:w-full">
                <div className="absolute right-0 top-1/2 z-0 h-[calc(80%+20px)] w-5/6 -translate-y-1/2 bg-gradient-to-tr from-emerald-500 to-pink-300 opacity-25 blur-2xl dark:from-[#570cac] dark:to-emerald-500"></div>
                <div className="bg-whitee absolute right-3 top-1/2 z-10 h-full w-3/5 -translate-y-1/2 rounded-3xl border border-gray-200 p-1 shadow-lg shadow-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:shadow-transparent">
                  <Image
                    src="/marketing_1.jpg"
                    alt="In studio"
                    width={900}
                    height={900}
                    loading="lazy"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute top-1/2 h-[calc(80%-2rem)] w-[calc(40%-20px)] -translate-y-1/2 rounded-3xl border border-gray-200 bg-white p-1 shadow-lg shadow-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:shadow-transparent">
                  <Image
                    src="/marketing_2.jpg"
                    alt="Happy in studio"
                    width={900}
                    height={900}
                    loading="lazy"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
