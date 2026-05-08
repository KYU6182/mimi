"use client";

import { Search } from "lucide-react";

export default function GirlsSearchBar({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">名前・地域で検索</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="名前・地域で検索"
        className="h-12 w-full rounded-[18px] border border-line bg-paper pl-11 pr-4 text-[13px] font-bold text-ink shadow-[0_8px_18px_rgba(96,72,74,0.06)] outline-none transition placeholder:text-muted/65 focus:border-rose focus:ring-4 focus:ring-rose-mist"
      />
    </label>
  );
}
