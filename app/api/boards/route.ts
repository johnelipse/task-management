import { db } from "@/prisma/db";
import { TeamProps } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: TeamProps = await req.json();
  try {
    const { slug } = data;
    const existingTeam = await db.board.findUnique({
      where: {
        slug,
      },
    });
    if (existingTeam) {
      return NextResponse.json(
        {
          data: null,
          error: "Team already exists",
        },
        { status: 409 }
      );
    }
    const newTeam = await db.board.create({
      data,
    });
    return NextResponse.json(
      { message: "Created Department", data: newTeam },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed",
      error: "Something went wrong.",
    });
  }
}

export async function GET() {
  try {
    const teams = await db.board.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Workspace: true,
      },
    });
    return NextResponse.json(
      {
        data: teams,
        message: "Fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch",
        error: "Failed to fetch",
      },
      { status: 500 }
    );
  }
}
