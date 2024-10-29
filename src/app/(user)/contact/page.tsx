import { Label } from "@/components/ui/label";
import Image from "next/image";
import { createClient } from "@/supabase/utils/server";
import { getUserRole, isAuthorizedUser } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function Page() {
	await isAuthorizedUser();
	return (
		<main className="h-full w-full overflow-hidden">
			<div className="w-full flex flex-col md:flex-row min-h-[100dvh] px-4 sm:px-0 relative">
				<div className="flex items-center justify-center  py-8 md:py-0  flex-1">
					<div className="mx-auto max-w-xl gap-6 z-10 ">
						<div className="gap-2 flex flex-col">
							<h1 className="text-4xl font-bold">Contact Information</h1>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col gap-4">
								<Label className="font-medium text-xl ">
									Email:{" "}
									<span className="font-normal text-muted-foreground">
										info@restaurant.com
									</span>
								</Label>
								<Label className="font-medium text-xl ">
									Phone:{" "}
									<span className="font-normal text-muted-foreground">
										+39 800 000 000
									</span>
								</Label>
								<Label className="font-medium text-xl">
									Address:{" "}
									<span className="font-normal text-muted-foreground">
										123 Main St, Trastevere, Italy
									</span>
								</Label>
								<Button
									asChild
									className="hover:scale-105 border-none transition-all duration-300  bg-gradient-to-tr from-orange-500 via-orange-600 to-orange-700 text-white"
								>
									<Link
										href={
											"https://www.google.com/maps/place/Red+Elephant+Restaurant/@30.0451029,31.2307412,17z/data=!3m1!4b1!4m6!3m5!1s0x14583fad4c1e581b:0x8955d1d337fef452!8m2!3d30.0451029!4d31.2333169!16s%2Fg%2F11c48yf53j"
										}
									>
										View on Google Maps
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className=" flex-1">
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
