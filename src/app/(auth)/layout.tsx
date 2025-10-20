import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (await isAuthenticated()) {
    return redirect("/");
  }

  return <div>{children}</div>;
}
