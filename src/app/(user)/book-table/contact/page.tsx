export const dynamic = "force-dynamic";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
import ProgressBar from "../_components/progress-bar";
import StepThreeForm from "./_components/step-three-form";
import {
  isDateInFuture,
  isTimeInBetweenOpeningAndClosingHours,
} from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    date: string;
    time: string;
    numberOfPeople: string;
    table: string;
  }>;
}) {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");
  const params = await searchParams;
  const { date, time, numberOfPeople, table } = params;
  if (!date || !time || !numberOfPeople || !table) redirect("/book-table");
  if (!isDateInFuture(date) || !isTimeInBetweenOpeningAndClosingHours(time))
    redirect("/book-table");
  // Validate search parameters
  const allowedParams = ["date", "time", "numberOfPeople", "table"];
  const extraParams = Object.keys(params).filter(
    (param) => !allowedParams.includes(param),
  );
  if (extraParams.length > 0) redirect("/book-table");
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* <ProgressBar /> */}
      <StepThreeForm user={userInDb} data={params} />
    </div>
  );
}
