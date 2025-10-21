import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = Boolean(await auth());

  if (isAuthenticated) {
    return redirect("/");
  }

  return <div>{children}</div>;
}
