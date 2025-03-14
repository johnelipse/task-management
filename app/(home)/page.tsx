import React from "react";
import { HeroSection } from "@/components/frontend/hero-section";
import { WhatToDo } from "@/components/frontend/whatToDo";
import TaskManagement from "@/components/frontend/summery";

export default async function page() {
  return (
    <section>
      <HeroSection />
      <WhatToDo />
      <TaskManagement />
    </section>
  );
}
