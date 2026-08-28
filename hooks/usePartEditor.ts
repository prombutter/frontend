import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Part, ApiError, PartCreateInput, PartUpdateInput } from "@/types/api";
import * as partsApi from "@/lib/api/parts";

// 백엔드 정규식과 동일한 기준: 중괄호/개행 불허, 양옆 공백 허용
const VAR_REGEX = /\{\{\s*([^{}\n]+?)\s*\}\}/g;

export function extractVariables(body: string): string[] {
  const matches = [];
  let match;
  while ((match = VAR_REGEX.exec(body)) !== null) {
    if (match[1]) {
      matches.push(match[1].trim());
    }
  }
  // 중복 제거 및 순서 보장 (첫 등장 순)
  return Array.from(new Set(matches));
}

export function usePartEditor(partId?: string) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  
  // Derived / UI State
  const [variables, setVariables] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(!!partId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Load existing part if partId is provided
  useEffect(() => {
    if (!partId) return;

    let isMounted = true;
    setIsLoading(true);

    partsApi.getPart(partId)
      .then((part) => {
        if (isMounted) {
          setTitle(part.title);
          setBody(part.body);
          setTags(part.tags || []);
          setVariables(extractVariables(part.body));
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err as ApiError);
          alert(`파츠를 불러오는 중 오류가 발생했습니다: ${(err as ApiError).message}`);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [partId]);

  // Real-time variable extraction when body changes
  useEffect(() => {
    setVariables(extractVariables(body));
  }, [body]);

  // 글자수 등 프론트엔드 사전 검증
  const validate = (): boolean => {
    if (title.length > 100) {
      alert("제목은 100자를 초과할 수 없습니다.");
      return false;
    }
    if (body.length > 700) {
      alert("본문은 700자를 초과할 수 없습니다.");
      return false;
    }
    if (tags.length > 10) {
      alert("태그는 최대 10개까지 설정할 수 있습니다.");
      return false;
    }
    for (const tag of tags) {
      if (tag.length > 30) {
        alert("태그는 30자를 초과할 수 없습니다.");
        return false;
      }
    }
    return true;
  };

  const save = useCallback(async () => {
    if (!validate()) return;
    if (!title.trim() || !body.trim()) {
      alert("제목과 본문을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (partId) {
        const payload: PartUpdateInput = { title, body, tags };
        await partsApi.updatePart(partId, payload);
      } else {
        const payload: PartCreateInput = { title, body, tags };
        await partsApi.createPart(payload);
      }
      
      // 저장 성공 후 파츠 목록으로 이동
      router.push("/parts");
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr);
      // 에러 코드별 메시지 매핑 (ERR-BODY-001, ERR-TITLE-001, ERR-VAR-CNT-001, ERR-QUOTA-001 등)
      alert(`[${apiErr.error_code}] ${apiErr.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [partId, title, body, tags, router]);

  // ⌘S / Ctrl+S 저장 단축키 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault(); // 브라우저 저장 다이얼로그 방지
        save();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [save]);

  return {
    title,
    setTitle,
    body,
    setBody,
    tags,
    setTags,
    variables,
    isLoading,
    isSubmitting,
    error,
    save,
  };
}
