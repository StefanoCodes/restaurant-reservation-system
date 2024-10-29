import Image from "next/image";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import RegistrationForm from "./components/registration-form";
import { isAuthenticatedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
export default async function Register() {
	const { user } = await isAuthenticatedUser(false);
	if (user) redirect("/");

	return (
		<main className="h-full w-full overflow-hidden ">
			<div className="w-full lg:grid lg:grid-cols-2 md:min-h-screen px-4 sm:px-0 relative">
				<div className="flex items-center justify-center py-12 relative">
					<div className="mx-auto grid w-[350px] gap-6 z-10">
						<div className="gap-2 text-center flex flex-col items-center">
							<LockKeyhole className="w-8 h-8" />
							<h1 className="text-3xl font-bold flex items-center justify-center gap-1">
								<span>Registration</span>
							</h1>
							<p className="text-balance text-muted-foreground">
								Enter your details below to register
							</p>
						</div>
						<RegistrationForm />
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link href="/login" className="underline">
								Login
							</Link>
						</div>
					</div>
				</div>
				<div className="bg-muted lg:block z-4">
					<Image
						src="/bg-restaurant.jpg"
						alt="Image"
						priority={true}
						width="1920"
						height="1080"
						className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</div>
			</div>
		</main>
	);
}
