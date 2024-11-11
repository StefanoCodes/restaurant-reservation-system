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
      <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
        <div className="bg-[text-primary-brand-color]/10 flex h-12 w-12 items-center justify-center rounded-full md:text-center">
          <point.icon className="text-primary-brand-color h-8 w-8" />
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
  );
}
