"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = ButtonProps & {
	children: React.ReactNode;
	pendingText?: string;
	variant?:
		| "ghost"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "link"
		| null;
};
export default function SubmitButton({
	children,
	pendingText = "loading...",
	...props
}: SubmitButtonProps) {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className={cn(
				pending && `opacity-50 disabled:cursor-not-allowed`,
				props.className
			)}
			disabled={pending}
			{...props}
		>
			{pending ? pendingText : children}
		</Button>
	);
}
