"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  // Function to determine if this is a dynamic route that needs modification
  getDynamicPath?: (id: string) => string;
};

interface MobileNavProps {
  navItems: NavItem[];
  userId?: string;
}

export function MobileNav({ navItems, userId }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden shrink-0">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="w-full p-0 bg-zinc-900 border-zinc-800"
      >
        <div className="flex flex-col h-full">
          <div className="h-14 flex items-center px-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white">Navigation</h2>
          </div>
          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const href =
                  item.getDynamicPath && userId
                    ? item.getDynamicPath(userId)
                    : item.href;

                const isActive = pathname === href;

                return (
                  <li key={item.label}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-cyan-500/10 text-cyan-500"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
