"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Crown, Flame, Sparkles } from "lucide-react";
import { useState } from "react";
import type { HomeRankingPreview, RankingItem } from "@/lib/rankings";
import { cn } from "@/lib/utils";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";

const tabs = [
  { key: "overall", label: "総合モデルランキング", icon: Crown },
  { key: "rising", label: "急上昇ランキング", icon: Flame },
  { key: "newcomer", label: "新人ランキング", icon: Sparkles }
] as const;

function rankColor(rank: number) {
  if (rank === 1) return "bg-[#F2C66D] text-white";
  if (rank === 2) return "bg-greige text-white";
  if (rank === 3) return "bg-[#E2AA9C] text-white";
  return "bg-rose-mist text-rose";
}

function RankingRow({ item }: { item: RankingItem }) {
  return (
    <Link
      href={`/girls/${item.slug}`}
      className="group flex items-center gap-2 rounded-[18px] border border-line bg-paper px-2.5 py-2 transition hover:-translate-y-0.5 hover:shadow-soft sm:gap-2.5"
    >
      <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-black", rankColor(item.rank))}>
        {item.rank}
      </span>
      <div className="relative size-12 shrink-0 overflow-hidden rounded-2xl bg-rose-mist">
        {item.mainImageUrl ? (
          <Image src={item.mainImageUrl} alt={item.displayName} fill className="object-cover" sizes="48px" />
        ) : (
          <MimiImagePlaceholder className="size-full" />
        )}
        {item.rank === 1 ? (
          <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-white text-[#D9A748] shadow-sm">
            <Crown size={12} fill="currentColor" />
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[13px] font-black text-ink sm:text-sm">{item.displayName}</p>
          <p className="shrink-0 text-[11px] font-bold text-muted">{item.region}</p>
        </div>
        {item.deltaText ? (
          <p className="mt-0.5 text-[10px] font-black text-rose">{item.deltaText}</p>
        ) : null}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[13px] font-black tabular-nums text-ink sm:text-sm">{item.voteCount.toLocaleString()}</p>
        <p className="text-[10px] font-bold text-muted">票</p>
      </div>
      <ChevronRight size={16} className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-rose" />
    </Link>
  );
}

export default function RankingPreview({ rankings }: { rankings: HomeRankingPreview }) {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("overall");
  const activeItems = rankings[active];

  return (
    <article className="rounded-[26px] border border-line bg-paper/95 p-3 shadow-card">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rose">ranking</p>
          <h2 className="font-logo text-[23px] leading-tight text-ink sm:text-[25px]">ランキングプレビュー</h2>
        </div>
        <Link href="/ranking" className="text-xs font-black text-rose">
          もっと見る &gt;
        </Link>
      </div>
      <div className="mimi-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const selected = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={cn(
                "flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[11px] font-black transition",
                selected
                  ? "border-rose bg-rose text-white shadow-soft"
                  : "border-line bg-paper text-muted hover:border-rose-soft hover:text-rose"
              )}
            >
              <Icon size={14} fill={tab.key === "rising" && selected ? "currentColor" : "none"} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {activeItems.slice(0, 3).map((item) => (
          <RankingRow key={`${active}-${item.id}`} item={item} />
        ))}
      </div>
    </article>
  );
}
