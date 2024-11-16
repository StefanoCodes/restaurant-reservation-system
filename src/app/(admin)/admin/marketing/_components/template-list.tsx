import { getMarketingTemplates } from "@/lib/data/admin";
import TemplateCard from "./template-card";

export default async function TemplateList() {
  const marketingTemplates = await getMarketingTemplates();

  return (
    <div className="mx-auto max-w-7xl py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {marketingTemplates.map((template, index) => {
          return (
            <TemplateCard template={template} key={template.id} index={index} />
          );
        })}
      </div>
    </div>
  );
}
