"use client";

import { type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-rose-pine-base antialiased">{children}</div>
  );
}
