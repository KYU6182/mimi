import Image from "next/image";
import { Camera, MapPin, Trophy } from "lucide-react";
import type { GirlCardData } from "@/lib/data";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import TagPill from "@/components/TagPill";
import ProfileStats from "@/components/ProfileStats";
import { profileCoverUrl } from "@/lib/girls";
import { splitTags } from "@/lib/utils";

export default function ProfileHero({
  girl,
  regionRank,
  publicationCount
}: {
  girl: GirlCardData;
  regionRank: number | null;
  publicationCount: number;
}) {
  const tags = [...splitTags(girl.styleTags), ...splitTags(girl.interestTags)].slice(0, 5);

  return (
    <section className="overflow-hidden rounded-b-[28px] border-b border-line bg-paper shadow-card">
      <div className="relative h-[210px] overflow-hidden bg-rose-mist">
        {girl.coverImageUrl ? (
          <Image
            src={profileCoverUrl(girl.coverImageUrl)}
            alt={`${girl.displayName}のカバー画像`}
            fill
            priority
            className="object-cover object-top"
            sizes="430px"
          />
        ) : (
          <MimiImagePlaceholder className="size-full" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="relative px-4 pb-4">
        <div className="-mt-12 flex items-end gap-3">
          <div className="relative size-[94px] shrink-0 overflow-hidden rounded-full border-4 border-paper bg-rose-mist shadow-card">
            {girl.mainImageUrl ? (
              <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="94px" />
            ) : (
              <MimiImagePlaceholder className="size-full rounded-full" label="mimi" />
            )}
            <span className="absolute bottom-1 right-0 grid size-7 place-items-center rounded-full border-2 border-paper bg-rose text-white">
              <Camera size={14} />
            </span>
          </div>

          <div className="min-w-0 flex-1 pb-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[23px] font-black leading-tight text-ink">{girl.displayName}</h1>
              <span className="text-rose">◆</span>
            </div>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-muted">
              <MapPin size={13} />
              {girl.region}
            </p>
          </div>

          <div className="mb-1 shrink-0 rounded-2xl border border-rose-soft bg-rose-mist px-3 py-2 text-center text-xs font-black text-rose shadow-sm">
            <span className="inline-flex items-center gap-1">
              <Trophy size={13} fill="currentColor" />
              {girl.region}
            </span>
            <br />
            {regionRank ?? "-"}位
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>

        <div className="mt-4">
          <ProfileStats votes={girl._count.votes} favorites={girl._count.favorites} works={publicationCount} />
        </div>
      </div>
    </section>
  );
}
