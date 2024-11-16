import { Metadata } from "next";
import { marketingConfig } from "./(marketing)/marketing.config";
import Template from "./(marketing)/_templates/template";
import { getTemplateName } from "@/lib/data/admin";
const {
  restaurantName,
  openGraphImage,
  twitterImage,
  keywords,
  creator,
  siteUrl,
  description,
} = marketingConfig.Meta;

export const metadata: Metadata = {
  keywords: keywords,
  title: restaurantName,
  openGraph: {
    description: description,
    images: [openGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: restaurantName,
    description: description,
    siteId: siteUrl,
    creator: creator,
    images: [twitterImage],
  },
};

export default async function MarketingPage() {
  const template = await getTemplateName();
  return <Template name={template} />;
}
