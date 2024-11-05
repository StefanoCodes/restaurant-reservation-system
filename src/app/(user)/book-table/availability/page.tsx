export const dynamic = "force-dynamic";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
import StepTwo from "./_components/step-two-form";
import ProgressBar from "../_components/progress-bar";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date: string; time: string; numberOfPeople: string }>;
}) {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");

  const params = await searchParams;
  const { date, time, numberOfPeople } = params;

  // Validate search parameters
  const allowedParams = ["date", "time", "numberOfPeople"];
  const extraParams = Object.keys(params).filter(
    (param) => !allowedParams.includes(param),
  );
  if (extraParams.length > 0) redirect("/book-table");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full rounded-lg">
        <StepTwo date={date} time={time} numberOfPeople={numberOfPeople} />
      </div>
    </div>
  );
}
