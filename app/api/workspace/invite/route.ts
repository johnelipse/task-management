import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { generateToken } from "@/lib/token";
import InviteUserEmail from "@/components/email-templates/invitation-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, workspaceId } = data;
  const session = await getServerSession(authOptions);
  try {
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!workspaceId) {
      return NextResponse.json(
        { error: "Workspace ID is required" },
        { status: 400 }
      );
    }

    const ownership = await db.workspace.findFirst({
      where: {
        ownerId: session?.user.id,
      },
    });
    if (!ownership) {
      return NextResponse.json(
        { error: "Not authorized to invite, you’re not the owner." },
        { status: 401 }
      );
    }
    const workspace = await db.workspace.findUnique({
      where: { id: workspaceId },
      select: { name: true, ownerId: true },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    const existingInvitation = await db.invitation.findFirst({
      where: {
        email,
        workspaceId,
      },
    });

    if (existingInvitation) {
      return NextResponse.json(
        {
          error: "Invitation already sent to this email",
          data: existingInvitation,
        },
        { status: 409 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const existingMember = await db.user.findFirst({
        where: {
          id: existingUser.id,
          WorkspaceIds: {
            has: workspaceId,
          },
        },
      });

      if (existingMember) {
        return NextResponse.json(
          { error: "User is already a member of this workspace" },
          { status: 409 }
        );
      }
    }

    // Generate invitation token
    const token = generateToken();

    // Send invitation email
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const acceptUrl = `${baseUrl}/invitation/${token}`;

    const subject = `You've been invited to join ${workspace.name}`;
    const ownerName = session?.user.name ?? "";
    const ownerEmail = session?.user.email as string;
    const workspaceName = workspace.name;
    const recipientEmail = email;

    try {
      await resend.emails.send({
        from: "TaskFlowX <jb@comedev.org>",
        to: [email],
        subject,
        react: InviteUserEmail({
          workspaceName,
          acceptUrl,
          ownerName,
          ownerEmail,
          workspaceId,
          recipientEmail,
        }),
      });
    } catch (error) {
      console.error("Failed to send invitation email:", error);
      // Continue even if email fails - the invitation is still created
    }
    // Create the invitation
    const createdInvitation = await db.invitation.create({
      data: {
        email,
        workspaceId,
        inviteToken: token,
      },
    });
    return NextResponse.json(
      {
        data: createdInvitation,
        message: "Invitation sent successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create invitation:", error);
    return NextResponse.json(
      {
        message: "Failed to create invitation",
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const invitations = await db.invitation.findMany({});
    return NextResponse.json(
      {
        data: invitations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "something went wrong",
      },
      { status: 500 }
    );
  }
}
