"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { PageHeader } from "@/components/ui";
import { usePartEditor } from "@/hooks/usePartEditor";

export default function EditPartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const {
    title, setTitle,
    body, setBody,
    tags, setTags,
    variables,
    isLoading,
    isSubmitting,
    save
  } = usePartEditor(id);

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const newTag = tagInput.trim().replace(/\s+/g, '_');
    if (newTag.length > 30) {
      alert("태그는 30자 이내로 입력해주세요.");
      return;
    }
    if (tags.length >= 10) {
      alert("태그는 최대 10개까지 등록 가능합니다.");
      return;
    }
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput("");
  };

  const removeTag = (t: string) => {
    setTags(tags.filter(tag => tag !== t));
  };

  if (isLoading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  }

  return (
    <>
      <PageHeader title="Edit Parts" desc="기존 파츠를 수정합니다." />

      <div className="editor-body">
        <div className="editor-inner">
          <div className="title-row">
            <div className="title-input">
              <Image src="/assets/icon-star.svg" alt="" width={24} height={24} />
              <input 
                type="text" 
                maxLength={100} 
                placeholder="파츠 제목을 입력하세요." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="title-input__count">{title.length}/100</span>
            </div>
            <div className="editor-actions">
              <Link className="btn btn--tall btn--outline-muted" href="/parts">
                <Image src="/assets/icon-exit.svg" alt="" width={24} height={24} />
                <span>취소</span>
              </Link>
              <button 
                className="btn btn--tall btn--primary" 
                type="button"
                onClick={save}
                disabled={isSubmitting}
              >
                <Image src="/assets/icon-save.png" alt="" width={24} height={24} />
                <span>{isSubmitting ? "저장 중..." : "저장"}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            {/* 좌측 코드 입력 영역 */}
            <div className="preview-panel" style={{ flex: 1 }}>
              <div className="preview-head">
                <div className="preview-head__bar">파츠 본문 (최대 700자)</div>
              </div>
              <div style={{ padding: '16px', height: '300px' }}>
                <textarea 
                  style={{ width: '100%', height: '100%', border: 'none', resize: 'none', outline: 'none', fontSize: '15px' }}
                  placeholder="파츠 내용을 입력하세요. 중괄호 두 개를 사용하여 변수를 정의할 수 있습니다. (예: {{이름}})"
                  value={body}
                  maxLength={700}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>

            {/* 우측 변수 정의 영역 */}
            <div className="preview-panel" style={{ width: '300px' }}>
              <div className="preview-head">
                <div className="preview-head__bar">Variable Definitions</div>
              </div>
              <div style={{ padding: '16px' }}>
                {variables.length === 0 ? (
                   <div className="preview-empty" style={{ margin: 0, padding: 0 }}>감지된 변수가 없습니다.</div>
                ) : (
                  <ul style={{ paddingLeft: '20px' }}>
                    {variables.map(v => (
                      <li key={v} style={{ marginBottom: '8px' }}>
                        <span style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>{v}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="dashed-section" style={{ marginTop: '20px' }}>
            <div className="dashed-section__head">
              <p className="dashed-section__title">태그</p>
              <p className="dashed-section__count">{tags.length} / 10</p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {tags.map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
                  #{t}
                  <button onClick={() => removeTag(t)} style={{ marginLeft: '8px', color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px' }}>&times;</button>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="태그 입력 후 추가 (공백은 _로 자동 변환)" 
                value={tagInput}
                maxLength={30}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', width: '250px' }}
              />
              <button className="btn btn--secondary" type="button" onClick={handleAddTag}>
                <Image src="/assets/icon-plus-sm.svg" alt="" width={16} height={16} />
                <span>추가</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
