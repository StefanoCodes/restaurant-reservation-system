"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RoutesLink } from "@/lib/types";
import { ADMIN_ROUTES } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
export default function AdminSidebarRoutes() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <SidebarMenu>
      {ADMIN_ROUTES.map((item: RoutesLink) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
            <Link
              href={item.path}
              onClick={() => {
                // only if we are on the mobile screen thought
                if (isMobile) {
                  // we want to check if he current path is the same as the clicked one we want to close the sidebar
                  if (pathname === item.path) {
                    toggleSidebar();
                  } else {
                    toggleSidebar();
                  }
                }
              }}
              className={`${
                pathname.startsWith(item.path)
                  ? "bg-orange-500/80 text-gray-50 hover:bg-orange-500/40 hover:text-gray-50"
                  : "text-black hover:bg-gray-500/10"
              } transition-all duration-300`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
