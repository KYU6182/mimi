import Link from "next/link";
import { ArrowRight, CalendarDays, Camera, Crown, MapPin } from "lucide-react";
import type { HomeEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

const toneClasses = {
  pink: "border-rose-soft bg-rose-mist/75",
  beige: "border-beige bg-[#FFF7F2]",
  rose: "border-rose-soft bg-white",
  ivory: "border-line bg-paper"
};

const iconClasses = {
  pink: "bg-rose text-white",
  beige: "bg-beige text-ink",
  rose: "bg-rose-mist text-rose",
  ivory: "bg-white text-rose"
};

const icons = [SparkEventIcon, Crown, MapPin, Camera];

function SparkEventIcon({ size = 18, className }: { size?: number; className?: string }) {
  return <CalendarDays size={size} className={className} />;
}

export default function HomeMonthlyEvents({ events }: { events: HomeEvent[] }) {
  return (
    <section className="space-y-3">
      <div className="px-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose">monthly event</p>
        <h2 className="font-logo text-[24px] leading-tight text-ink">今月のイベント</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">今月参加できる企画をチェックしよう。</p>
      </div>

      <div className="mimi-scrollbar -mx-3.5 flex gap-3 overflow-x-auto px-3.5 pb-1 min-[390px]:-mx-4 min-[390px]:px-4">
        {events.map((event, index) => {
          const tone = event.tone ?? "pink";
          const Icon = icons[index % icons.length];
          return (
            <Link
              key={event.id}
              href={event.href}
              className={cn(
                "mimi-card flex min-h-[198px] w-[245px] shrink-0 flex-col rounded-[24px] border p-4",
                toneClasses[tone]
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-black text-rose">
                  {event.label}
                </span>
                <span className={cn("grid size-9 place-items-center rounded-full", iconClasses[tone])}>
                  <Icon size={17} />
                </span>
              </div>

              <h3 className="text-[15px] font-black leading-snug text-ink">{event.title}</h3>
              <p className="mt-2 flex-1 text-[12px] leading-relaxed text-muted">{event.description}</p>

              <span className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-[12px] font-black text-rose shadow-soft">
                {event.cta}
                <ArrowRight size={14} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
