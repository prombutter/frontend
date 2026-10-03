export const AUTH_API_ORIGIN =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

if (!process.env.NEXT_PUBLIC_API_BASE_URL && process.env.NODE_ENV === "production") {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is required for production authentication");
}

let refreshInFlight: Promise<boolean> | null = null;
export function refreshAuthSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${AUTH_API_ORIGIN}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    })
      .then((response) => response.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

export class AuthError extends Error {
  readonly code: string;
  constructor(code: string) {
    super(code);
    this.name = "AuthError";
    this.code = code;
  }
}

interface AuthUser {
  id: string;
}

async function authRequest<T>(
  path: string,
  body?: Record<string, string>,
  retry = true,
): Promise<T> {
  const response = await fetch(`${AUTH_API_ORIGIN}${path}`, {
    method: body ? "POST" : "GET",
    credentials: "include",
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (response.status === 401 && !body && retry && (await refreshAuthSession())) {
    return authRequest<T>(path, body, false);
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new AuthError(data?.error_code ?? `HTTP_${response.status}`);
  if (!data) throw new AuthError("INVALID_RESPONSE");
  return data as T;
}

function recordAuthResult(
  result: string,
  reason: string | null,
  requestId: string,
  startedAt: number,
) {
  try {
    const key = "prombutter.authEvents";
    const saved = JSON.parse(localStorage.getItem(key) ?? "[]");
    const events = Array.isArray(saved) ? saved : [];
    events.push({
      event: "web_login_result",
      timestamp: new Date().toISOString(),
      request_id: requestId,
      result,
      reason,
      duration_ms: Math.round(performance.now() - startedAt),
    });
    localStorage.setItem(key, JSON.stringify(events.slice(-50)));
  } catch {
    console.warn("[prombutter] web_login_result storage_failed", requestId);
  }
}

export async function confirmSession(expectedId?: string): Promise<AuthUser> {
  const user = await authRequest<AuthUser>("/auth/me", undefined, expectedId === undefined);
  if (!user.id || (expectedId && user.id !== expectedId))
    throw new AuthError("SESSION_COOKIE_FAILED");
  return user;
}

export async function authenticate(mode: "login" | "signup", values: Record<string, string>) {
  const requestId = crypto.randomUUID();
  const startedAt = performance.now();
  let result = "success";
  let reason: string | null = null;
  try {
    const user = await authRequest<AuthUser>(`/auth/${mode}`, values);
    if (!user.id) throw new AuthError("INVALID_RESPONSE");
    return await confirmSession(user.id);
  } catch (error) {
    result = "failure";
    reason = error instanceof AuthError ? error.code : "NETWORK_ERROR";
    throw error;
  } finally {
    recordAuthResult(result, reason, requestId, startedAt);
  }
}

export async function getCurrentWorkspaceId(): Promise<string> {
  const workspace = await authRequest<{ id: string }>("/workspaces");
  if (!workspace.id) throw new AuthError("INVALID_RESPONSE");
  return workspace.id;
}

export function googleLoginUrl(frontendOrigin: string): string {
  const url = new URL("/auth/oauth/google/redirect", AUTH_API_ORIGIN);
  url.searchParams.set("redirect_uri", new URL("/auth/callback", frontendOrigin).href);
  return url.href;
}

export function isOAuthCallbackSuccessful(href: string): boolean {
  const url = new URL(href);
  const fragment = new URLSearchParams(url.hash.slice(1));
  if (url.searchParams.has("error") || fragment.has("error")) return false;
  return (
    fragment.get("provider") === "google" &&
    ["true", "false"].includes(fragment.get("is_new_user") ?? "")
  );
}

export async function confirmOAuthSession(href: string): Promise<AuthUser> {
  const requestId = crypto.randomUUID();
  const startedAt = performance.now();
  let result = "success";
  let reason: string | null = null;
  try {
    if (!isOAuthCallbackSuccessful(href)) throw new AuthError("OAUTH_CALLBACK_FAILED");
    return await confirmSession();
  } catch (error) {
    result = "failure";
    reason = error instanceof AuthError ? error.code : "NETWORK_ERROR";
    throw error;
  } finally {
    recordAuthResult(result, reason, requestId, startedAt);
  }
}
