import { ApiError, ApiErrorResponse } from "@/types/api";

const API_BASE_URL = "/api/v1";

// 임시 워크스페이스 ID (인증 구현 전까지 하드코딩 사용)
// TODO: PB-106(인증) 완료 시 삭제하고 실제 Context/Auth 에서 가져오도록 수정
export const TEMP_WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
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
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData: ApiErrorResponse;
    try {
      errorData = await response.json();
    } catch (e) {
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
