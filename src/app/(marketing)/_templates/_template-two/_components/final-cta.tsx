import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { templateTwoConfig } from "@/app/(marketing)/_templates/_template-two/marketing.config";
const { heading, description, primaryCta, image } = templateTwoConfig.FinalCTA;
export default function FinalCTA() {
  return (
    <section className="px-4 py-8 text-zinc-900 sm:px-6 lg:px-8" id="final-cta">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-10 bg-black/50" />
          <div className="relative z-20 flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-32">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {heading}
            </h2>
            <p className="mb-8 max-w-2xl text-base text-zinc-100 sm:text-lg md:text-xl">
              {description}
            </p>
            <Button
              asChild
              size="lg"
              className="text-template-two-foreground hover:bg-template-two/90 bg-template-two text-white"
            >
              <Link href={primaryCta.href}>{primaryCta.title}</Link>
            </Button>
          </div>
          <Image
            alt="Restaurant interior"
            src={image}
            width={1200}
            height={600}
            objectFit="cover"
            objectPosition="center"
            priority
            className="absolute inset-0"
            style={{ filter: "brightness(0.5)" }}
          />
        </div>
      </div>
    </section>
  );
}
