"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Crown, Heart } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { coverContestRanking } from "@/lib/home-data";
import { cn } from "@/lib/utils";

const tabs = ["今月", "先月", "ALL"];

function medal(rank: number) {
  if (rank === 1) return "bg-[#F2C66D]";
  if (rank === 2) return "bg-greige";
  if (rank === 3) return "bg-[#C58D6C]";
  return "bg-rose-soft";
}

export default function CoverModelContestSection() {
  const [active, setActive] = useState("今月");

  return (
    <section>
      <SectionTitle eyebrow="cover contest" title="表紙モデル決定戦" href="/ranking?tab=cover" />
      <article className="mimi-card overflow-hidden rounded-[28px]">
        <div className="relative min-h-[148px] bg-rose-mist p-4 sm:min-h-[150px]">
          <div className="relative z-10 max-w-[205px] sm:max-w-[215px]">
            <p className="inline-flex items-center gap-1 rounded-full bg-paper px-3 py-1 text-[11px] font-black text-rose">
              <Crown size={13} fill="currentColor" />
              開催中！
            </p>
            <h3 className="mt-3 text-xl font-black leading-snug text-ink">表紙モデル決定戦 開催中！</h3>
            <p className="mt-2 text-xs font-bold leading-6 text-muted">
              次の表紙は誰の手に？上位に入ると雑誌の表紙に♡
            </p>
            <Link href="/ranking?tab=cover" className="mt-3 inline-flex h-9 items-center gap-1 rounded-full bg-rose px-4 text-xs font-black text-white">
              投票する
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="absolute bottom-3 right-2 flex -space-x-5 sm:right-3">
            {coverContestRanking.slice(0, 3).map((girl) => (
              <div key={girl.handle} className="relative size-[68px] overflow-hidden rounded-[20px] border-2 border-paper bg-paper shadow-soft sm:size-20 sm:rounded-[22px]">
                <Image src={girl.imageUrl} alt={girl.handle} fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-3">
          <div className="mb-3 grid grid-cols-3 gap-2 rounded-full bg-rose-mist/65 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(
                  "h-8 rounded-full text-xs font-black transition",
                  active === tab ? "bg-paper text-rose shadow-sm" : "text-muted"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="space-y-1.5">
            {coverContestRanking.map((girl) => (
              <Link key={girl.handle} href={`/girls/${girl.slug}`} className="flex items-center gap-2 rounded-2xl bg-paper px-2 py-1.5">
                <span className={cn("grid size-6 place-items-center rounded-full text-[10px] font-black text-white", medal(girl.rank))}>
                  {girl.rank}
                </span>
                <div className="relative size-8 overflow-hidden rounded-xl bg-rose-mist">
                  <Image src={girl.imageUrl} alt={girl.handle} fill className="object-cover" sizes="32px" />
                </div>
                <p className="min-w-0 flex-1 truncate text-xs font-black text-ink">{girl.handle}</p>
                <p className="inline-flex items-center gap-1 text-xs font-black text-rose">
                  <Heart size={12} fill="currentColor" />
                  {girl.votes.toLocaleString()}
                </p>
                <ChevronRight size={14} className="text-muted" />
              </Link>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
