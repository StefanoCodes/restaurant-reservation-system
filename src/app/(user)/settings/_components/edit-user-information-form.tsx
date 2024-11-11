"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { updateUserInformation } from "@/app/(user)/settings/_actions/action";
import ButtonLoader from "@/components/button-loader";
import ButtonPendingLoader from "@/components/button-pending-loader";

export default function EditUserInformationForm({
  user,
}: {
  user: {
    name: string;
    email: string;
    phoneNumber: string;
    userId: string;
  };
}) {
  // handle submit
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const response = await updateUserInformation(
        prevState,
        formData,
        user.userId,
      );
      return response;
    },
    null,
  );
  return (
    <Card className="mx-auto mb-12 w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold md:text-3xl">
          Edit Profile
        </CardTitle>
        <CardDescription>
          Update your personal information or delete your account
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name}
              required
              disabled={isPending}
              aria-disabled={isPending}
            />
            {state?.errors?.name && (
              <p className="text-red-500">{state.errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              required
              disabled={isPending}
              aria-disabled={isPending}
            />
            {state?.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              defaultValue={user.phoneNumber}
              required
              disabled={isPending}
              aria-disabled={isPending}
            />
            {state?.errors?.phoneNumber && (
              <p className="text-red-500">{state.errors.phoneNumber}</p>
            )}
          </div>
          {state?.errors && (
            <p className="text-red-500">{state.errors.message}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={isPending}>
            {isPending ? <ButtonPendingLoader /> : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
