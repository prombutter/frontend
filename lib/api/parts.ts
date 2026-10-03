import { fetchApi } from "./client";
import { getCurrentWorkspaceId } from "./auth";
import { Part, PartCreateInput, PartUpdateInput } from "@/types/api";

export async function getParts(workspaceId?: string, isDeleted: boolean = false): Promise<Part[]> {
  return fetchApi<Part[]>(`/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts`, {
    params: { is_deleted: isDeleted },
  });
}

export async function getPart(id: string, workspaceId?: string): Promise<Part> {
  return fetchApi<Part>(
    `/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts/${id}`,
  );
}

export async function createPart(data: PartCreateInput, workspaceId?: string): Promise<Part> {
  return fetchApi<Part>(`/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePart(
  id: string,
  data: PartUpdateInput,
  workspaceId?: string,
): Promise<Part> {
  return fetchApi<Part>(
    `/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}

export async function duplicatePart(id: string, workspaceId?: string): Promise<Part> {
  return fetchApi<Part>(
    `/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts/${id}/duplicate`,
    {
      method: "POST",
    },
  );
}

export async function toggleFavoritePart(id: string, workspaceId?: string): Promise<Part> {
  return fetchApi<Part>(
    `/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts/${id}/favorite`,
    {
      method: "POST",
    },
  );
}

export async function softDeletePart(id: string, workspaceId?: string): Promise<void> {
  return fetchApi<void>(
    `/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts/${id}`,
    {
      method: "DELETE",
    },
  );
}

export async function restorePart(id: string, workspaceId?: string): Promise<Part> {
  return fetchApi<Part>(
    `/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts/${id}/restore`,
    {
      method: "POST",
    },
  );
}

export async function permanentDeletePart(id: string, workspaceId?: string): Promise<void> {
  return fetchApi<void>(
    `/workspaces/${workspaceId ?? (await getCurrentWorkspaceId())}/parts/${id}/permanent`,
    {
      method: "DELETE",
    },
  );
}
