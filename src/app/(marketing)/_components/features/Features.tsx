import SectionHeading from "../utils/section-heading";
import FeaturesContent from "./features-content";
import { marketingConfig } from "@/app/(marketing)/marketing.config";
const { title, highlightedText, description } = marketingConfig.Features;
export default function Features() {
  return (
    <section
      id="features"
      className="w-full overflow-hidden bg-orange-50 py-12 md:py-24 lg:py-32"
      aria-label="Features"
    >
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <SectionHeading title={title} highlightedText={highlightedText} />
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <FeaturesContent />
      </div>
    </section>
  );
}
