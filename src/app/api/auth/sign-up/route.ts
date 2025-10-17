import { prismaClient } from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { hash } from "bcryptjs";

const schema = z.object({
  fullname: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { success, error, data } = schema.safeParse(body);

  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 400 });
  }

  const { fullname, email, password } = data;

  const emailAlreadyInUse = await prismaClient.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (emailAlreadyInUse) {
    return NextResponse.json(
      { errors: "Email already in use" },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 12);

  await prismaClient.user.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
    },
  });

  return new NextResponse(null, { status: 204 });
}
