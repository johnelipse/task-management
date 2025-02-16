import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Facebook, Linkedin, Twitter } from "lucide-react";

export function SecondFooter() {
  return (
    <footer className="border-t border-gray-800 bg-black text-gray-400">
      <div className="container px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
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
              <span className="text-xl font-semibold text-white">To-DO</span>
            </div>
            <p className="mt-4 text-sm">
              Bring your team's work together in one shared space.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <div className="grid gap-8 sm:grid-cols-3">
              {/* General */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  General
                </h3>
                <ul className="space-y-3 text-sm">
                  {["Homepage", "Product", "Web App", "Trust & Security"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="transition-colors hover:text-white"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* About Us */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  About Us
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "Our Company",
                    "Prog. Leadership",
                    "Our Customer",
                    "Careers 23",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="transition-colors hover:text-white"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Solutions
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "Project Management",
                    "Goal Management",
                    "Agile Management",
                    "Task Management",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="transition-colors hover:text-white"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Stay Updated With Our Latest News & Sight
            </h3>
            <div className="mt-4 space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm">
            Copyright © 2025 a.skudo. All right reserved.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <Link href="#" className="hover:text-white">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="hover:text-white">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
