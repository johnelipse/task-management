"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function InvitationPage({ token }: { token: string }) {
  const router = useRouter();
  const { status } = useSession();
  const [message, setMessage] = useState("Processing your invitation...");

  useEffect(() => {
    const processInvitation = async () => {
      try {
        const response = await fetch(`/api/workspace/invite/${token}`);

        if (!response.ok) {
          const data = await response.json();
          setMessage(data.error || "Failed to process invitation");
          return;
        }
        const redirectUrl = response.url;
        if (redirectUrl && redirectUrl !== window.location.href) {
          router.replace(redirectUrl);
        }
      } catch (error) {
        console.error("Error processing invitation:", error);
        setMessage("Something went wrong");
      }
    };

    // Only proceed once authentication status is determined
    if (status !== "loading") {
      processInvitation();
    }
  }, [token, status, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Workspace Invitation</h1>
        <div className="animate-pulse">
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
