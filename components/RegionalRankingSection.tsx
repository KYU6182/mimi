"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Crown } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { regionalRankings } from "@/lib/home-data";
import { cn } from "@/lib/utils";

const regions = ["東京", "大阪", "名古屋", "福岡"];

function badgeClass(rank: number) {
  if (rank === 1) return "bg-[#F2C66D] text-white";
  if (rank === 2) return "bg-greige text-white";
  return "bg-[#E2AA9C] text-white";
}

export default function RegionalRankingSection() {
  const [active, setActive] = useState("東京");
  const ranking = regionalRankings[active] ?? [];

  return (
    <section>
      <SectionTitle eyebrow="local ranking" title="地域別ランキング" href="/ranking" />
      <div className="mimi-card rounded-[26px] p-3">
        <div className="mimi-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActive(region)}
              className={cn(
                "h-9 shrink-0 rounded-full border px-5 text-xs font-black transition",
                active === region ? "border-rose bg-rose text-white" : "border-line bg-paper text-muted"
              )}
            >
              {region}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {ranking.map((girl) => (
            <Link
              key={`${active}-${girl.rank}`}
              href={`/girls/${girl.slug}`}
              className="flex items-center gap-2.5 rounded-[18px] border border-line bg-paper p-2 sm:gap-3"
            >
              <span className={cn("grid size-7 place-items-center rounded-full text-xs font-black", badgeClass(girl.rank))}>
                {girl.rank}
              </span>
              <div className="relative size-12 overflow-hidden rounded-2xl bg-rose-mist">
                <Image src={girl.imageUrl} alt={girl.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-black text-ink sm:text-sm">{girl.name}</p>
                <p className="text-[11px] font-bold text-muted">{active}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-black text-ink sm:text-sm">{girl.votes.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-muted">票</p>
              </div>
              {girl.rank === 1 ? <Crown size={16} className="text-[#D9A748]" fill="currentColor" /> : <ChevronRight size={16} className="text-muted" />}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
