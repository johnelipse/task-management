import React from "react";
import { Button } from "../ui/button";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";

export default function HeaderComponent() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-zinc-800 bg-zinc-900/95 px-4 sm:px-6 fixed top-0 right-0 left-0 md:left-64 z-20">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search workspaces..."
              className="w-full bg-zinc-800 border-zinc-700 pl-8 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-cyan-500"
            />
          </div>
        </form>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-zinc-400 hover:text-white"
      >
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="User avatar"
              className="rounded-full"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-zinc-900 border-zinc-800 text-zinc-200"
        >
          <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
