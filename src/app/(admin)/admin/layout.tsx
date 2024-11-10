import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import Container from "@/app/Container";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden">
          <AppSidebar />
          <div>
            <SidebarTrigger className="md:hidden" />
          </div>

          <div className="flex-grow overflow-y-auto">
            <div className="container mx-auto p-4 md:p-8 lg:p-12 lg:pt-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
      <NextTopLoader showSpinner={true} color="#FFA500" initialPosition={0.5} />
      <Toaster />
    </>
  );
}
