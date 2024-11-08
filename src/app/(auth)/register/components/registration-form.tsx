"use client";
import { registerUser } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import PasswordInput from "../../_components/password-input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
export default function RegistrationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const response = await registerUser(prevState, formData);
      if (response.success) {
        toast({
          description: response.message,
        });
        router.push("/");
      } else {
        toast({
          description: response.message,
          variant: "destructive",
        });
      }
      return response;
    },
    null,
  );
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
            defaultValue={state?.formData?.name}
            required
            disabled={isPending}
            aria-disabled={isPending}
            aria-describedby={state?.error?.name ? "name-error" : undefined}
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
            defaultValue={state?.formData?.email}
            required
            disabled={isPending}
            aria-disabled={isPending}
            aria-describedby={state?.error?.email ? "email-error" : undefined}
          />
          {state?.error?.email && (
            <p className="text-red-500">{state.error.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <PasswordInput
            disabled={isPending}
            defaultValue={state?.formData?.password}
            aria-disabled={isPending}
            aria-describedby={
              state?.error?.password ? "password-error" : undefined
            }
          />
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
            aria-disabled={isPending}
            defaultValue={state?.formData?.phoneNumber}
            required
            disabled={isPending}
            aria-describedby={
              state?.error?.phoneNumber ? "phoneNumber-error" : undefined
            }
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
