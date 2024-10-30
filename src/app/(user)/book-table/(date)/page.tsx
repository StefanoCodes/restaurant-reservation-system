import { isAuthorizedUser } from "@/app/(auth)/auth";
import { Metadata } from "next";
import StepOneForm from "./_components/step-one-form";
import {
	getUserFormCompletionStatus,
	resetUserFormCompletionStatus,
} from "./actions";
import ProgressBar from "../_components/progress-bar";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	keywords: ["restaurant", "reservation", "system", "book", "table"],
	title: "Book a Table",
	openGraph: {
		description:
			"This is a restaurant reservation system that allows you to book a table.",
		images: [""],
	},
	twitter: {
		card: "summary_large_image",
		title: "Book a Table",
		description:
			"This is a restaurant reservation system that allows you to book a table.",
		siteId: "",
		creator: "@StefanoCodes",
		creatorId: "",
		images: [""],
	},
};

export default async function BookTablePage() {
	const { userInDb } = await isAuthorizedUser();
	if (!userInDb) redirect("/login");
	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);
	// push
	if (userFormCompletionStatus?.stepOne) {
		// we want to reset the form completion status
		// the values will be shown by default in the user inputs
		await resetUserFormCompletionStatus(userInDb.userId, "one");
	}
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ProgressBar />
			<div className="bg-gray-300 rounded-lg p-4 w-full">
				<StepOneForm userId={userInDb.userId} />
			</div>
		</div>
	);
}
