import { db } from "@/prisma/db";
import { MemberProps } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: MemberProps = await req.json();
  try {
    const { email, phone, teamId } = data;
    const existingMember = await db.member.findUnique({
      where: {
        email,
        phone,
        teamId,
      },
    });
    if (existingMember) {
      return NextResponse.json(
        {
          error: "Member Already exists in this team",
          data: null,
        },
        { status: 409 }
      );
    }
    const newMember = await db.member.create({
      data,
    });
    return NextResponse.json(
      {
        message: "Mewmber created",
        data: newMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const members = await db.member.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Team: true,
      },
    });
    return NextResponse.json(
      {
        message: "Failed to Fetch",
        data: members,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch",
      },
      { status: 500 }
    );
  }
}
