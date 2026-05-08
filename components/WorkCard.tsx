import Image from "next/image";
import Link from "next/link";
import type { WorkOpportunity } from "@prisma/client";
import { ChevronRight, MapPin } from "lucide-react";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import WorkApplicationButton from "@/components/WorkApplicationButton";
import { workCategoryLabel } from "@/lib/utils";

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export default function WorkCard({
  work,
  compact = false,
  showApplication = false,
  initialApplied = false
}: {
  work: WorkOpportunity & { _count?: { applications: number } };
  compact?: boolean;
  showApplication?: boolean;
  initialApplied?: boolean;
}) {
  return (
    <article className={["mimi-card overflow-hidden rounded-[22px]", compact ? "w-[248px] shrink-0" : ""].join(" ")}>
      <div className={compact ? "p-3" : "grid gap-3 p-3"}>
        <Link href={`/works/${work.id}`} className={compact ? "block" : "grid grid-cols-[96px_1fr] gap-3"}>
          <div className="relative h-[86px] w-full overflow-hidden rounded-2xl bg-rose-mist">
            {work.imageUrl ? (
              <Image src={work.imageUrl} alt={work.title} fill className="object-cover" sizes={compact ? "248px" : "96px"} />
            ) : (
              <MimiImagePlaceholder className="size-full" />
            )}
          </div>
          <div className={compact ? "mt-2 min-w-0" : "min-w-0"}>
            <div className="mb-1 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-rose-mist px-2 py-0.5 text-[10px] font-bold text-rose">
                {workCategoryLabel(work.category)}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-muted">
                <MapPin size={10} />
                {work.region}
              </span>
            </div>
            <p className="line-clamp-2 text-sm font-black leading-snug text-ink">{work.title}</p>
            {work.description ? (
              <p className="mt-1 line-clamp-2 text-[11px] font-bold leading-5 text-muted">{work.description}</p>
            ) : null}
            {work.rewardText ? (
              <p className="mt-1 rounded-xl bg-rose-mist/60 px-2 py-1 text-[10px] font-black text-rose">{work.rewardText}</p>
            ) : null}
            <p className="mt-1 text-[10px] font-bold text-muted">締切: {formatDate(work.deadline)}</p>
          </div>
        </Link>
        {showApplication ? (
          <WorkApplicationButton workOpportunityId={work.id} initialApplied={initialApplied} compact={compact} />
        ) : (
          <Link
            href={`/works/${work.id}`}
            className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-rose px-4 text-[11px] font-black text-white"
          >
            詳細を見る <ChevronRight size={13} />
          </Link>
        )}
      </div>
    </article>
  );
}
