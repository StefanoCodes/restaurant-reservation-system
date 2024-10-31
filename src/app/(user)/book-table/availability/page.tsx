export const dynamic = "force-dynamic";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import {
	getUserFormCompletionStatus,
	resetUserFormCompletionStatus,
} from "../_date/actions";
import { redirect } from "next/navigation";
import StepTwo from "./_components/step-two-form";
import ProgressBar from "../_components/progress-bar";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ date: string; time: string; numberOfPeople: string }>;
}) {
	const { userInDb } = await isAuthorizedUser();
	const { date, time, numberOfPeople } = await searchParams;
	// if there arent any search params redirect to the book table page
	if (!date || !time || !numberOfPeople) redirect("/book-table");

	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);
// if the fisrt step is not complete need to be redirected there
	if (!userFormCompletionStatus?.stepOne) {
		redirect("/book-table");
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ProgressBar />
			<div className="bg-gray-300 rounded-lg px-4 py-6 md:px-12 md:py-8 w-full flex flex-col items-center">
				<StepTwo
					userId={userInDb.userId}
					date={date}
					time={time}
					numberOfPeople={numberOfPeople}
				/>
			</div>
		</div>
	);
}
