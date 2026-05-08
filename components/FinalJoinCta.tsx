import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FinalJoinCta() {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-rose-soft bg-rose p-4 pb-6 text-white shadow-soft sm:p-5 sm:pb-6">
      <div className="absolute -bottom-5 right-2 flex -space-x-5 opacity-95 sm:right-3">
        {["/images/girls/yuina.png", "/images/girls/mio.png", "/images/girls/sakura.png"].map((src) => (
          <div key={src} className="relative size-[76px] overflow-hidden rounded-[22px] border-2 border-white/80 bg-paper shadow-card sm:size-[86px] sm:rounded-[24px]">
            <Image src={src} alt="mimi girls" fill className="object-cover" sizes="86px" />
          </div>
        ))}
      </div>
      <div className="relative z-10 max-w-[238px] sm:max-w-[260px]">
        <p className="text-[11px] font-black tracking-[0.12em] text-white/85">ENTRY</p>
        <h2 className="mt-2 text-[20px] font-black leading-[1.45] sm:text-[23px]">
          mimi girlsに参加して、
          <br />
          あなたの“好き”を仕事や
          <br />
          夢につなげよう♡
        </h2>
        <Link
          href="/entry"
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-rose"
        >
          エントリーする
          <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
}
