import { authOptions } from "@/config/auth";
import { db } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
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
