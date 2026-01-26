import Link from "next/link";
import { FaHome, FaEnvelope } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-rose-pine-base flex items-center justify-center relative overflow-hidden">
      <div className="floating-shapes" />
      <div className="grid-pattern" />

      <div className="relative text-center px-6 animate-fade-in">
        <h1 className="text-9xl font-bold mb-4 text-gradient">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-rose-pine-dawn-pine dark:text-rose-pine-foam">
          Page not found
        </h2>
        <p className="text-xl text-theme-subtle mb-12 max-w-md mx-auto">
          Looks like you&apos;ve wandered off the map. Let&apos;s get you back
          on track.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-rose-pine-dawn-pine/90 dark:bg-rose-pine-pine/90 text-white hover:bg-rose-pine-dawn-foam/90 dark:hover:bg-rose-pine-foam/90 transition-all duration-200"
          >
            <FaHome className="text-lg" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-theme-surface border border-theme-highlight text-theme-text hover:bg-theme-highlight hover:border-theme-subtle transition-all duration-200"
          >
            <FaEnvelope className="text-lg" />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
