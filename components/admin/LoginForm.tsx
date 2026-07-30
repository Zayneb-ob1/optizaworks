"use client";

import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { loginAction } from "@/backend/admin/auth-actions";
import { initialAdminActionState } from "@/shared/admin/action-state";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialAdminActionState);

  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-primary">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-2xl border border-primary/10 bg-neutral-50 px-4 py-3.5 text-sm text-primary outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-primary">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-2xl border border-primary/10 bg-neutral-50 px-4 py-3.5 text-sm text-primary outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/10"
        />
      </label>
      {state.message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? <LoaderCircle size={17} className="animate-spin" /> : <LockKeyhole size={17} />}
        {pending ? "Signing in…" : "Sign in securely"}
        {!pending && <ArrowRight size={17} />}
      </button>
    </form>
  );
}
