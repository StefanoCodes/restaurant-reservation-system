"use client";
import { loginUser } from "@/app/(user)/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import PasswordInput from "../../_components/password-input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const response = await loginUser(prevState, formData);
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="example@gmail.com"
            defaultValue={state?.formData?.email}
            disabled={isPending}
            aria-disabled={isPending}
            aria-describedby="email-error"
            required
          />
          {state?.error?.email && (
            <p className="text-red-500">{state.error.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <PasswordInput
            disabled={isPending}
            aria-disabled={isPending}
            aria-describedby="password-error"
            defaultValue={state?.formData?.password}
          />
          {state?.error?.password && (
            <p className="text-red-500">{state.error.password}</p>
          )}
          {state?.message && <p className="text-red-500">{state.message}</p>}
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
