export const dynamic = "force-dynamic";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
import StepTwo from "./_components/step-two-form";
import {
  isDateInFuture,
  isTimeInBetweenOpeningAndClosingHours,
} from "@/lib/utils";

function isSearchParamsValid(params: {
  date: string;
  time: string;
  numberOfPeople: string;
}) {
  const { date, time, numberOfPeople } = params;
  if (!date || !time || !numberOfPeople) redirect("/book-table");

  // then validate the date and time to be valid
  if (!isDateInFuture(date) || !isTimeInBetweenOpeningAndClosingHours(time)) {
    return redirect("/book-table");
  }

  // Validate search parameters
  const allowedParams = ["date", "time", "numberOfPeople"];
  if (Object.keys(params).some((param) => !allowedParams.includes(param))) {
    return redirect("/book-table");
  }

  return {
    date,
    time,
    numberOfPeople,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ date: string; time: string; numberOfPeople: string }>;
}) {
  await isAuthorizedUser();
  const params = await searchParams;
  const { date, time, numberOfPeople } = isSearchParamsValid(params);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full rounded-lg">
        <StepTwo date={date} time={time} numberOfPeople={numberOfPeople} />
      </div>
    </div>
  );
}
