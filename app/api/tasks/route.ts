import { FormData } from "@/components/Forms/create-task";
import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: FormData = await req.json();
  try {
    const newTask = await db.task.create({
      data,
    });
    return NextResponse.json(
      {
        message: "Created",
        data: newTask,
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

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      orderBy: {
        createdAt: "desc",
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
