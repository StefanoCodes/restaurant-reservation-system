import { isAuthorizedUser } from "@/app/(auth)/auth";
import {
	getUserFormCompletionStatus,
	resetUserFormCompletionStatus,
} from "../(date)/actions";
import { redirect } from "next/navigation";
import StepTwo from "./_components/step-two-form";
import ProgressBar from "../_components/progress-bar";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ date: string; time: string; numberOfPeople: string }>;
}) {
	const { userInDb } = await isAuthorizedUser();
	if (!userInDb) redirect("/login");
	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);
	if (!userFormCompletionStatus?.stepOne) {
		redirect("/book-table");
	}
	if (userFormCompletionStatus?.stepTwo) {
		await resetUserFormCompletionStatus(userInDb.userId, "two");
		redirect("/book-table");
	}

	const { date, time, numberOfPeople } = await searchParams;

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ProgressBar />
			<div className="bg-gray-300 rounded-lg px-4 py-6 md:px-12 md:py-8 w-full">
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
