import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const notifications = await db.notification.findMany({
      where: {
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: notifications }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { message, statusText } = data;

    const notification = await db.notification.create({
      data: {
        message,
        statusText,
      },
    });

    return NextResponse.json({ data: notification }, { status: 201 });
  } catch (error) {
    console.error("Failed to create notification:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}
