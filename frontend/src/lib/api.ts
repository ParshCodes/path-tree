// frontend/src/lib/api.ts
const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type SignUpPayload = {
	name: string;
	email: string;
	password: string;
};

export type AuthTokenResponse = {
	access_token: string;
	token_type: string;
};

async function handleResponse(res: Response) {
	if (!res.ok) {
		// Try to extract FastAPI error detail
		let message = "Something went wrong";
		try {
			const data = await res.json();
			if (typeof data.detail === "string") message = data.detail;
			if (Array.isArray(data.detail) && data.detail[0]?.msg) {
				message = data.detail[0].msg;
			}
		} catch {
			// ignore JSON parse error
		}
		throw new Error(message);
	}
	return res.json();
}

export async function signUp(payload: SignUpPayload) {
	const res = await fetch(`${API_BASE_URL}/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	return handleResponse(res);
}

export async function signIn(
	email: string,
	password: string,
): Promise<AuthTokenResponse> {
	const res = await fetch(`${API_BASE_URL}/auth/login-json`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});
	return handleResponse(res);
}