import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function SecondHeader() {
  return (
    <header className="fixed top-0 z-50 w-full px-4 py-3">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-full bg-gray-900/60 backdrop-blur-xl">
          <div className="container flex h-14 items-center justify-between px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-lg font-semibold text-white">To-DO</span>
              </div>
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
              <Button
                variant="ghost"
                className="text-sm display text-gray-400 hover:text-gray-400 hover:bg-transparent"
              >
                Sign In
              </Button>
              <Button className="group bg-gradient-to-r rounded-full from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                Sign Up Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
