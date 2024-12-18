"use client";
import { USER_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/logout-button";
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
        `flex flex-row items-center gap-1 text-black hover:text-gray-500 sm:text-white sm:hover:text-gray-300`,
        (pathname === path || pathname.startsWith(path)) &&
          "text-gray-500 sm:text-gray-300",
      )}
      key={name}
      href={path}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
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
    <div className="mt-4 flex flex-col items-start gap-4 sm:mt-0 sm:flex-row sm:items-center">
      {USER_ROUTES.map((route) => {
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
