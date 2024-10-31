import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import Container from "@/app/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden">
				<AppSidebar />
				<div>
					<SidebarTrigger className="md:hidden" />
				</div>

				<div className="flex-grow overflow-y-auto">
					<Container>{children}</Container>
				</div>
			</div>
		</SidebarProvider>
	);
}
