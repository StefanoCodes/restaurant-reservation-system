import AvatarCircles from "@/components/ui/avatar-circles";
import ImageGrid from "./image-grid";
import { marketingConfig } from "@/app/(marketing)/_templates/_template-one/marketing.config";
import RatingStars from "./rating-stars";
import PrimaryCta from "./primary-cta";
import SecondaryCta from "./secondary-cta";
import CompaniesLogos from "../utils/companies";
const { title, description, primaryCta, secondaryCta, socialProof } =
  marketingConfig.Header;
export default function Header() {
  return (
    <section
      className="mb-[4rem] mt-[3rem] flex flex-col items-center justify-center overflow-hidden px-4 leading-6 sm:px-6 md:mt-[4rem] md:px-8"
      aria-label="Hero"
    >
      <div className="container flex flex-col items-center justify-center gap-8">
        {/* ALL CONTENT */}
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* HEADING CONTENT */}
            <div className="relative flex flex-col items-center justify-center gap-1">
              <h1
                className={`max-w-[1120px] scroll-m-20 bg-gradient-to-b text-center text-3xl font-semibold tracking-tight dark:text-white sm:text-4xl md:text-5xl lg:text-6xl`}
              >
                {title}
              </h1>

              <p className="mx-auto mt-2 max-w-xl text-center text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
            {/* CTA */}
            <div className="flex items-center justify-center gap-3">
              <PrimaryCta href={primaryCta.href} label={primaryCta.label} />
              <SecondaryCta
                href={secondaryCta.href}
                label={secondaryCta.label}
              />
            </div>
          </div>
          {/* RATINGS */}
          <div className="flex flex-col items-center justify-center gap-1">
            <RatingStars rating={socialProof.rating} color="orange" />
            <span className="text-sm text-gray-500">{socialProof.title}</span>
            <AvatarCircles avatarUrls={socialProof.avatarUrls} />
          </div>
        </div>
        <ImageGrid images={marketingConfig.Header.images} />
        <CompaniesLogos />
      </div>
    </section>
  );
}
