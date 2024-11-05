import { isAuthorizedUser } from "@/app/(auth)/auth";
import Link from "next/link";
import NavigationList from "./navigation-list";
import { DM_Sans } from "next/font/google";
import { redirect } from "next/navigation";
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default async function Navigation() {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");
  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href={`/`} className="cursor-pointer">
          <h1
            className={`text-xl font-semibold capitalize text-white ${dmSans.className}`}
          >
            {userInDb ? `Welcome ${userInDb.name}` : "Welcome to our resturant"}
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <NavigationList />
        </div>
      </div>
    </nav>
  );
}
