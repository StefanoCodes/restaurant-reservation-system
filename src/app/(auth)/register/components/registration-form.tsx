"use client";
import { registerUser } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import PasswordInput from "../../_components/password-input";

export default function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  return (
    <form action={formAction}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            required
          />
          {state?.error?.name && (
            <p className="text-red-500">{state.error.name}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input
            placeholder="example@gmail.com"
            id="email"
            type="email"
            name="email"
            required
          />
          {state?.error?.email && (
            <p className="text-red-500">{state.error.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <PasswordInput />
          {state?.error?.password && (
            <div className="text-sm text-red-500">
              <p>Password must:</p>
              <ul>
                {state.error.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="phone">Phone Number</Label>
          </div>
          <Input
            placeholder="+39 4873248723"
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            required
          />
          {state?.error?.phoneNumber && (
            <p className="text-red-500">{state.error.phoneNumber}</p>
          )}
        </div>

        <Button
          className="w-full bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
}
