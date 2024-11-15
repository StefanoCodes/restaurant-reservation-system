import { Card, CardContent } from "@/components/ui/card";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export default function AboutUsStatistic({
  point,
}: {
  point: {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    description: string;
  };
}) {
  return (
    <Card
      key={point.title}
      className="min-w-[200px] flex-1 rounded-xl border-none bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/80"
    >
      <CardContent className="flex flex-col items-center justify-center gap-4 px-2 py-6 text-center sm:flex-row sm:items-start sm:text-left md:px-6">
        <div className="bg-[text-template-one]/10 flex items-center rounded-full md:text-left">
          <point.icon className="text-template-one h-8 w-8" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white md:text-left">
            {point.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 md:text-left">
            {point.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
