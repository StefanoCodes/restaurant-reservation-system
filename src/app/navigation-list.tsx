"use client";

import { ROUTES } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";
import MobileNavigation from "./mobile-navigation";
const NavLink = ({
  name,
  path,
  icon,
  className,
  onClick,
}: {
  onClick: () => void;
  name: string;
  path: string;
  icon: React.ElementType;
  className?: string;
}) => {
  const Icon = icon;
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        `text-black sm:text-white flex flex-row items-center gap-1 hover:text-gray-500 sm:hover:text-gray-300`,
        pathname === path && "text-gray-500 sm:text-gray-300"
      )}
      key={name}
      href={path}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span className={className}>{name}</span>
    </Link>
  );
};

export function NavLinks({
  setIsOpenMenu,
}: {
  setIsOpenMenu?: (isOpen: boolean) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 items-start sm:items-center gap-4">
      {ROUTES.map((route) => {
        // Only render the link if:
        // 1. The route is not protected, or
        // 2. The route is protected and the user is authenticated
        return (
          <NavLink
            key={route.name}
            name={route.name}
            path={route.path}
            icon={route.icon}
            onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
          />
        );
      })}
      <LogoutButton />
    </div>
  );
}
export default function NavigationList() {
  return (
    <>
      <div className="hidden sm:flex">
        <NavLinks />
      </div>
      <div className="sm:hidden">
        <MobileNavigation />
      </div>
    </>
  );
}
