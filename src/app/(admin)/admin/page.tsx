import { isAuthorizedAdmin } from "@/app/(auth)/auth";

export default async function Page() {
  const { userInDb } = await isAuthorizedAdmin();

  return <div>Welcome {userInDb.name} this is an admin Area</div>;
}
