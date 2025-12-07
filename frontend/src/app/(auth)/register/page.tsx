"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { API_BASE } from "@/lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const passwordMismatch =
    (pwd.length > 0 || confirm.length > 0) && pwd !== confirm;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (passwordMismatch) {
      setErr("Passwords must match before continuing.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pwd }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.detail ?? data?.message ?? "Registration failed";
        throw new Error(msg);
      }

      setDone(true);
    } catch (e: any) {
      setErr(e?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex min-h-full flex-col">
        <div className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded border bg-background p-6 shadow-sm space-y-4">
            <h1 className="text-2xl font-semibold">Check your email</h1>
            <p className="text-sm text-muted-foreground">
              We&apos;ve created your account for <b>{email}</b>. If email
              verification is required, please verify your email and then sign in.
            </p>
            <button
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              onClick={() => router.replace("/login")}
            >
              Go to Sign in
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded border bg-background p-6 shadow-sm">
          <h1 className="mb-1 text-2xl font-semibold">Create account</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign up to start planning your courses.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Full name</label>
              <input
                type="text"
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="At least 8 characters"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Confirm password
              </label>
              <input
                type="password"
                required
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            {passwordMismatch && (
              <p className="text-xs text-red-600">
                Passwords must match before continuing.
              </p>
            )}

            {err && (
              <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || passwordMismatch}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating…" : "Sign up"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}