import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HomeImageHero() {
  return (
    <section className="overflow-hidden bg-[#fff8f7]">
      <Image
        src="/images/home/fv04.png"
        alt="mimi復活号メンバー募集"
        width={941}
        height={1178}
        priority
        className="block h-auto w-full object-contain"
        sizes="430px"
      />
      <div className="-mt-px bg-[#fff8f7] px-3 pb-6 min-[390px]:px-4">
        <Image
          src="/images/home/fv03.png"
          alt="mimi girls参加メリット"
          width={970}
          height={142}
          className="block h-auto w-full object-contain"
          sizes="430px"
        />
        <p className="mt-5 text-center text-[13px] font-black tracking-[0.18em] text-[#ef6f91]">
          ＼ 簡単エントリーでOK！ ／
        </p>
        <Link
          href="/entry"
          aria-label="エントリーして参加する"
          className="mt-3 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#f784a1_0%,#e95b84_100%)] px-5 text-[15px] font-black tracking-[0.08em] text-white shadow-[0_12px_24px_rgba(233,91,132,0.30)] transition hover:brightness-[1.02] min-[390px]:h-[58px] min-[390px]:text-[16px]"
        >
          <span className="whitespace-nowrap">エントリーして参加する</span>
          <ChevronRight size={20} strokeWidth={2.4} className="shrink-0" />
        </Link>
      </div>
    </section>
  );
}
