import { isAuthenticatedUser } from "@/lib/data";
import { getUserFormCompletionStatus } from "../actions";
import { redirect } from "next/navigation";
import StepTwo from "./_components/step-two";

export default async function Page() {
	// authentication check
	const { userInDb } = await isAuthenticatedUser();

	// check wether the user has completed the first step in the form
	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);
	if (!userFormCompletionStatus?.stepOne) {
		redirect("/book-table");
	}
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="bg-gray-300 rounded-lg p-4 w-full h-[31.25rem]">
				<StepTwo userId={userInDb.userId} />
			</div>
		</div>
	);
}
