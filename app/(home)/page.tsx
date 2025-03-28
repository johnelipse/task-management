import React from "react";
import { HeroSection } from "@/components/frontend/hero-section";
import { WhatToDo } from "@/components/frontend/whatToDo";
import TaskManagement from "@/components/frontend/summery";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/workspace/boards");
  }
  return (
    <section>
      <HeroSection />
      <WhatToDo />
      <TaskManagement />
    </section>
  );
}
