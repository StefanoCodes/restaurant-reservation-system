import SectionHeading from "@/app/(marketing)/_components/utils/section-heading";
import { templateTwoConfig } from "../marketing.config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RatingStars from "@/app/(marketing)/_components/header/rating-stars";

const { heading, description, mainImage, customers } =
  templateTwoConfig.AboutUs;
const { image, name, review } = customers[0];
const { image: image2, name: name2, review: review2 } = customers[1];
export default function AboutUs() {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Content */}
          <div className="flex flex-[2] flex-col items-center justify-center gap-8 sm:items-start lg:w-3/5">
            <div className="flex flex-col items-center justify-center gap-4 sm:items-start">
              <SectionHeading title={heading} className="text-gradient" />
              <p className="text-gradient mx-auto max-w-lg text-center sm:text-left">
                {description}
              </p>
            </div>
            <Button
              asChild
              className="px bg-template-two text-sm font-semibold"
            >
              <Link href="/about">Learn More</Link>
            </Button>
            {/* Divider */} <div className="my-8 h-px w-full bg-black"></div>
            {/* Testimonials */}
            <div className="grid gap-8 md:grid-cols-2 md:gap-4">
              <div className="flex flex-col gap-4 rounded-md border border-solid bg-gray-100 p-6 md:p-4">
                <p className="text-sm">{review}</p>
                <div className="flex items-center gap-2 sm:gap-x-4">
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={image}
                      alt="Customer Image"
                      width={12}
                      height={12}
                      quality={100}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <p className="text-sm font-semibold sm:text-base">{name}</p>
                  </div>
                  {/* Divider */} <div className="h-5 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm font-semibold sm:text-base">5.0</p>
                    <RatingStars rating={5} color="orange" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-md border border-solid bg-gray-100 p-6 md:p-4">
                <p className="text-sm">{review2}</p>
                <div className="flex items-center gap-2 sm:gap-x-4">
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={image2}
                      alt="Customer Image"
                      width={12}
                      height={12}
                      quality={100}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <p className="text-sm font-semibold sm:text-base">
                      {name2}
                    </p>
                  </div>
                  {/* Divider */} <div className="h-5 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm font-semibold sm:text-base">5.0</p>
                    <RatingStars rating={5} color="orange" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Image
            src={mainImage}
            className="w-full flex-1 lg:max-w-[31.25rem]"
            alt="About Us"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
