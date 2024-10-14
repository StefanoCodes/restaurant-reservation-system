import { getUserDetails } from "@/lib/data";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import { inter } from "../layout";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../logout-button";
import Link from "next/link";
export default async function BookTablePage() {
  const { auth } = createClient();
  const session = (await auth.getUser()).data.user;
  if (!session) redirect("/login");
  const userId = session.id;
  const { user } = await getUserDetails(userId);
  return (
    <main className="">
      <nav className="bg-orange-500">
        <div className="flex justify-between items-center max-w-7xl mx-auto py-4">
          <h1 className={`text-xl font-semibold capitalize ${inter.className}`}>
            Welcome {user?.name}, reserve a table
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link className="cursor-pointer" href="/contact">
                  Contact Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutButton className="w-full cursor-pointer" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </main>
  );
}
