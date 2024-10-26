import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { getUserDetails, getUserRole } from "@/lib/data";
import { Metadata } from "next";
import StepOneForm from "./_components/step-one";
import {
	getUserFormCompletionStatus,
	resetUserFormCompletionStatus,
} from "./actions";
import ProgressBar from "./_components/progress-bar";
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
	const { auth } = await createClient();
	const user = (await auth.getUser()).data.user;
	console.log(user);
	if (!user) redirect("/login");
	const userInDb = await getUserDetails(user.id);
	if (!userInDb) redirect("/login");
	const userRole = await getUserRole(user.id);
	if (userRole !== "user") redirect("/");
	const userFormCompletionStatus = await getUserFormCompletionStatus(
		userInDb.userId
	);
	if (userFormCompletionStatus?.stepOne) {
		// we want to reset the form completion status
		// the values will be shown by default in the user inputs
		await resetUserFormCompletionStatus(userInDb.userId, "one");
	}
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<ProgressBar />
			<div className="bg-gray-300 rounded-lg p-4 w-full h-[31.25rem]">
				<StepOneForm userId={user.id} />
			</div>
		</div>
	);
}
