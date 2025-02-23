import Link from "next/link";
import { FaHome, FaQuestion } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-rose-pine-base flex items-center justify-center relative overflow-hidden">
      <div className="floating-shapes" />
      <div className="grid-pattern" />

      <div className="relative text-center px-6 animate-fade-in">
        <h1 className="text-9xl font-bold mb-4 text-gradient">404</h1>
        <h2 className="text-4xl font-semibold mb-6 text-rose-pine-foam">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-rose-pine-subtle mb-12 max-w-lg mx-auto">
          Looks like you&apos;ve ventured into uncharted territory! Don&apos;t
          worry, even the best explorers get lost sometimes.
        </p>

        {/* ASCII Art Cat */}
        <pre className="font-mono text-rose-pine-foam mb-12 hidden md:block">
          {`
     /\\___/\\
    (  o o  )
    (  =^=  ) 
     (______)
          `}
        </pre>

        <div className="flex justify-center gap-6">
          <Link href="/" className="button flex items-center gap-2">
            <FaHome className="text-xl" />
            <span>Go Home</span>
          </Link>
          <Link href="/contact" className="button flex items-center gap-2">
            <FaQuestion className="text-xl" />
            <span>Get Help</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
