import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Session } from "next-auth";
import { UserDropdownMenu } from "../UserDropdownMenu";

export default function HeaderComponent({ session }: { session: Session }) {
  return (
    <header className="flex h-14 items-center gap-2 sm:gap-4 border-b border-zinc-800 bg-zinc-900/95 px-2 sm:px-6 fixed top-0 right-0 left-0 md:left-64 z-20">
      <Button variant="ghost" size="icon" className="md:hidden shrink-0">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex-1 min-w-0">
        <form>
          <div className="relative hidden md:block">
            <Search className="absolute hidden md:block left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search workspaces..."
              className="w-full bg-zinc-800 border-zinc-700 pl-8 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-cyan-500"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

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
  );
}
