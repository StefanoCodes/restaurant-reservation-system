import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function FeatureCard({
  feature,
}: {
  feature: {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    description: string;
  };
}) {
  return (
    <Card className="group overflow-hidden rounded-xl border-none bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      <CardHeader className="flex flex-col items-center gap-4 pb-2 pt-6 text-center">
        <div className="from-template-one flex h-16 w-16 transform items-center justify-center rounded-full bg-gradient-to-br to-orange-600 transition-transform duration-300 group-hover:scale-110">
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
  );
}
