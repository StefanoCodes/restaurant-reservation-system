import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Award, Leaf } from "lucide-react";
import AboutUsStatistic from "./about-us/about-us-statistic";
import KeyPoints from "./about-us/key-points";
import SectionHeading from "./section-heading";
import MeetTeam from "./about-us/meet-the-team";

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
            <SectionHeading title="Our" highlightedText="Story" />
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Welcome to Gourmet Haven, where culinary artistry meets warm
              hospitality. Our passion for exceptional food and memorable dining
              experiences has been our driving force since 1995.
            </p>
            <KeyPoints />
          </div>
          <div className="relative lg:w-1/2">
            <div className="bg-primary-brand-color absolute inset-0 rotate-3 rounded-3xl"></div>
            <Card className="relative rounded-3xl border-none bg-white p-8 shadow-xl dark:bg-gray-800">
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Meet Our Team
              </h3>
              <MeetTeam />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
