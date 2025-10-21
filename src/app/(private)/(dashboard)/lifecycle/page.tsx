"use client";

import axios from "axios";
import { useEffect } from "react";

export default function Lifecycle() {
  useEffect(() => {
    axios.get("/api/lifecycle");
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-4xl">Lifecycle</h1>
    </div>
  );
}
