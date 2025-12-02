"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await signUp({ name, email, password });
			// After successful sign up, send them to sign in
			router.push("/sign-in");
		} catch (err) {
			if (err instanceof Error) setError(err.message);
			else setError("Failed to sign up");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
				<h1 className="mb-2 text-2xl font-semibold">Create an account</h1>
				<p className="mb-6 text-sm text-muted-foreground">
					Sign up to start planning your courses.
				</p>

				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label className="mb-1 block text-sm font-medium">Name</label>
						<input
							type="text"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
						/>
					</div>

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
							minLength={6}
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
						{loading ? "Signing up..." : "Sign up"}
					</Button>
				</form>

				<p className="mt-4 text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<a
						href="/sign-in"
						className="font-medium text-primary underline-offset-4 hover:underline"
					>
						Sign in
					</a>
				</p>
			</div>
		</div>
	);
}