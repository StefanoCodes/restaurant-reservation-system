import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import { Button } from "@/components/ui/button";
import { HamIcon, MenuIcon } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden">
				<AppSidebar />
				<div>
					<SidebarTrigger />
				</div>

				<div className="flex-grow  p-6 md:overflow-y-auto md:p-12 w-full">
					{children}
				</div>
			</div>
		</SidebarProvider>
	);
}
