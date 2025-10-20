import { env } from "@/config/env";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

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

export function auth(): Promise<null | string> {
  return verifyJwt();
}
