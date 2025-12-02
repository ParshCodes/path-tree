"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Register stub:", { name, email, pwd, confirm });
  }

  const passwordMismatch =
    (pwd.length > 0 || confirm.length > 0) && pwd !== confirm;

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

            <button
              type="submit"
              disabled={passwordMismatch}
              className="mt-2 w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              Sign up
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/(auth)/sign-in"
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