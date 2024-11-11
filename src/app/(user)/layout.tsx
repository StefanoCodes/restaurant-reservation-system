import NextTopLoader from "nextjs-toploader";
import Navigation from "./_components/navigation";
import { Toaster } from "@/components/ui/toaster";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextTopLoader showSpinner={true} color="#ffffff" initialPosition={0.5} />
      <Toaster />
      <Navigation />
      {children}
    </>
  );
}
