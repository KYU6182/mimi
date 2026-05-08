import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarHeart, ChevronRight, Instagram, MessageCircle } from "lucide-react";
import { homeGuideCards } from "@/lib/home-data";

const iconMap = {
  event: CalendarHeart,
  instagram: Instagram,
  guide: BookOpen,
  line: MessageCircle
};

export default function HomeGuideCards() {
  return (
    <section className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {homeGuideCards.map((card) => {
        const Icon = iconMap[card.tone];
        return (
          <Link key={card.title} href={card.href} className="mimi-card overflow-hidden rounded-[22px]">
            <div className="relative h-[84px] bg-rose-mist sm:h-[90px]">
              <Image src={card.imageUrl} alt={card.title} fill className="object-cover" sizes="190px" />
              <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-paper text-rose shadow-sm">
                <Icon size={16} />
              </span>
            </div>
            <div className="p-2.5 sm:p-3">
              <p className="text-[13px] font-black leading-snug text-ink sm:text-sm">{card.title}</p>
              <p className="mt-1 line-clamp-2 text-[11px] font-bold leading-5 text-muted">{card.description}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-rose">
                {card.button}
                <ChevronRight size={13} />
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
