"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { useEffect, useState } from "react";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Delicious Pasta",
    description: "Perfect al dente texture!",
    time: "15m ago",
    icon: "🍝",
    color: "#FF6B6B",
  },
  {
    name: "Amazing Sushi",
    description: "Fresh and melt-in-mouth",
    time: "10m ago",
    icon: "🍱",
    color: "#4ECDC4",
  },
  {
    name: "Great Steak",
    description: "Perfectly cooked medium-rare",
    time: "5m ago",
    icon: "🥩",
    color: "#FF9F1C",
  },
  {
    name: "Heavenly Dessert",
    description: "Best tiramisu ever!",
    time: "2m ago",
    icon: "🍰",
    color: "#E0B1CB",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative min-h-fit w-full max-w-[300px] cursor-pointer overflow-hidden rounded-2xl p-4 md:max-w-[400px]",
        // animation styles
        "bg-white transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListNotifications({
  className,
}: {
  className?: string;
}) {
  const [render, setRender] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // First trigger the fade out

      // Then remove from DOM after animation completes
      setTimeout(() => {
        setRender(false);
      }, 500); // Match this with your transition duration
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return render ? (
    <div
      className={cn(
        "relative h-[100px] w-full flex-col overflow-hidden rounded-lg border-none bg-none p-3 md:h-[200px]",
        "transition-opacity duration-500", // Add transition
        isVisible ? "opacity-100" : "opacity-0", // Control opacity
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  ) : null;
}
