"use client";
import { registerUser } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full bg-orange-500  text-white hover:text-white hover:bg-orange-600"
      type="submit"
      disabled={pending}
    >
      {pending ? "Registering..." : "Register"}
    </Button>
  );
};

export default function RegistrationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const createUserAction = async (formData: FormData) => {
    const response = await registerUser(formData);
    if (response.success) {
      toast({
        title: response.message,
        className: "border-none bg-green-600 text-white",
        duration: 2000,
      });
      router.push("/book-table");
    } else {
      toast({
        title: response.message,
        className: "bg-red-500 text-white",
        duration: 2000,
      });
    }
  };
  return (
    <form action={createUserAction}>
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
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            placeholder="********"
            id="password"
            type="password"
            name="password"
            required
          />
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
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
