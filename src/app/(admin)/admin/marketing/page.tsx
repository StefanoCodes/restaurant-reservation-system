import { Suspense } from "react";
import H1 from "../_components/h1";
import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import ButtonPendingLoader from "@/components/button-pending-loader";
import TemplateList from "./_components/template-list";

export default async function Page() {
  await isAuthorizedAdmin();
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-4">
      <H1>Marketing Configurations</H1>
      <Suspense fallback={<ButtonPendingLoader />}>
        <div className="w-full">
          <TemplateList />
        </div>
      </Suspense>
    </div>
  );
}
