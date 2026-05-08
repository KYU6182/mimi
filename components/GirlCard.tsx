import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import type { GirlCardData } from "@/lib/data";
import TagPill from "@/components/TagPill";
import { splitTags } from "@/lib/utils";
import FavoriteButton from "@/components/FavoriteButton";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";

export default function GirlCard({
  girl,
  index,
  showActions = false,
  initialFavorite = false,
  isLoggedIn = false
}: {
  girl: GirlCardData;
  index?: number;
  showActions?: boolean;
  initialFavorite?: boolean;
  isLoggedIn?: boolean;
}) {
  const tags = splitTags(girl.styleTags).slice(0, 2);
  const isNew = typeof index === "number" && [0, 3, 6].includes(index);

  return (
    <article className="mimi-card overflow-hidden rounded-[20px] bg-paper p-2">
      <Link href={`/girls/${girl.slug}`} className="grid grid-cols-[68px_1fr] gap-2 min-[390px]:grid-cols-[74px_1fr]">
        <div className="relative min-h-[110px] overflow-hidden rounded-[16px] bg-rose-mist min-[390px]:min-h-[116px]">
          {girl.mainImageUrl ? (
            <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="origin-top scale-[1.35] object-cover" sizes="90px" />
          ) : (
            <MimiImagePlaceholder className="size-full" />
          )}
          {isNew ? (
            <span className="absolute left-1.5 top-1.5 rounded-full bg-rose px-1.5 py-0.5 text-[9px] font-black text-white">
              NEW
            </span>
          ) : null}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-paper to-transparent" />
        </div>
        <div className="min-w-0 py-0.5">
          <p className="truncate text-[14px] font-black leading-5 text-ink">{girl.displayName}</p>
          <p className="text-[11px] font-bold text-muted">{girl.region}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <TagPill key={tag} className="px-2 py-0.5 text-[10px]">
                {tag}
              </TagPill>
            ))}
          </div>
          <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-rose">
            <Heart size={13} fill="currentColor" />
            {girl._count.votes}
          </span>
          <span className="mt-2 flex origin-left scale-[0.94] items-center gap-0.5 whitespace-nowrap text-[9.5px] font-black text-muted min-[390px]:scale-100">
            プロフィールを見る
            <ChevronRight size={11} className="text-rose" />
          </span>
        </div>
      </Link>
      {showActions ? (
        <div className="mt-2">
          <FavoriteButton
            modelProfileId={girl.id}
            initialFavorite={initialFavorite}
            isLoggedIn={isLoggedIn}
            compact
            path="/girls"
          />
        </div>
      ) : null}
    </article>
  );
}
