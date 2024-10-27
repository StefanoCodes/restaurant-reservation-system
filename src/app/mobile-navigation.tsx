"use client";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./navigation-list";
import { useState } from "react";
export default function MobileNavigation({ role }: { role: string }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="outline">
					<HamburgerMenuIcon className="w-4 h-4" />
				</Button>
			</SheetTrigger>
			<SheetContent aria-describedby={undefined}>
				<SheetTitle>Navigation</SheetTitle>
				<NavLinks role={role} setIsOpenMenu={setIsOpen} />
			</SheetContent>
		</Sheet>
	);
}
