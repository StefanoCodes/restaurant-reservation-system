"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { logout } from "@/app/(user)/auth-utils";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
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
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
        `flex w-full cursor-pointer items-center gap-2 sm:w-auto`,
        className,
      )}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        <LogOutIcon className="h-4 w-4 sm:hidden" />
        {pending ? "Logging out..." : "Log Out"}
      </span>
    </Button>
  );
});
LogoutSubmitButton.displayName = "LogoutSubmitButton";
export default function LogoutButton({
  className,
  variant,
}: {
  className?: string;
  variant?: ButtonProps["variant"];
}) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <LogoutSubmitButton
          className={cn(
            "bg-black hover:bg-black/80",
            variant && `bg-${variant} hover:bg-${variant}/80`,
            className,
          )}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setOpen(true);
          }}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={logout}>
            <LogoutSubmitButton />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
