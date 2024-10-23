import { getUserDetails, getUserRole } from "@/lib/data";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";

export default async function Page() {
	// so we checking first that the user has a token and then we checking that the user is an admin
	const client = await createClient();
	const session = (await client.auth.getUser()).data.user;
	if (!session) redirect("/login");
	const userDetails = await getUserDetails(session.id);
	if (!userDetails) redirect("/");
	const user = await getUserRole(session.id);
	if (user !== "admin") redirect("/");

	return <div>Admin Area</div>;
}