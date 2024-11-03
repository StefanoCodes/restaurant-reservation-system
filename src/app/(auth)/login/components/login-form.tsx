"use client";
import { loginUser } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import PasswordInput from "../../_components/password-input";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  return (
    <form action={formAction}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="example@gmail.com"
            required
          />
          {state?.error?.email && (
            <p className="text-red-500">{state.error.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <PasswordInput />
          {state?.error?.password && (
            <p className="text-red-500">{state.error.password}</p>
          )}
          {state?.loginError && (
            <p className="text-red-500">{state.loginError}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
        >
          {isPending ? "Logging in..." : "Log In"}
        </Button>
      </div>
    </form>
  );
}
