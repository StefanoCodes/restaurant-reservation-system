import { isAuthorizedUser } from "@/app/(auth)/auth";
import { getUserFormCompletionStatus } from "../(date)/actions";
import { redirect } from "next/navigation";
import ProgressBar from "../_components/progress-bar";
import StepThreeForm from "./_components/step-three-form";

export default async function Page() {
	const { userInDb } = await isAuthorizedUser();
	if (!userInDb) redirect("/login");
	// check if the previous steps are completed
	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);

	if (!userFormCompletionStatus?.stepOne) {
		redirect("/book-table");
	}
	if (!userFormCompletionStatus?.stepTwo) {
		redirect("/book-table/availability");
	}
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ProgressBar />
			<div className="bg-gray-300 rounded-lg px-4 py-6 md:px-12 md:py-8 w-full">
				<StepThreeForm user={userInDb} />
			</div>
		</div>
	);
}
