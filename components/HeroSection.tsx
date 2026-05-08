import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="relative h-[390px] sm:h-[410px]">
        <Image
          src="/images/hero-clean-v2.png"
          alt="mimi hero"
          fill
          priority
          className="object-cover object-top"
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/15 via-paper/20 to-paper" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 sm:px-6 sm:pb-7">
          <p className="mb-4 whitespace-pre-line text-[18px] font-bold leading-[1.58] text-ink drop-shadow-sm sm:text-[21px] sm:leading-[1.68]">
            {"まだ有名じゃない、\nかわいいあの子を見つける\nWEB雑誌。"}
          </p>
          <div className="space-y-2.5 sm:space-y-3">
            <Link
              href="/entry"
              className="flex h-11 items-center justify-center rounded-full bg-rose px-5 text-[13px] font-bold text-white shadow-soft sm:h-12 sm:text-sm"
            >
              mimi girlsに参加する
            </Link>
            <Link
              href="/girls"
              className="flex h-11 items-center justify-center gap-3 rounded-full border border-rose bg-paper/88 px-5 text-[13px] font-bold text-ink sm:h-12 sm:text-sm"
            >
              推しを見つける
              <Search size={17} className="text-rose" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
