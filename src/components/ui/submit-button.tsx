"use client";

import { useFormStatus } from "react-dom";
import ButtonLoader from "@/app/button-loader";
import { Button, ButtonProps, buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";

export interface SubmitButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}
export default function SubmitButton({
	children,
	...props
}: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending || props.disabled}
			{...props}
			className="flex items-center gap-2"
		>
			{pending ? (
				<>
					<ButtonLoader />
				</>
			) : (
				children
			)}
		</Button>
	);
}
