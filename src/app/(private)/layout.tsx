import { AuthProvider } from "@/contexts/AuthContext";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PrivatePages({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  // if (!user) {
  //   return redirect("/signin");
  // }

  return (
    <div>
      <AuthProvider user={user}>{children}</AuthProvider>
    </div>
  );
}
