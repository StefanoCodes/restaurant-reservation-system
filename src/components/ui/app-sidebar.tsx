import AdminSidebarRoutes from "@/app/(admin)/admin/_components/admin-sidebar-routes";
import LogoutButton from "@/components/logout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Restaurant | Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <AdminSidebarRoutes />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <LogoutButton />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
