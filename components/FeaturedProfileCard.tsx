import Image from "next/image";
import Link from "next/link";
import type { GirlCardData } from "@/lib/data";
import ProfileStats from "@/components/ProfileStats";
import TagPill from "@/components/TagPill";
import VoteButton from "@/components/VoteButton";
import { splitTags } from "@/lib/utils";

export default function FeaturedProfileCard({
  girl,
  hasVoted,
  isSelf,
  isLoggedIn = true
}: {
  girl: GirlCardData;
  hasVoted?: boolean;
  isSelf?: boolean;
  isLoggedIn?: boolean;
}) {
  return (
    <article className="mimi-card overflow-hidden rounded-[28px]">
      <Link href={`/girls/${girl.slug}`} className="relative block h-[235px] bg-rose-mist">
        <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="390px" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/48 to-transparent p-4 pt-14 text-white">
          <p className="text-2xl font-black">{girl.displayName}</p>
          <p className="text-sm font-bold">{girl.region}</p>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {splitTags(girl.styleTags).slice(0, 4).map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        <p className="text-sm leading-7 text-ink">{girl.bio}</p>
        <ProfileStats votes={girl._count.votes} favorites={girl._count.favorites} />
        <VoteButton
          modelProfileId={girl.id}
          initialVoted={Boolean(hasVoted)}
          isSelf={Boolean(isSelf)}
          isLoggedIn={isLoggedIn}
          path={`/girls/${girl.slug}`}
        />
      </div>
    </article>
  );
}
