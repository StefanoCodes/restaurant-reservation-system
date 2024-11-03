"use client";
import { loginUser } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useActionState, useState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState(false); // Add this line

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
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
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
