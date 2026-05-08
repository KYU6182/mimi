import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import TagPill from "@/components/TagPill";
import { homeWorks } from "@/lib/home-data";

const tabs = ["モデル", "PR案件", "動画・配信", "アンバサダー"];

export default function WorksSection() {
  return (
    <section>
      <SectionTitle eyebrow="works" title="お仕事・PR募集" href="/works" />
      <div className="mimi-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab, index) => (
          <TagPill key={tab} active={index === 0}>
            {tab}
          </TagPill>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {homeWorks.map((work) => (
          <Link key={work.title} href="/works" className="mimi-card overflow-hidden rounded-[22px]">
            <div className="relative h-[96px] bg-rose-mist sm:h-[105px]">
              <Image src={work.imageUrl} alt={work.title} fill className="object-cover" sizes="190px" />
              <span className="absolute left-2 top-2 rounded-full bg-paper/90 px-2 py-1 text-[10px] font-black text-rose">
                {work.category}
              </span>
            </div>
            <div className="p-2.5 sm:p-3">
              <p className="text-[13px] font-black leading-snug text-ink sm:text-sm">{work.title}</p>
              <p className="mt-1 text-[11px] font-bold text-muted">{work.subtitle}</p>
              <p className="mt-2 rounded-full bg-rose-mist px-2 py-1 text-[10px] font-black text-rose">
                {work.reward}
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-muted">
                <span>{work.deadline}</span>
                <ChevronRight size={13} className="text-rose" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
