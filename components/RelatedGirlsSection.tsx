import Link from "next/link";
import GirlCard from "@/components/GirlCard";
import type { GirlCardData } from "@/lib/data";

export default function RelatedGirlsSection({
  region,
  girls
}: {
  region: string;
  girls: GirlCardData[];
}) {
  if (!girls.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between px-1">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rose">related</p>
          <h2 className="font-logo text-[23px] leading-tight text-ink">同じ{region}のmimi girls</h2>
        </div>
        <Link href="/girls" className="text-xs font-black text-rose">
          もっと見る
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {girls.map((girl, index) => (
          <GirlCard key={girl.id} girl={girl} index={index} />
        ))}
      </div>
    </section>
  );
}
