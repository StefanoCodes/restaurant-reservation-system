import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/utils/server";
import Link from "next/link";

export default async function IsUserLoggedInButton() {
	const { auth } = createClient();
	const { data: user } = await auth.getUser();
	const userData = user.user;

	return (
		<Button asChild>
			<Link href={`${userData ? `/book-table` : "/register"}`}>
				{userData ? "Book A Table" : "Register"}
			</Link>
		</Button>
	);
}
