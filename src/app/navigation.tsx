import { inter } from "./layout";
import { getUserDetails, getUserRole } from "@/lib/data";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import NavigationList from "./navigation-list";

export default async function Navigation() {
	const { auth } = createClient();
	const session = (await auth.getUser()).data.user;
	if (!session) redirect("/login");
	const userId = session.id;
	const user = await getUserDetails(userId);
	const userRole = await getUserRole(userId);
	if (!userRole) return;
	return (
		<nav className="bg-gradient-to-r from-orange-500 to-orange-600">
			<div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-4">
				<Link href={`/`} className="cursor-pointer">
					<h1
						className={`text-xl font-semibold capitalize text-white ${inter.className}`}
					>
						{user ? `Welcome ${user?.name}` : "Welcome to our resturant"}
					</h1>
				</Link>
				<div className="flex items-center gap-4">
					<NavigationList role={userRole} />
				</div>
			</div>
		</nav>
	);
}
