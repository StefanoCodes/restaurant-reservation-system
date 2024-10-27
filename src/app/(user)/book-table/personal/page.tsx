import { getUserFormCompletionStatus } from "../actions";
import { redirect } from "next/navigation";
import { isAuthenticatedUser } from "@/lib/data";
import ProgressBar from "../_components/progress-bar";

export default async function Page() {
	const { userInDb } = await isAuthenticatedUser();

	// check wether the user has completed the first step in the form
	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);
	if (
		!userFormCompletionStatus?.stepOne ||
		!userFormCompletionStatus?.stepTwo
	) {
		redirect("/book-table");
	}
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ProgressBar />
			<div className="bg-gray-300 rounded-lg p-4 w-full"></div>
		</div>
	);
}
