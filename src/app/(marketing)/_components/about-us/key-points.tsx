import { Award, Clock, Leaf } from "lucide-react";
import AboutUsStatistic from "./about-us-statistic";
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
export default function KeyPoints() {
  return (
    <div className="flex flex-wrap gap-4">
      {keyPoints.map((point, index) => (
        <AboutUsStatistic key={index} point={point} />
      ))}
    </div>
  );
}
