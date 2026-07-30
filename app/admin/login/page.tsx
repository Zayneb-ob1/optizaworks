import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getCurrentAdmin } from "@/backend/auth/session";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";

export default async function AdminLoginPage() {
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-primary/10 bg-white p-7 shadow-soft sm:p-10">
        <div className="relative h-14 w-56 overflow-hidden">
          <Image
            src="/logo-removebg-preview.png"
            alt="Optizaworks"
            width={250}
            height={100}
            priority
            className="absolute -left-1 top-1/2 max-w-none -translate-y-1/2"
          />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Secure administration
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary">
          Welcome back.
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Sign in to manage website content and incoming project enquiries.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
