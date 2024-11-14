import KeyPoints from "./key-points";
import SectionHeading from "../utils/section-heading";
import MeetTeam from "./meet-the-team";
import { marketingConfig } from "@/app/(marketing)/_templates/_template-one/marketing.config";
const { title, highlightedText, description } = marketingConfig.AboutUs;
export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50 to-white py-12 dark:from-gray-900 dark:to-gray-800 md:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjQwIiBmaWxsPSIjZjM3ZTExIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBzdHJva2U9IiNmMzdlMTEiIHN0cm9rZS1vcGFjaXR5PSIuMSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-50 dark:opacity-30"></div>
      <div className="container relative z-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="space-y-6 lg:w-1/2">
            <SectionHeading title={title} highlightedText={highlightedText} />
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {description}
            </p>
            <KeyPoints />
          </div>
          <MeetTeam />
        </div>
      </div>
    </section>
  );
}
