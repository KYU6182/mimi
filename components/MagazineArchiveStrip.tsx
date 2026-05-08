import Image from "next/image";
import Link from "next/link";
import type { MagazineArchiveItem } from "@/lib/home-data";

export default function MagazineArchiveStrip({ archives }: { archives: MagazineArchiveItem[] }) {
  return (
    <div className="rounded-[20px] border border-line bg-rose-mist/45 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-black text-ink">過去の雑誌アーカイブ</p>
        <Link href="/magazine" className="text-[11px] font-black text-rose">
          もっと見る &gt;
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {archives.map((archive) => (
          <Link key={archive.volume} href="/magazine" className="group">
            <div className="relative mb-1 h-[92px] overflow-hidden rounded-[14px] border border-line bg-paper shadow-sm">
              <Image src={archive.imageUrl} alt={archive.volume} fill className="object-cover" sizes="96px" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 to-transparent px-2 py-1">
                <p className="font-logo text-[15px] leading-none text-white">{archive.volume}</p>
              </div>
            </div>
            <p className="truncate text-[10px] font-bold text-muted">{archive.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
