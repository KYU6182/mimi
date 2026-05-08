import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import type { GirlCardData } from "@/lib/data";
import TagPill from "@/components/TagPill";
import { splitTags } from "@/lib/utils";

export default function TodayGirlCard({ girl }: { girl: GirlCardData }) {
  return (
    <Link href={`/girls/${girl.slug}`} className="mimi-card block rounded-[22px] p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold text-muted">今日のmimi girl</p>
        <span className="grid size-7 place-items-center rounded-full bg-rose-mist text-rose">
          <Crown size={14} />
        </span>
      </div>
      <div className="flex gap-3">
        <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-2xl bg-rose-mist">
          <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="92px" />
        </div>
        <div className="min-w-0 flex-1 py-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-rose px-2 py-0.5 text-[10px] font-bold text-white">NEW</span>
            <p className="truncate text-base font-bold text-ink">{girl.displayName}</p>
            <p className="text-xs font-bold text-muted">{girl.region}</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {splitTags(girl.styleTags).slice(0, 3).map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            今日の票数 <span className="text-base font-bold text-rose">{Math.max(8, Math.round(girl._count.votes / 12))}</span>票
          </p>
        </div>
      </div>
    </Link>
  );
}
