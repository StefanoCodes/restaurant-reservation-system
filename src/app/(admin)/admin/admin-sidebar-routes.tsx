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
								pathname === item.path ? "text-orange-500" : "text-black"
							}`}
						>
							<item.icon className="w-4 h-4" />
							<span>{item.name}</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
