import SectionHeading from "@/app/(marketing)/_components/utils/section-heading";
import { templateTwoConfig } from "../marketing.config";
import Stat from "./stat";
import Image from "next/image";
const { heading, description, stats, image } = templateTwoConfig.Features;
export default function Features() {
  return (
    <section className="relative">
      {/* Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20 lg:flex-row lg:items-start lg:justify-start lg:text-left">
        {/* Component */}
        <div className="mx-auto mb-8 flex flex-1 flex-col items-center text-center md:mb-12 lg:mb-16 lg:items-start lg:text-left">
          <SectionHeading title={heading} className="text-gradient" />
          <p className="text-gradient mx-auto mb-8 mt-4 max-w-lg lg:mx-0 lg:text-left">
            {description}
          </p>
          <div className="flex justify-center gap-8">
            {stats.map((stat) => (
              <Stat key={stat.title} {...stat} />
            ))}
          </div>
        </div>

        <Image
          src={image}
          className="flex-1"
          alt="marketing"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
