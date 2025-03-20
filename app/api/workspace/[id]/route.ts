import { db } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await req.json();
    const updatedWorkspace = await db.workspace.update({
      where: {
        id,
      },
      data,
    });
    return NextResponse.json(
      {
        data: updatedWorkspace,
        message: "updated",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "failed", error: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    await db.workspace.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: "Deleted successfully",
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
