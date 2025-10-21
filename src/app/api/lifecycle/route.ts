import { auth } from "@/lib/auth";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async (request) => {
  return NextResponse.json({
    user: request.user.id,
    lifecycle: [1, 2, 3, 4, 5],
  });
});
