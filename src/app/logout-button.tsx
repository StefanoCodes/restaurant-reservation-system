"use client";
import { Button } from "@/components/ui/button";
import { logout } from "./actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
export const LogoutSubmitButton = ({ className }: { className?: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      variant="destructive"
      className={cn(`cursor-pointer ${className}`)}
    >
      {pending ? "Logging out..." : "Log Out"}
    </Button>
  );
};
export default function LogoutButton({ className }: { className?: string }) {
  const { toast } = useToast();
  const logoutAction = async () => {
    const response = await logout();
    if (response.success) {
      toast({
        title: response.message,
        className: "border-none bg-green-600 text-white",
        duration: 2000,
      });
    } else {
      toast({
        title: response.message,
        className: "border-none bg-red-600 text-white",
        duration: 2000,
      });
    }
  };
  return (
    <form action={logoutAction}>
      <LogoutSubmitButton className={className} />
    </form>
  );
}
