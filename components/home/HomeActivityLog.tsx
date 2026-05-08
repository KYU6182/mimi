import Link from "next/link";
import { Crown, Heart, MessageCircle, Sparkles, TrendingUp, UserPlus } from "lucide-react";
import type { HomeActivityLog as HomeActivityLogItem } from "@/lib/activity";
import { cn } from "@/lib/utils";

const iconMap = {
  vote: Heart,
  favorite: Heart,
  comment: MessageCircle,
  ranking: TrendingUp,
  cover: Crown,
  join: UserPlus
};

const colorMap = {
  vote: "bg-rose text-white",
  favorite: "bg-rose-mist text-rose",
  comment: "bg-white text-rose",
  ranking: "bg-beige text-ink",
  cover: "bg-[#F8D994] text-ink",
  join: "bg-rose-soft text-white"
};

function LogRow({ log, index }: { log: HomeActivityLogItem; index: number }) {
  const Icon = iconMap[log.type];
  const content = (
    <>
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full border border-white/70",
          colorMap[log.type],
          index === 0 && "mimi-float-in"
        )}
      >
        <Icon size={15} strokeWidth={2.3} />
      </span>
      <span className="min-w-0 flex-1 text-[12px] font-bold leading-relaxed text-ink">{log.text}</span>
      <span className="shrink-0 text-[10px] font-bold text-muted">{log.createdAtLabel ?? "今日"}</span>
    </>
  );

  const className = cn(
    "flex min-h-12 items-center gap-2.5 rounded-[18px] border border-rose-soft/55 bg-rose-mist/55 px-3 py-2",
    index === 0 && "bg-white shadow-soft"
  );

  if (log.href) {
    return (
      <Link href={log.href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function HomeActivityLog({ logs }: { logs: HomeActivityLogItem[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between px-1">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose">mimi live log</p>
          <h2 className="font-logo text-[24px] leading-tight text-ink">リアルタイム応援ログ</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            mimi girlsへの応援が
            <br />
            今日も少しずつ届いています。
          </p>
        </div>
        <span className="mimi-live-badge inline-flex items-center gap-1 rounded-full border border-rose-soft bg-white px-3 py-1 text-[10px] font-black text-rose">
          <Sparkles size={12} />
          LIVE
        </span>
      </div>

      <div className="mimi-card rounded-[26px] p-3">
        <div className="space-y-2">
          {logs.length ? (
            logs.slice(0, 8).map((log, index) => <LogRow key={log.id} log={log} index={index} />)
          ) : (
            <div className="rounded-[20px] border border-line bg-white p-4 text-center text-sm leading-relaxed text-muted">
              応援ログはこれから表示されます。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
