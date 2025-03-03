import Iframe from "react-iframe";
import PlainFeatures from "@/components/frontend/features";
import TabbedFeatures from "@/components/frontend/tabbed-features";
import TechStackGrid from "@/components/frontend/Techstack";
import { GridBackground } from "@/components/reusable-ui/grid-background";
import ProjectComparison from "@/components/reusable-ui/project-comparison";
import RadialFeature from "@/components/reusable-ui/radial-features";
import ReUsableHero from "@/components/reusable-ui/reusable-hero";
import {
  Award,
  Github,
  Code,
  Code2,
  History,
  Sprout,
  Folder,
} from "lucide-react";
import React from "react";
import Showcase from "@/components/frontend/showcase";
import PricingCard from "@/components/frontend/single-tier-pricing";
import FAQ from "@/components/frontend/FAQ";
import CustomizationCard from "@/components/frontend/customisation-card";
import Image from "next/image";
import { BorderBeam } from "@/components/magicui/border-beam";
import { HeroSection } from "@/components/frontend/hero-section";
import { WhatToDo } from "@/components/frontend/whatToDo";
import TaskManagement from "@/components/frontend/summery";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export default async function page() {
  return (
    <section>
      <HeroSection />
      <WhatToDo />
      <TaskManagement />
    </section>
  );
}
