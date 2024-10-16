"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={`https://ik.imagekit.io/xmur8khex/restaurant_logo.png?updatedAt=1729088342659`}
      width={150}
      height={50}
      alt="Restaurant Logo"
      className="w-full h-auto mx-auto aspect-square"
    />
  );
}
