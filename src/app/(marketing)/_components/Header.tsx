import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";
import AvatarCircles from "@/components/ui/avatar-circles";
import ImageGrid from "./image-grid";

export default function Header() {
  return (
    <section
      className="mb-[4rem] mt-[3rem] flex flex-col items-center justify-center overflow-hidden px-4 leading-6 sm:px-6 md:mt-[4rem] md:px-8"
      aria-label="Nextjs Starter Kit Hero"
    >
      <div className="flex w-full flex-col items-center justify-center gap-8">
        {/* CONTENT */}
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* TEXT */}
            <div className="flex flex-col items-center justify-center gap-1">
              <h1
                className={`max-w-[1120px] scroll-m-20 bg-gradient-to-b text-center text-2xl font-semibold tracking-tight dark:text-white sm:text-2xl md:text-3xl lg:text-5xl`}
              >
                Welcome To Our Restaurant
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-center text-gray-500 dark:text-gray-400">
                We are a restaurant that serves delicious food and drinks. We
                are located in the heart of the city and we are open from{" "}
                <strong>10am</strong> to <strong>10pm</strong>.
              </p>
            </div>
            {/* BUTTONS */}
            <div className="flex items-center justify-center gap-3">
              <Link href="/book-table" aria-label="Make a Reservation">
                <Button className="bg-[var(--primary-brand-color)]">
                  Make a Reservation
                </Button>
              </Link>
              <Link
                href="https://discord.gg/HUcHdrrDgY"
                target="_blank"
                aria-label="View Menu (opens in a new tab)"
              >
                <Button variant="outline" className="flex gap-1">
                  View Menu
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
          {/* RATINGS */}
          <div className="flex flex-col items-center justify-center gap-1">
            {/* ratings */}
            <div className="flex items-center justify-center gap-1">
              <StarFilledIcon
                className="h-4 w-4"
                aria-hidden="true"
                color="#FF9529"
              />
              <StarFilledIcon
                className="h-4 w-4"
                aria-hidden="true"
                color="#FF9529"
              />
              <StarFilledIcon
                className="h-4 w-4"
                aria-hidden="true"
                color="#FF9529"
              />
              <StarFilledIcon
                className="h-4 w-4"
                aria-hidden="true"
                color="#FF9529"
              />
              <StarFilledIcon
                className="h-4 w-4"
                aria-hidden="true"
                color="#FF9529"
              />
            </div>
            <span className="text-sm text-gray-500">
              Loved by 1000+ customers
            </span>
            <AvatarCircles
              avatarUrls={[
                "/daniel.webp",
                "/dan.webp",
                "/blake.webp",
                "/daniel.webp",
                "/blake.webp",
              ]}
            />
          </div>
        </div>

        {/* IMAGE GRID */}
        <ImageGrid />
      </div>
    </section>
  );
}
