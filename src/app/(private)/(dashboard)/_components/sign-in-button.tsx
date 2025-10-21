import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignInButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    await axios.post("/api/auth/sign-in", {
      email: "lucas@email.com",
      password: "urubunegro",
    });
    router.refresh();
  }

  return (
    <Button onClick={handleSignIn} disabled={isLoading}>
      {isLoading && <Loader2Icon className="animate-spin size-4" />}
      {!isLoading && "Entrar"}
    </Button>
  );
}
