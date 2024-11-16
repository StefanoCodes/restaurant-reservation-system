import TemplateCard from "./template-card";
import { cache } from "react";
import { getMarketingTemplates } from "@/lib/data/admin";

const marketingTemplates = cache(async () => {
  return await getMarketingTemplates();
});

export default async function TemplateList() {
  const templates = await marketingTemplates();
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 py-4">
      <h1 className="text-2xl font-medium">Marketing Templates:</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => {
          return (
            <TemplateCard template={template} key={template.id} index={index} />
          );
        })}
      </div>
    </div>
  );
}
