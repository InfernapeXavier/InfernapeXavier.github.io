import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-theme-base">{children}</div>;
}
