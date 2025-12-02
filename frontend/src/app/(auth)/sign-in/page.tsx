"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const data = await signIn(email, password);

			// Store token (simple version – localStorage).
			// Later you can replace with cookies / proper auth context.
			if (typeof window !== "undefined") {
				localStorage.setItem("authToken", data.access_token);
			}

			// Redirect to profile (or wherever you want)
			router.push("/profile");
		} catch (err) {
			if (err instanceof Error) setError(err.message);
			else setError("Failed to sign in");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
				<h1 className="mb-2 text-2xl font-semibold">Sign in</h1>
				<p className="mb-6 text-sm text-muted-foreground">
					Welcome back! Sign in to access your plans.
				</p>

				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label className="mb-1 block text-sm font-medium">Email</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium">Password</label>
						<input
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
						/>
					</div>

					{error && (
						<p className="text-sm text-destructive">
							{error}
						</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={loading}
					>
						{loading ? "Signing in..." : "Sign in"}
					</Button>
				</form>

				<p className="mt-4 text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<a
						href="/sign-up"
						className="font-medium text-primary underline-offset-4 hover:underline"
					>
						Create one
					</a>
				</p>
			</div>
		</div>
	);
}