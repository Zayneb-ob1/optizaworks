"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center bg-neutral-50 py-20">
      <div className="mx-auto max-w-xl px-5 text-center" role="alert">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Error
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary">
          Something went wrong.
        </h1>
        <p className="mt-4 text-sm leading-7 text-neutral-500">
          We could not load this page. Please try again or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex rounded-full border border-primary/10 bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent/30 hover:text-accent"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
