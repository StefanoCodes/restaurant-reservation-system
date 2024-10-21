"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";


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
		| null
}
export default function SubmitButton({
	children,
	pendingText = "loading...",
	...props
}: SubmitButtonProps) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending} {...props}>
			{pending ? pendingText : children}
		</Button>
	);
}
