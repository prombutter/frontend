import { fetchApi, TEMP_WORKSPACE_ID } from "./client";
import { Part, PartCreateInput, PartUpdateInput } from "@/types/api";

export async function getParts(
  workspaceId: string = TEMP_WORKSPACE_ID,
  isDeleted: boolean = false
): Promise<Part[]> {
  return fetchApi<Part[]>(`/workspaces/${workspaceId}/parts`, {
    params: { is_deleted: isDeleted },
  });
}

export async function getPart(
  id: string,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<Part> {
  return fetchApi<Part>(`/workspaces/${workspaceId}/parts/${id}`);
}

export async function createPart(
  data: PartCreateInput,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<Part> {
  return fetchApi<Part>(`/workspaces/${workspaceId}/parts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePart(
  id: string,
  data: PartUpdateInput,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<Part> {
  return fetchApi<Part>(`/workspaces/${workspaceId}/parts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function duplicatePart(
  id: string,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<Part> {
  return fetchApi<Part>(`/workspaces/${workspaceId}/parts/${id}/duplicate`, {
    method: "POST",
  });
}

export async function toggleFavoritePart(
  id: string,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<Part> {
  return fetchApi<Part>(`/workspaces/${workspaceId}/parts/${id}/favorite`, {
    method: "POST",
  });
}

export async function softDeletePart(
  id: string,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<void> {
  return fetchApi<void>(`/workspaces/${workspaceId}/parts/${id}`, {
    method: "DELETE",
  });
}

export async function restorePart(
  id: string,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<Part> {
  return fetchApi<Part>(`/workspaces/${workspaceId}/parts/${id}/restore`, {
    method: "POST",
  });
}

export async function permanentDeletePart(
  id: string,
  workspaceId: string = TEMP_WORKSPACE_ID
): Promise<void> {
  return fetchApi<void>(`/workspaces/${workspaceId}/parts/${id}/permanent`, {
    method: "DELETE",
  });
}
