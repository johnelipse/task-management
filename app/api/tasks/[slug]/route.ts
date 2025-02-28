import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const tasks = await db.task.findUnique({
      where: {
        slug,
      },
      include: {
        team: true,
      },
    });
    return NextResponse.json(
      {
        message: "Fetch",
        data: tasks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch",
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const data = await req.json();
    const updatedData = await db.task.update({
      where: {
        slug,
      },
      data,
    });
    return NextResponse.json(
      {
        message: "Updated",
        data: updatedData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create",
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
