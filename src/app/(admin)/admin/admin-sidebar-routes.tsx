"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RoutesLink } from "@/lib/types";
import { ADMIN_ROUTES } from "@/utils/constants";
import { usePathname } from "next/navigation";

export default function AdminSidebarRoutes() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {ADMIN_ROUTES.map((item: RoutesLink) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
            <a
              href={item.path}
              className={`${
                pathname === item.path
                  ? "bg-orange-500/80 text-gray-50 hover:bg-orange-500/40 hover:text-gray-50"
                  : "text-black hover:bg-gray-500/10"
              } transition-all duration-300`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
