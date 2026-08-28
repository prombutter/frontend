import { useState, useEffect, useCallback } from "react";
import { Part, ApiError } from "@/types/api";
import * as partsApi from "@/lib/api/parts";

export function useParts(isDeleted: boolean = false) {
  const [parts, setParts] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchParts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await partsApi.getParts(undefined, isDeleted);
      setParts(data);
    } catch (err) {
      setError(err as ApiError);
      alert((err as ApiError).message);
    } finally {
      setIsLoading(false);
    }
  }, [isDeleted]);

  useEffect(() => {
    fetchParts();
  }, [fetchParts]);

  const toggleFavorite = async (id: string) => {
    try {
      const updatedPart = await partsApi.toggleFavoritePart(id);
      setParts((prev) =>
        prev.map((p) => (p.id === id ? updatedPart : p))
      );
    } catch (err) {
      alert((err as ApiError).message);
    }
  };

  const softDelete = async (id: string) => {
    try {
      await partsApi.softDeletePart(id);
      setParts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert((err as ApiError).message);
    }
  };

  const restore = async (id: string) => {
    try {
      await partsApi.restorePart(id);
      setParts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert((err as ApiError).message);
    }
  };

  const permanentDelete = async (id: string) => {
    try {
      await partsApi.permanentDeletePart(id);
      setParts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert((err as ApiError).message);
    }
  };
  
  const duplicate = async (id: string) => {
    try {
      const newPart = await partsApi.duplicatePart(id);
      setParts((prev) => [newPart, ...prev]);
    } catch (err) {
      alert((err as ApiError).message);
    }
  };

  return {
    parts,
    isLoading,
    error,
    refetch: fetchParts,
    toggleFavorite,
    softDelete,
    restore,
    permanentDelete,
    duplicate,
  };
}
