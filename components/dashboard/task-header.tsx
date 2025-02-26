"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type TableHeaderProps = {
  title: string;
  href: string;
  linkTitle: string;
  data: any;
};
export default function TaskHeader({
  title,
  href,
  linkTitle,
  data,
}: TableHeaderProps) {
  return (
    <div className=" mb-1">
      <div className="flex text-white justify-between items-center border-b border-gray-900 dark:border-gray-600 py-3">
        <h2 className="scroll-m-20 text-[1.3rem] md:text-2xl font-semibold tracking-tight first:mt-0">
          {title}({data.length})
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" asChild className="md:h-8 gap-1">
            <Link href={href}>
              <PlusCircle className="w-2 h-2 md:h-3.5 md:w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {linkTitle}
              </span>
              <span className="md:sr-only">Add</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
