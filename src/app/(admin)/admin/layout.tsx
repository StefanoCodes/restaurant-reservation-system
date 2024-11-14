import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full flex-col md:flex-row md:overflow-hidden">
          <AppSidebar />
          <div>
            <SidebarTrigger className="md:hidden" />
          </div>
          <div className="container mx-auto h-full p-4 md:p-8 lg:p-12 lg:pt-6">
            {children}
          </div>
        </div>
      </SidebarProvider>
      <NextTopLoader showSpinner={true} color="#FFA500" initialPosition={0.5} />
      <Toaster />
    </>
  );
}
