import { isAuthorizedUser } from "@/app/(auth)/auth";
import { getUser } from "@/app/(user)/auth-utils";
import { NavUser } from "./nav-user-toggle";
import { Button } from "@/components/ui/button";
import { MARKETING_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { marketingConfig } from "@/app/(marketing)/_templates/_template-one/marketing.config";
const { logo, links } = marketingConfig.Navbar;
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function Navbar() {
  const user = await getUser();
  // check if the user is an admin
  if (user) {
    // check if the user is an admin
    await isAuthorizedUser();
  }
  return (
    <Disclosure as="nav" className={cn("bg-primary-brand-color text-white")}>
      <div className="container px-3 py-2">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <MenuIcon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <Link href={links[0].href}>
              <Image
                src={logo}
                alt="logo"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-white hover:bg-gray-700",
                      "rounded-md px-3 py-2 text-sm font-medium",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {user ? (
              <NavUser user={user} />
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="flex flex-col gap-2">
          {MARKETING_ROUTES.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-4 py-2 text-base font-medium",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
