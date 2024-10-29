import { isAuthorizedAdmin } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const { userInDb } = await isAuthorizedAdmin();
	if (!userInDb) redirect("/login");
	return <div>Welcome {userInDb.name} this is an admin Area</div>;
}
