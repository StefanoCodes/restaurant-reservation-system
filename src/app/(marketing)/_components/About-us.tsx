import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Award, Leaf } from "lucide-react";

export default function AboutUsSection() {
  const keyPoints = [
    {
      icon: Clock,
      title: "Established 1995",
      description: "Over 25 years of culinary excellence",
    },
    {
      icon: Award,
      title: "Michelin Starred",
      description: "Recognized for our outstanding cuisine",
    },
    {
      icon: Leaf,
      title: "Farm to Table",
      description: "Committed to using fresh, local ingredients",
    },
  ];

  const teamMembers = [
    {
      name: "Jason Chen",
      role: "Head Chef",
      image: "/blake.webp",
    },
    {
      name: "Michael Roberts",
      role: "Sommelier",
      image: "/daniel.webp",
    },
    {
      name: "John Johnson",
      role: "Pastry Chef",
      image: "/dan.webp",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-gradient-to-br from-orange-50 to-white py-12 dark:from-gray-900 dark:to-gray-800 md:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjQwIiBmaWxsPSIjZjM3ZTExIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBzdHJva2U9IiNmMzdlMTEiIHN0cm9rZS1vcGFjaXR5PSIuMSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-50 dark:opacity-30"></div>
      <div className="container relative z-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="space-y-6 lg:w-1/2">
            <h2 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
              Our <span className="text-[#f37e11]">Story</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Welcome to Gourmet Haven, where culinary artistry meets warm
              hospitality. Our passion for exceptional food and memorable dining
              experiences has been our driving force since 1995.
            </p>
            <div className="flex flex-wrap gap-4">
              {keyPoints.map((point, index) => (
                <Card
                  key={index}
                  className="min-w-[200px] flex-1 rounded-xl border-none bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/80"
                >
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f37e11]/10 md:text-center">
                      <point.icon className="h-6 w-6 text-[#f37e11]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white md:text-center">
                        {point.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 md:text-center">
                        {point.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <div className="absolute inset-0 rotate-3 rounded-3xl bg-[#f37e11]"></div>
            <Card className="relative rounded-3xl border-none bg-white p-8 shadow-xl dark:bg-gray-800">
              <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Meet Our Team
              </h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <Avatar className="mx-auto mb-4 h-24 w-24 border-4 border-[#f37e11]">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-[#f37e11]">{member.role}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
