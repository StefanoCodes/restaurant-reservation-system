import Image from "next/image";
import logoOne from "../../../../../public/logo_1.svg";
import logoTwo from "../../../../../public/logo_2.svg";
import logoThree from "../../../../../public/logo_3.svg";
import logoFour from "../../../../../public/logo_4.svg";
import logoFive from "../../../../../public/logo_5.svg";
import logoSix from "../../../../../public/logo_6.svg";

function Companies() {
  const logos = [
    { icon: logoOne, alt: "Logo 1" },
    { icon: logoTwo, alt: "Logo 2" },
    { icon: logoThree, alt: "Logo 3" },
    { icon: logoFour, alt: "Logo 4" },
    { icon: logoFive, alt: "Logo 5" },
    { icon: logoSix, alt: "Logo 6" },
  ];

  return (
    <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
        {logos.map((logo, index) => (
          <li key={index}>
            <Image src={logo.icon} alt={logo.alt} width={100} height={100} />
          </li>
        ))}
      </ul>
      <ul
        className="animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
        aria-hidden="true"
      >
        {logos.map((logo, index) => (
          <li key={index}>
            <Image src={logo.icon} alt={logo.alt} width={100} height={100} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CompaniesLogos() {
  return (
    <div className="relative flex h-[120px] flex-col justify-center overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-muted-foreground">
            We are trusted by 1000+ companies
          </h2>
          <Companies />
        </div>
      </div>
    </div>
  );
}
