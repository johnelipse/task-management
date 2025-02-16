"use client";
import WaitList from "@/components/Forms/WaitList";
import React, { useEffect, useState } from "react";

export default function page() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (isClient) {
    return isClient;
  }
  return (
    <div>
      <WaitList />
    </div>
  );
}
