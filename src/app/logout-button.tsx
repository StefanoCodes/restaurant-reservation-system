"use client";
import { Button } from "@/components/ui/button";
import { logout } from "./actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import { LogOutIcon } from "lucide-react";
export const LogoutSubmitButton = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    onClick?: () => void;
  }
>((props, ref) => {
  const { className, onClick } = props;
  const { pending } = useFormStatus();
  return (
    <Button
      ref={ref}
      type="submit"
      disabled={pending}
      variant="destructive"
      className={cn(
        `cursor-pointer w-full sm:w-auto flex items-center gap-2`,
        className
      )}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        <LogOutIcon className="w-4 h-4 sm:hidden" />
        {pending ? "Logging out..." : "Log Out"}
      </span>
    </Button>
  );
});
LogoutSubmitButton.displayName = "LogoutSubmitButton";
export default function LogoutButton() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <LogoutSubmitButton
          className="bg-black hover:bg-black/80"
          onClick={() => setOpen(true)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={logoutAction}>
            <LogoutSubmitButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
