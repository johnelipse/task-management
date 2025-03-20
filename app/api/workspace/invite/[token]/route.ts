import { authOptions } from "@/config/auth";
import { db } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Route to handle invitation acceptance
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const token = (await params).token;
  const session = await getServerSession(authOptions);

  try {
    // Find the invitation
    const invitation = await db.invitation.findUnique({
      where: { inviteToken: token },
    });

    if (!invitation) {
      return NextResponse.redirect(new URL("/invitation/invalid", req.url));
    }

    // Check if invitation has expired

    if (!session?.user) {
      // User is not logged in
      const userExists = await db.user.findUnique({
        where: { email: invitation.email },
        select: { id: true },
      });

      if (userExists) {
        // User exists but not logged in
        return NextResponse.redirect(
          new URL(`/login?callbackUrl=/invitation/${token}`, req.url)
        );
      } else {
        // New user needs to register
        return NextResponse.redirect(
          new URL(
            `/register?email=${encodeURIComponent(
              invitation.email
            )}&callbackUrl=/invitation/${token}`,
            req.url
          )
        );
      }
    }

    // User is logged in
    if (session.user.email !== invitation.email) {
      // Email mismatch - show error or let them switch accounts
      return NextResponse.redirect(
        new URL("/invitation/email-mismatch", req.url)
      );
    }

    await db.invitation.delete({
      where: { id: invitation.id },
    });
    // const existingMember = await db.user.findFirst({
    //   where: {
    //     WorkspaceIds: {
    //       has: invitation.workspaceId,
    //     },
    //   },
    // });

    // if (!existingMember) {
    //   await db.user.update({
    //     where: {
    //       email: session.user.email,
    //     },
    //     data: {
    //       WorkspaceIds: {
    //         push: invitation.workspaceId,
    //       },
    //     },
    //   });

    //   // Delete the invitation
    //   await db.invitation.delete({
    //     where: { id: invitation.id },
    //   });
    // }

    // const currentUser = await db.user.findFirst({
    //   where: {
    //     email: session.user.email,
    //   },
    //   select: {
    //     WorkspaceIds: true,
    //   },
    // });

    // if (!currentUser?.WorkspaceIds.includes(invitation.workspaceId)) {
    //   await db.user.update({
    //     where: {
    //       email: session.user.email,
    //     },
    //     data: {
    //       WorkspaceIds: {
    //         push: invitation.workspaceId,
    //       },
    //     },
    //   });

    //   await db.invitation.delete({
    //     where: { id: invitation.id },
    //   });
    // }

    return NextResponse.redirect(
      // new URL(`/dashboard/workspace/${invitation.workspaceId}`, req.url)
      new URL(`/workspace/boards`, req.url)
    );
  } catch (error) {
    console.error("Error processing invitation:", error);
    return NextResponse.redirect(new URL("/invitation/error", req.url));
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const token = (await params).token;
  try {
    await db.invitation.delete({
      where: {
        inviteToken: token,
      },
    });
    return NextResponse.json(
      {
        message: "Deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
