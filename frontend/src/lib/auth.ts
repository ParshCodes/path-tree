const ACCESS = "access_token";
const REFRESH = "refresh_token";
const TYPE = "token_type";
const USERNAME = "user_first_name";

export type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string; // "bearer"
};

export function setTokens(tokens: TokenPair) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS, tokens.access_token);
  localStorage.setItem(REFRESH, tokens.refresh_token);
  localStorage.setItem(TYPE, tokens.token_type);
}

export function setUserFirstName(firstName: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERNAME, firstName);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH);
}

export function getUserFirstName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USERNAME);
}

export function clearAuth() {
  console.log("clearAuth() called - Stack trace:");
  console.trace();
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
  localStorage.removeItem(TYPE);
  localStorage.removeItem(USERNAME);
}