import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { popularFeatures } from "@/lib/home-data";

export default function PopularFeaturesSection() {
  return (
    <section>
      <SectionTitle eyebrow="features" title="人気の特集" href="/magazine" />
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {popularFeatures.map((feature) => (
          <Link key={feature.title} href={feature.href} className="mimi-card overflow-hidden rounded-[24px]">
            <div className="relative h-[140px] bg-rose-mist sm:h-[155px]">
              <Image src={feature.imageUrl} alt={feature.title} fill className="object-cover" sizes="190px" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[10px] font-black tracking-[0.12em]">{feature.english}</p>
                <p className="mt-1 text-[13px] font-black leading-snug sm:text-sm">{feature.title}</p>
              </div>
            </div>
            <div className="flex h-10 items-center justify-center gap-1 text-[11px] font-black text-rose">
              特集を見る
              <ChevronRight size={13} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
