import { ApiError, ApiErrorResponse } from "@/types/api";
import { AUTH_API_ORIGIN, refreshAuthSession } from "./auth";

const API_BASE_URL = `${AUTH_API_ORIGIN}/api/v1`;

interface FetchOptions extends RequestInit {
  params?: Record<string, unknown>;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
  retry = true,
): Promise<T> {
  const { params, headers, ...customConfig } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) {
      url += `?${qs}`;
    }
  }

  const config: RequestInit = {
    credentials: "include",
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  const response = await fetch(url, config);
  if (response.status === 401 && retry && (await refreshAuthSession())) {
    return fetchApi<T>(endpoint, options, false);
  }

  if (!response.ok) {
    let errorData: ApiErrorResponse;
    try {
      errorData = await response.json();
    } catch {
      errorData = {
        error_code: "ERR-UNKNOWN",
        message: "네트워크 에러가 발생했습니다.",
      };
    }
    throw new ApiError(errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
