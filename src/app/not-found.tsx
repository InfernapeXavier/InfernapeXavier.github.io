import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell grid place-items-center">
      <div className="section-container text-center">
        <p className="eyebrow">Error / 404</p>
        <h1 className="mt-6 text-[clamp(8rem,26vw,22rem)] font-semibold leading-[0.75] tracking-[-0.1em] text-accent">
          404
        </h1>
        <p className="mx-auto mt-10 max-w-lg text-xl text-theme-subtle">
          This route didn&apos;t survive deployment. The rest of the system is
          healthy.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="button-primary">
            Return home
          </Link>
          <Link href="/#contact" className="button-secondary">
            Report an issue
          </Link>
        </div>
      </div>
    </main>
  );
}
