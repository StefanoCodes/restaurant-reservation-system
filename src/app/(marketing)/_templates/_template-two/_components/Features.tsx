import SectionHeading from "@/app/(marketing)/_components/utils/section-heading";
import { templateTwoConfig } from "../marketing.config";
import Stat from "./stat";
import Image from "next/image";
import { SpinnerText } from "@/components/motion/spinner-text";
import { BorderTrail } from "@/components/motion/border-trail";
const { heading, description, stats, image } = templateTwoConfig.Features;
export default function Features() {
  return (
    <section className="relative">
      {/* Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="mx-auto mb-8 flex flex-col items-center text-center md:mb-12 lg:mb-16">
          <SectionHeading title={heading} className="text-gradient" />
          <p className="text-gradient mx-auto mb-8 mt-4 max-w-lg">
            {description}
          </p>
          <div className="flex justify-center gap-8">
            {stats.map((stat) => (
              <Stat key={stat.title} {...stat} />
            ))}
          </div>
          <SpinnerText
            radius={7}
            fontSize={1}
            transition={{
              repeat: Infinity,
            }}
            className="absolute right-32 top-24 hidden font-mono text-4xl font-bold text-black lg:block"
          >
            {`Best Restaurant • Best Restaurant • `}
          </SpinnerText>
        </div>

        <Image src={image} alt="marketing" width={1000} height={1000} />
      </div>
    </section>
  );
}
