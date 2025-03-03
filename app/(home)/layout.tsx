import PromoBanner from "@/components/frontend/PromoBanner";
import { SecondFooter } from "@/components/frontend/second-footer";
import { SecondHeader } from "@/components/frontend/second-header";
import Footer from "@/components/frontend/site-footer";
import SiteHeader from "@/components/frontend/site-header";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white overflow-hidden">
      {/* <PromoBanner /> */}
      {/* <SiteHeader session={session} /> */}
      <SecondHeader session={session} />
      {children}
      {/* <Footer /> */}
      <SecondFooter />
    </div>
  );
}
