export const dynamic = "force-dynamic";
import { isAuthorizedUser } from "@/app/(auth)/auth";
import { Metadata } from "next";
import StepOneForm from "./_date/_components/step-one-form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  keywords: ["restaurant", "reservation", "system", "book", "table"],
  title: "Book a Table",
  openGraph: {
    description:
      "This is a restaurant reservation system that allows you to book a table.",
    images: [""],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Table",
    description:
      "This is a restaurant reservation system that allows you to book a table.",
    siteId: "",
    creator: "@StefanoCodes",
    creatorId: "",
    images: [""],
  },
};

export default async function Page() {
  const { user, userInDb } = await isAuthorizedUser();
  if (!user || !userInDb) redirect("/login");
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-center rounded-lg">
        <StepOneForm />
      </div>
    </div>
  );
}
