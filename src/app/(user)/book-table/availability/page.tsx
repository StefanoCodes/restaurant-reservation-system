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
      <ProgressBar />
      <div className="flex w-full flex-col items-center rounded-lg bg-gray-300 px-4 py-6 md:px-12 md:py-8">
        <StepTwo date={date} time={time} numberOfPeople={numberOfPeople} />
      </div>
    </div>
  );
}
