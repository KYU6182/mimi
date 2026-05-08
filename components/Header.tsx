import Link from "next/link";
import { Menu, Search } from "lucide-react";

export default function Header({
  title,
  centered = false,
  showSearch = false
}: {
  title?: string;
  centered?: boolean;
  showSearch?: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[58px] items-center justify-between border-b border-line/60 bg-paper/90 px-4 backdrop-blur-xl md:rounded-t-[34px]">
      <Link href="/" className="font-logo text-[29px] leading-none tracking-[0] text-ink">
        mimi
      </Link>
      {title ? (
        <p
          className={[
            "pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm font-bold text-ink",
            centered ? "" : "hidden"
          ].join(" ")}
        >
          {title}
        </p>
      ) : null}
      <div className="flex items-center gap-2 text-ink">
        {showSearch ? (
          <Link
            href="/girls"
            aria-label="探す"
            className="grid size-9 place-items-center rounded-full border border-line bg-paper"
          >
            <Search size={17} />
          </Link>
        ) : null}
        <button
          aria-label="メニュー"
          className="grid size-9 place-items-center rounded-full border border-line bg-paper"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
