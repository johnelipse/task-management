import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const task = await db.task.create({
      data: {
        taskName: data.taskName,
        priority: data.priority,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        boardId: data.boardId,
      },
    });

    return NextResponse.json(
      { message: "Created", data: task },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
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
