import { isAuthorizedAdmin } from "@/app/(auth)/auth";

export default async function Page() {
	await isAuthorizedAdmin();
	return <div>Manage Admins</div>;
}
