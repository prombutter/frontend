import Image from "next/image";

/** 목록 화면 상단의 검색 입력줄. */
export function SearchBar({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="searchbar">
      <Image src="/assets/icon-search.svg" alt="" width={24} height={24} />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
