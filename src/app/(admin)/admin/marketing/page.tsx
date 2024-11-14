import { Suspense } from "react";
import H1 from "../_components/h1";
import TemplateToggle from "./_components/template-toggle";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { getTemplateName } from "@/lib/data/admin";
import ButtonPendingLoader from "@/components/button-pending-loader";

export default async function Page() {
  await isAuthorizedAdmin();
  // pass down an unresolved promise to the template toggle
  const templateName = getTemplateName();
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-4">
      <H1>Marketing Configurations</H1>
      <Suspense fallback={<ButtonPendingLoader />}>
        <div className="w-full">
          <TemplateToggle templateNamePromise={templateName} />
        </div>
      </Suspense>
    </div>
  );
}
