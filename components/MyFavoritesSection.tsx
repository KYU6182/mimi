import Image from "next/image";
import Link from "next/link";
import type { Favorite, ModelProfile } from "@prisma/client";
import { ChevronRight, Heart } from "lucide-react";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import SectionTitle from "@/components/SectionTitle";
import TagPill from "@/components/TagPill";
import { splitTags } from "@/lib/utils";

type FavoriteGirl = ModelProfile & {
  _count: {
    votes: number;
    favorites: number;
  };
};

type FavoriteItem = Favorite & {
  modelProfile: FavoriteGirl;
};

function formatFavoriteDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export default function MyFavoritesSection({ favorites }: { favorites: FavoriteItem[] }) {
  return (
    <section>
      <SectionTitle title="推し登録したmimi girls" href="/girls" />
      {favorites.length ? (
        <div className="space-y-3">
          {favorites.map((favorite) => {
            const girl = favorite.modelProfile;
            const tags = splitTags(girl.styleTags).slice(0, 3);
            return (
              <article key={favorite.id} className="mimi-card rounded-[22px] p-2.5">
                <div className="flex gap-3">
                  <Link href={`/girls/${girl.slug}`} className="relative size-[86px] shrink-0 overflow-hidden rounded-[18px] bg-rose-mist">
                    {girl.mainImageUrl ? (
                      <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="86px" />
                    ) : (
                      <MimiImagePlaceholder className="size-full" />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1 py-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href={`/girls/${girl.slug}`} className="truncate text-sm font-black text-ink">
                          {girl.displayName}
                        </Link>
                        <p className="mt-0.5 text-xs font-bold text-muted">{girl.region}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-rose-mist px-2 py-1 text-[10px] font-black text-rose">
                        {formatFavoriteDate(favorite.createdAt)}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <TagPill key={tag} className="px-2 py-0.5 text-[10px]">
                          {tag}
                        </TagPill>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose">
                        <Heart size={13} fill="currentColor" />
                        {girl._count.favorites.toLocaleString()}人が推し登録
                      </span>
                      <Link href={`/girls/${girl.slug}`} className="inline-flex items-center gap-0.5 text-[11px] font-black text-muted">
                        プロフィールを見る
                        <ChevronRight size={12} className="text-rose" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[22px] border border-line bg-paper p-4 text-center shadow-card">
          <p className="text-sm font-black text-ink">まだ推し登録したmimi girlはいません。</p>
          <p className="mt-2 text-xs font-bold leading-6 text-muted">
            気になる子を見つけて、プロフィールから推し登録してみよう♡
          </p>
          <Link
            href="/girls"
            className="mx-auto mt-4 flex h-10 max-w-[180px] items-center justify-center rounded-full bg-rose px-4 text-xs font-black text-white"
          >
            推しを見つける
          </Link>
        </div>
      )}
    </section>
  );
}
