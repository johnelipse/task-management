"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { sidebarLinks } from "@/config/sidebar";
import { UserDropdownMenu } from "../UserDropdownMenu";
import Image from "next/image";

export default function Navbar({ session }: { session: Session }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  const filteredLinks = sidebarLinks;
  const getDynamicRoute = (href: string, title: string) => {
    if (title.toLowerCase() === "settings") {
      return `/dashboard/settings/${session.user.id}`;
    }
    return href;
  };

  // Create flattened links for mobile navigation
  const mobileLinks = filteredLinks.reduce((acc, link) => {
    // Add main link if it's not a dropdown
    if (!link.dropdown) {
      acc.push({
        title: link.title,
        href: link.href || "#",
        icon: link.icon,
        permission: link.permission,
      });
      return acc;
    }

    // Add dropdown items
    if (link.dropdownMenu) {
      link.dropdownMenu.forEach((item) => {
        acc.push({
          title: item.title,
          href: item.href,
          icon: link.icon,
          permission: item.permission,
        });
      });
    }

    return acc;
  }, [] as Array<{ title: string; href: string; icon: any; permission: string }>);

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  async function handleLogout() {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-gray-900 bg-black/60 px-1 lg:h-[60px] backdrop-blur-md lg:px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col w-[260px] bg-gray-950"
          >
            <nav className="grid gap-1 text-lg font-medium">
              {/* <Logo href="/dashboard" full={false} /> */}
              <Link href="/dashboard">
                <Image width={149} height={48} src="/logo.png" alt="logo" />
              </Link>

              {/* Render mobile navigation links */}
              {mobileLinks.map((item, i) => {
                const Icon = item.icon;
                // Apply dynamic route for settings
                const linkHref = getDynamicRoute(
                  item.href as string,
                  item.title
                );
                const isActive = linkHref === pathname;

                return (
                  <SheetClose key={i} asChild>
                    <Link
                      href={linkHref}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 text-[0.9rem] py-2 text-slate-300 transition-all hover:text-primary",
                        isActive && "bg-muted text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            <div className="mt-auto">
              <Button onClick={handleLogout} size="sm" className="w-full">
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="w-full flex-1"></div>
        <div className="p-4">
          <UserDropdownMenu
            username={session?.user?.name ?? ""}
            email={session?.user?.email ?? ""}
            avatarUrl={
              session?.user?.image ??
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(54)-NX3G1KANQ2p4Gupgnvn94OQKsGYzyU.png"
            }
          />
        </div>
      </header>
    </>
  );
}
