import Link from "next/link";
import { Flame, Heart, Sparkles, TrendingUp } from "lucide-react";
import type { VoteActivityItem } from "@/lib/vote-activity";

const iconMap = {
  vote: Heart,
  ranking: Flame,
  milestone: Sparkles
};

export default function VoteActivityLog({ activities }: { activities: VoteActivityItem[] }) {
  return (
    <article className="rounded-[22px] border border-line bg-paper p-3 shadow-card">
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-sm font-black text-ink">リアルタイム投票ログ</h3>
        <span className="mimi-live-badge rounded-full border border-rose bg-rose px-2.5 py-1 text-[10px] font-black text-white">
          LIVE
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type] ?? TrendingUp;
          const content = (
            <span
              className={[
                "flex min-h-10 items-center gap-2 rounded-2xl border border-line bg-rose-mist/70 px-3 py-2 text-[11px] font-black text-ink",
                index === 0 ? "mimi-float-in" : ""
              ].join(" ")}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-paper text-rose">
                <Icon size={13} fill={activity.type === "vote" ? "currentColor" : "none"} />
              </span>
              <span>{activity.message}</span>
            </span>
          );
          return activity.modelSlug ? (
            <Link key={activity.id} href={`/girls/${activity.modelSlug}`}>
              {content}
            </Link>
          ) : (
            <div key={activity.id}>{content}</div>
          );
        })}
      </div>
    </article>
  );
}
