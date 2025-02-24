"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaHome, FaRedo } from "react-icons/fa";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-rose-pine-base flex items-center justify-center relative overflow-hidden">
      <div className="floating-shapes" />
      <div className="grid-pattern" />

      <div className="relative text-center px-6 animate-fade-in">
        <h1 className="text-9xl font-bold mb-4 text-gradient">Oops!</h1>
        <h2 className="text-4xl font-semibold mb-6 text-rose-pine-foam">
          Something went wrong
        </h2>
        <p className="text-xl text-rose-pine-subtle mb-12 max-w-lg mx-auto">
          Don&apos;t worry, we&apos;re on it! In the meantime, you can try
          refreshing the page or go back home.
        </p>

        <div className="flex justify-center gap-6">
          <Link href="/" className="button flex items-center gap-2">
            <FaHome className="text-xl" />
            <span>Go Home</span>
          </Link>
          <button onClick={reset} className="button flex items-center gap-2">
            <FaRedo className="text-xl" />
            <span>Try Again</span>
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-rose-pine-surface rounded-lg text-left">
            <p className="text-rose-pine-love font-mono text-sm">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
