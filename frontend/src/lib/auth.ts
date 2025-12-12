const REFRESH = "refresh_token";
const USERNAME = "user_first_name";

export type TokenPair = {
  access_token?: string;  // can be optional/ignored now
  refresh_token: string;
  token_type: string;
};

export function setTokens(tokens: TokenPair) {
  if (typeof window === "undefined") return;
  if (tokens.refresh_token) {
    localStorage.setItem(REFRESH, tokens.refresh_token);
  }
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH);
}

export function setUserFirstName(name: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERNAME, name);
}

export function getUserFirstName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USERNAME);
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REFRESH);
  localStorage.removeItem(USERNAME);
}