import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Crown, TrendingUp } from "lucide-react";
import type { RankingItem } from "@/lib/rankings";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";

export default function RankingCard({ girl, large = false }: { girl: RankingItem; large?: boolean }) {
  if (large) {
    return (
      <Link href={`/girls/${girl.slug}`} className="mimi-card block overflow-hidden rounded-[24px] p-3">
        <div className="grid grid-cols-[132px_1fr] gap-3">
          <div className="relative h-[132px] overflow-hidden rounded-[20px] bg-rose-mist">
            {girl.mainImageUrl ? (
              <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="132px" />
            ) : (
              <MimiImagePlaceholder className="size-full" />
            )}
            <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-[#F4C76D] text-sm font-black text-white">
              1
            </span>
          </div>
          <div className="py-2">
            <div className="mb-2 flex items-center gap-2">
              <Crown size={18} className="text-[#D9A748]" />
              <p className="text-lg font-black text-ink">{girl.displayName}</p>
            </div>
            <p className="text-xs font-bold text-muted">{girl.region}</p>
            <p className="mt-3 text-[28px] font-black leading-none text-ink">{girl.voteCount.toLocaleString()}</p>
            <p className="text-xs font-bold text-muted">票</p>
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-rose-mist px-2 py-1 text-[11px] font-bold text-rose">
              <TrendingUp size={13} />
              {girl.deltaText ?? "ランキング更新中"}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/girls/${girl.slug}`} className="mimi-card flex items-center gap-3 rounded-[18px] p-2.5">
      <span className="grid size-7 place-items-center rounded-full bg-rose-mist text-sm font-black text-rose">
        {girl.rank}
      </span>
      <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-rose-mist">
        {girl.mainImageUrl ? (
          <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="56px" />
        ) : (
          <MimiImagePlaceholder className="size-full" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-black text-ink">{girl.displayName}</p>
          <span className="text-[11px] font-bold text-muted">{girl.region}</span>
        </div>
        <p className="text-xs font-bold text-ink">{girl.voteCount.toLocaleString()}票</p>
        <p className="text-[10px] font-bold text-rose">
          {girl.deltaText ?? ((girl.gapToTop10 ?? 0) > 0 ? `あと${girl.gapToTop10}票でTOP10` : "TOP10入り")}
        </p>
      </div>
      <ChevronRight size={17} className="text-muted" />
    </Link>
  );
}
