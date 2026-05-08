import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function FinalEntryCta() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-line bg-rose-mist/70 p-5 text-center shadow-card">
      <div className="absolute -bottom-6 -right-3 h-28 w-24 overflow-hidden rounded-[24px] border border-white/70 bg-paper opacity-90 shadow-soft">
        <Image src="/images/girls/erika.png" alt="mimi girls entry" fill className="object-cover" sizes="96px" />
      </div>
      <p className="text-xs font-bold text-rose">mimi girlsとして参加したい方はこちら</p>
      <h2 className="mt-1 font-logo text-[29px] leading-tight text-ink">普通の女の子が、誰かの推しになる場所。</h2>
      <p className="mx-auto mt-2 max-w-[280px] text-xs leading-6 text-muted">
        地域とあなたの「好き」をつなげて、WEB雑誌から一歩ずつ見つけてもらおう。
      </p>
      <Link
        href="/entry"
        className="mx-auto mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-rose px-5 text-sm font-black text-white"
      >
        無料でエントリーする
        <ChevronRight size={17} />
      </Link>
    </section>
  );
}
