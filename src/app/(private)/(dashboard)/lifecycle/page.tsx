"use client";

import { useAuth } from "@/hooks/use-auth";
import axios from "axios";
import { useEffect } from "react";

export default function Lifecycle() {
  const { isSignedIn } = useAuth();

  // useEffect(() => {
  //   axios.get("/api/lifecycle");
  // }, []);

  return (
    <div className="m-10">
      {!isSignedIn && (
        <div className="w-full h-10 bg-amber-200 flex items-center justify-center gap-1 rounded-lg text-sm text-amber-950">
          Faça Login para visualizar a pagina <strong>Lifecycle</strong>
        </div>
      )}
      {isSignedIn && <h1 className="text-4xl">Lifecycle</h1>}
    </div>
  );
}
