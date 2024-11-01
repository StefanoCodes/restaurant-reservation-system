import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import BusinessHours from "./_components/business-hours";
import { Suspense } from "react";
import { getBusinessHours } from "@/lib/data/admin";

export default async function AdminSettingsPage() {
  await isAuthorizedAdmin();
  const businessHours = await getBusinessHours();
  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <h1 className="text-2xl font-bold">Admin Settings Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BusinessHours initialHours={businessHours} />
      </Suspense>
    </div>
  );
}
