import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const department = await db.department.findUnique({
      where: {
        slug,
      },
    });
    return NextResponse.json(
      {
        message: "Fetch",
        data: department,
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
    const updatedData = await db.department.update({
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await db.department.delete({
      where: {
        slug,
      },
    });
    return NextResponse.json(
      {
        message: "Deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete",
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
