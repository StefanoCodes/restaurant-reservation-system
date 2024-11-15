import AboutUsStatistic from "./about-us-statistic";
import { marketingConfig } from "@/app/(marketing)/_templates/_template-one/marketing.config";

export default function KeyPoints() {
  const { keyPoints } = marketingConfig.AboutUs;
  return (
    <div className="flex flex-wrap gap-4">
      {keyPoints.map((point, index) => (
        <AboutUsStatistic key={index} point={point} />
      ))}
    </div>
  );
}
