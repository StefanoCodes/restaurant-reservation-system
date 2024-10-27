import { isAuthorizedAdmin } from "@/lib/data";

export default async function Page() {
	const { userInDb } = await isAuthorizedAdmin();
	return <div>Welcome {userInDb.name} this is an admin Area</div>;
}
