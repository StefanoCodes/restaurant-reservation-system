import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Clock, Award, Leaf, Users, Wifi } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Utensils,
      title: "Gourmet Cuisine",
      description:
        "Experience exquisite flavors crafted by our world-class chefs using only the finest ingredients.",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description:
        "Enjoy our delectable offerings any time of day or night with our round-the-clock dining options.",
    },
    {
      icon: Award,
      title: "Award-Winning",
      description:
        "Savor dishes from our Michelin-starred kitchen, recognized for culinary excellence.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description:
        "We're committed to eco-friendly operations and sourcing ingredients from local, organic farms.",
    },
    {
      icon: Users,
      title: "Private Dining",
      description:
        "Host memorable events in our elegant private dining rooms, perfect for any occasion.",
    },
    {
      icon: Wifi,
      title: "Free High-Speed Wi-Fi",
      description:
        "Stay connected with complimentary high-speed internet access throughout our restaurant.",
    },
  ];

  return (
    <section
      id="features"
      className="w-full overflow-hidden bg-orange-50 py-12 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-shadow text-4xl font-bold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            Why Choose <span className="text-[#f37e11]">Us</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Discover the unique features that set our restaurant apart and make
            your dining experience unforgettable.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group overflow-hidden rounded-xl border-none bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <CardHeader className="flex flex-col items-center gap-4 pb-2 pt-6 text-center">
                <div className="flex h-16 w-16 transform items-center justify-center rounded-full bg-gradient-to-br from-[#f37e11] to-orange-600 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 text-center">
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
