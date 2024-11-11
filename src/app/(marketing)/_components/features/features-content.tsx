import FeatureCard from "./feature-card";
import { marketingConfig } from "@/app/(marketing)/marketing.config";

export default function FeaturesContent() {
  const { cards } = marketingConfig.Features;
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <FeatureCard key={index} feature={card} />
      ))}
    </div>
  );
}
