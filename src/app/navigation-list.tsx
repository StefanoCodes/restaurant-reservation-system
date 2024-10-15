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
}: {
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
        `text-white hidden sm:flex items-center gap-1 hover:text-gray-300`,
        pathname === path && "text-gray-300"
      )}
      key={name}
      href={path}
    >
      <Icon className="w-4 h-4" />
      <span className={className}>{name}</span>
    </Link>
  );
};

export function NavigationListDesktop() {
  return (
    <div className="hidden sm:flex items-center gap-4">
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
        <NavigationListDesktop />
      </div>
      <div className="sm:hidden">
        <MobileNavigation />
      </div>
    </>
  );
}
