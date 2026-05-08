import Link from "next/link";

export type GrowthRecord = {
  date: string;
  body: string;
};

export default function GrowthRecordTimeline({ records }: { records: GrowthRecord[] }) {
  return (
    <section id="growth" className="space-y-3 scroll-mt-20">
      <div className="flex items-end justify-between px-1">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rose">growth</p>
          <h2 className="font-logo text-[23px] leading-tight text-ink">成長記録</h2>
        </div>
        <Link href="#growth" className="text-xs font-black text-rose">
          もっと見る
        </Link>
      </div>

      <div className="rounded-[22px] border border-line bg-paper p-4 shadow-[0_8px_18px_rgba(96,72,74,0.05)]">
        <div className="relative space-y-4 pl-5">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-rose-soft" />
          {records.map((record) => (
            <div key={`${record.date}-${record.body}`} className="relative">
              <span className="absolute -left-[23px] top-1.5 size-3 rounded-full border-2 border-paper bg-rose shadow-sm" />
              <time className="text-[11px] font-black text-muted">{record.date}</time>
              <p className="mt-1 text-sm font-bold leading-6 text-ink">{record.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
