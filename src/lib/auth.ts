import { env } from "@/config/env";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { prismaClient } from "./prismaClient";
import { User } from "@/entities/User";

async function getAccessToken() {
  return (await cookies()).get("accessToken")?.value;
}

async function verifyJwt(): Promise<null | string> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }

  try {
    const { sub: userId } = verify(accessToken, env.jwtSecret) as JwtPayload;

    if (!userId) {
      return null;
    }

    return userId;
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  const verify = await verifyJwt();
  return !!verify;
}

export async function auth(): Promise<User | null> {
  const userId = await verifyJwt();

  if (!userId) {
    return null;
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true, fullname: true, email: true },
    });

    return user;
  } catch {
    return null;
  }
}
