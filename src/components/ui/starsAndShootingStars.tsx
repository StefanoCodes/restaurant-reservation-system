"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
export function ShootingStarsAndStarsBackground() {
  return (
    <div className="relative flex h-[40rem] w-full flex-col items-center justify-center rounded-md bg-neutral-900">
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
