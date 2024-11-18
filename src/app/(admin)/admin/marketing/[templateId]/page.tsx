import TemplateOne from "@/app/(marketing)/_templates/_template-one/template-one";
import TemplateThree from "@/app/(marketing)/_templates/_template-three/template-three";
import TemplateTwo from "@/app/(marketing)/_templates/_template-two/template-two";
import Template from "@/app/(marketing)/_templates/template";
import { getMarketingTemplateById } from "@/lib/data/admin";

export default async function Page({
  params,
}: {
  params: { templateId: string };
}) {
  const { templateId } = await params;
  const templateName = (await getMarketingTemplateById(templateId))
    ?.templateName;

  if (!templateName) {
    return <div>Template not found</div>;
  }

  const templates = {
    TemplateOne: <TemplateOne preview />,
    TemplateTwo: <TemplateTwo preview />,
    TemplateThree: <TemplateThree preview />,
  };

  const selectedTemplate = templates[templateName];

  return <Template preview>{selectedTemplate}</Template>;
}
