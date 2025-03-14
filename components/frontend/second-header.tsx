import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Session } from "next-auth";

export function SecondHeader({ session }: { session: Session | null }) {
  return (
    <header className="fixed top-0 z-50 w-full px-4 py-3">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-full bg-gray-900/60 backdrop-blur-xl">
          <div className="container flex h-14 items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image width={149} height={48} src="/logo.png" alt="logo" />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex md:gap-6">
              {["Home", "Personal", "Business", "Bounds"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {session?.user ? (
                ""
              ) : (
                <Button
                  variant="ghost"
                  className="text-sm display text-gray-400 hover:text-gray-400 hover:bg-transparent"
                >
                  Sign In
                </Button>
              )}
              <Button
                asChild
                className="group bg-gradient-to-r rounded-full from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
              >
                <Link href={session?.user ? "/workspace/boards" : "/register"}>
                  {session?.user ? "Dashboard" : "Sign Up Free"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
