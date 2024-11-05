import Image from "next/image";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import LoginForm from "./components/login-form";
import { isAuthorizedUser } from "../auth";
import { redirect } from "next/navigation";
export default async function Login() {
  const user = await isAuthorizedUser();
  if (user.userInDb?.userId) redirect("/");
  return (
    <main className="h-full w-full overflow-hidden">
      <div className="relative w-full px-4 sm:px-0 md:min-h-screen lg:grid lg:grid-cols-2">
        <div className="relative flex items-center justify-center py-12">
          <div className="z-10 mx-auto grid w-[350px] gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <LockKeyhole className="h-8 w-8" />
              <h1 className="flex items-center justify-center gap-1 text-3xl font-bold">
                <span>Login</span>
              </h1>
              <p className="text-balance text-muted-foreground">
                Enter your details below to login
              </p>
            </div>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline">
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="z-4 bg-muted lg:block">
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
