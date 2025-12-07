import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearAuth,
  type TokenPair,
} from "./auth";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function refreshAccessToken(): Promise<TokenPair | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });

  if (!res.ok) {
    clearAuth();
    return null;
  }

  const data = (await res.json()) as TokenPair;
  setTokens(data);
  return data;
}

/**
 * Authenticated fetch:
 *  - Attaches access token
 *  - If 401, tries /auth/refresh once and retries the request
 */
export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const makeRequest = () =>
    fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
    });

  let res = await makeRequest();

  if (res.status === 401) {
    // Try refreshing the token once
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      headers = {
        ...headers,
        Authorization: `${refreshed.token_type} ${refreshed.access_token}`,
      };
      res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers,
      });
    } else {
      throw new Error("Unauthorized");
    }
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const msg = data?.detail ?? data?.message ?? `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return data as T;
}