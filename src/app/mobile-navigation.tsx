'use client';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./navigation-list";
import { useState } from "react";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NavLinks setIsOpenMenu={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
