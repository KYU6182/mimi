"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Scissors } from "lucide-react";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import { salonPartnersByRegion } from "@/lib/home-data";
import { cn } from "@/lib/utils";

const regions = ["東京", "大阪", "名古屋", "福岡"];

export default function SalonPartnersSection() {
  const [active, setActive] = useState("東京");
  const salons = salonPartnersByRegion[active] ?? [];

  return (
    <section>
      <SectionTitle eyebrow="提携アーカイブ" title="提携サロン" href="/works" />
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
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {salons.map((salon) => (
            <Link key={salon.name} href="/works" className="rounded-[20px] border border-line bg-paper p-2">
              <div className="relative mb-2 h-[88px] overflow-hidden rounded-2xl bg-rose-mist sm:h-[96px]">
                <Image src={salon.imageUrl} alt={salon.name} fill className="object-cover" sizes="180px" />
              </div>
              <p className="line-clamp-1 text-xs font-black text-ink">{salon.name}</p>
              <div className="mt-1 flex items-center justify-between text-[10px] font-bold text-muted">
                <span className="inline-flex items-center gap-1">
                  <Scissors size={11} />
                  {salon.category}
                </span>
                <span>{salon.area}</span>
              </div>
              <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-black text-rose">
                詳細を見る
                <ChevronRight size={12} />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
