import { TemplateNames } from "@/lib/types";
import TemplateOne from "./_template-one/template-one";
import TemplateTwo from "./_template-two/template-two";
import TemplateThree from "./_template-three/template-three";
const templates: Record<TemplateNames, React.ReactNode> = {
  TemplateOne: <TemplateOne />,
  TemplateTwo: <TemplateTwo />,
  TemplateThree: <TemplateThree />,
};
export default function Template({
  name = "TemplateOne",
}: {
  name: TemplateNames;
}) {
  return templates[name];
}
