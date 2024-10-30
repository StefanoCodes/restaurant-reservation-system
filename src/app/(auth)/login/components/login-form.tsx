"use client";

import { loginUser } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

function LoginFormSubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			disabled={pending}
			aria-disabled={pending}
			className="w-full bg-orange-500 text-white hover:text-white hover:bg-orange-600"
		>
			{pending ? "Logging in..." : "Login"}
		</Button>
	);
}

export default function LoginForm() {
	const { toast } = useToast();
	const router = useRouter();
	const loginAction = async (formData: FormData) => {
		const response = await loginUser(formData);
		if (response.success) {
			toast({
				title: response.message,
				className: "border-none bg-green-600 text-white",
				duration: 2000,
			});
			router.push("/");
		} else {
			toast({
				title: response.error as string,
				className: "border-none bg-red-600 text-white",
				duration: 2000,
			});
		}
	};
	return (
		<form action={loginAction}>
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
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						name="password"
						placeholder="********"
						required
					/>
				</div>
				<LoginFormSubmitButton />
			</div>
		</form>
	);
}
