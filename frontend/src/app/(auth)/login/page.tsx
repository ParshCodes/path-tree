"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { API_BASE } from "@/lib/api";
import { setTokens, setUserFirstName } from "@/lib/auth";
import type { TokenPair, AccountOut } from "@/types/account";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      // 1) Call /auth/login-json with JSON { email, password }
     const res = await fetch(`${API_BASE}/auth/login-json`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
  credentials: "include", // 👈 IMPORTANT
});

if (!res.ok) {
  const errData = await res.json().catch(() => null);
  throw new Error(errData?.detail ?? "Login failed");
}

const tokens = (await res.json()) as TokenPair;
// access_token is already in HttpOnly cookie, but you can keep refresh:
setTokens(tokens); // now a no-op for access, but ok for refresh

// Fetch /auth/me to get name
const meRes = await fetch(`${API_BASE}/auth/me`, {
  credentials: "include",
});
if (meRes.ok) {
  const me = (await meRes.json()) as AccountOut;
  const firstName = me.name?.split(" ")[0] || "Student";
  setUserFirstName(firstName);
}

// Hard navigation so the navbar reinitializes with the new cookie
window.location.href = "/profile";
    } catch (e: any) {
      setErr(e?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded border bg-background p-6 shadow-sm">
          <h1 className="mb-1 text-2xl font-semibold">Sign in</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Use your Course Planner account.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
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
              <div className="flex gap-2">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="rounded border px-3 text-xs font-medium text-muted-foreground hover:bg-muted/50"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {err && (
              <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}