import { isAuthenticatedUser } from "@/lib/data";
import {
	getUserFormCompletionStatus,
	resetUserFormCompletionStatus,
} from "../actions";
import { redirect } from "next/navigation";
import StepTwo from "./_components/step-two";
import ProgressBar from "../_components/progress-bar";

export default async function Page() {
	// authentication check
	const { user, userInDb } = await isAuthenticatedUser();
	if (!userInDb || !user) redirect("/login");
	// check wether the user has completed the first step in the form
	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);

	if (!userFormCompletionStatus?.stepOne) {
		redirect("/book-table");
	}

	if (userFormCompletionStatus?.stepTwo) {
		await resetUserFormCompletionStatus(userInDb.userId, "two");
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ProgressBar />
			<div className="bg-gray-300 rounded-lg px-4 py-6 md:px-12 md:py-8 w-full">
				<StepTwo userId={userInDb.userId} />
			</div>
		</div>
	);
}