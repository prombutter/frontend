export interface ApiErrorResponse {
  error_code: string;
  message: string;
  detail?: any;
}

export class ApiError extends Error {
  error_code: string;
  detail?: any;

  constructor(response: ApiErrorResponse) {
    super(response.message);
    this.name = "ApiError";
    this.error_code = response.error_code;
    this.detail = response.detail;
  }
}

export interface Part {
  id: string;
  workspace_id: string;
  title: string;
  body: string;
  is_favorite: boolean;
  variable_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PartCreateInput {
  title: string;
  body: string;
  tags?: string[];
}

export interface PartUpdateInput {
  title?: string;
  body?: string;
  tags?: string[];
  is_favorite?: boolean;
}
