import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await auth();

  if (!user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: user.id,
    lifecycle: [1, 2, 3, 4, 5],
  });
}
