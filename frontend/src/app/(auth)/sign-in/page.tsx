"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // later you can add real submit logic here
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login stub:", { email, password });
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

            <button
              type="submit"
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Sign in
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/(auth)/sign-up"
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