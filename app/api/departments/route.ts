import { db } from "@/prisma/db";
import { DepartmentProps } from "@/types/types";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: DepartmentProps = await req.json();
  try {
    const { slug } = data;
    const existingDepartment = await db.department.findUnique({
      where: {
        slug,
      },
    });
    if (existingDepartment) {
      return NextResponse.json(
        {
          data: null,
          error: "Department already exists",
        },
        { status: 409 }
      );
    }
    const newDepartment = await db.department.create({
      data,
    });
    return NextResponse.json(
      { message: "Created Department", data: newDepartment },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create department.",
        error: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const departments = await db.department.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      {
        message: "created",
        data: departments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed",
        error: "something went wrong",
      },
      { status: 500 }
    );
  }
}
