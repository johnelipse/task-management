import { authOptions } from "@/config/auth";
import { db } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          data: null,
          error: "First sign in please",
        },
        { status: 401 }
      );
    }
    const sessionId = session?.user.id;
    const user = await db.user.findUnique({
      where: {
        id: sessionId,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          data: null,
          error: "First sign in please",
        },
        { status: 401 }
      );
    }
    const { name } = data;
    const existingWorkspace = await db.workspace.findUnique({
      where: {
        name,
      },
    });
    if (existingWorkspace) {
      return NextResponse.json(
        {
          data: null,
          error: "Workspace already exists.",
        },
        { status: 409 }
      );
    }
    const newWorkspace = await db.workspace.create({
      data,
    });
    if (user) {
      const updatedUser = await db.user.update({
        where: {
          id: sessionId,
        },
        data: {
          WorkspaceIds: { push: newWorkspace.id },
        },
      });
      return NextResponse.json(
        {
          data: updatedUser,
          message: "updated",
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      {
        data: newWorkspace,
        message: "Created",
      },
      { status: 201 }
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

export async function GET() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  try {
    const workspaces = await db.workspace.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        ownerId: id,
      },
    });
    return NextResponse.json(
      {
        data: workspaces,
        message: "Fetched",
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
