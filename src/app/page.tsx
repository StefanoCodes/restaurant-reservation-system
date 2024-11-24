import { Metadata } from "next";
import { marketingConfig } from "./(marketing)/marketing.config";
import Template from "./(marketing)/_templates/template";
import { getTemplateName } from "@/lib/data/admin";
import { TemplateNames } from "@/lib/types";
import TemplateOne from "./(marketing)/_templates/_template-one/template-one";
import TemplateTwo from "./(marketing)/_templates/_template-two/template-two";
import TemplateThree from "./(marketing)/_templates/_template-three/template-three";

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
// this function is used to select the template based on the template name
function selectedTemplate(templateName: TemplateNames) {
  const templates = {
    TemplateOne: <TemplateOne />,
    TemplateTwo: <TemplateTwo />,
    TemplateThree: <TemplateThree />,
  };
  return templates[templateName];
}

export default async function MarketingPage() {
  const templateName = await getTemplateName();
  const template = selectedTemplate(templateName);

  return <Template>{template}</Template>;
}
