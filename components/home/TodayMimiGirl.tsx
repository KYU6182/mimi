import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Heart, MapPin, Sparkles, Target } from "lucide-react";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import TagPill from "@/components/TagPill";
import type { GirlCardData } from "@/lib/data";
import { splitTags } from "@/lib/utils";

function shortText(value: string | null | undefined, fallback: string, max = 78) {
  const text = value?.trim() || fallback;
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export default function TodayMimiGirl({ girl }: { girl: GirlCardData | null }) {
  if (!girl) {
    return (
      <section className="mimi-card rounded-[26px] p-5 text-center">
        <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-rose-mist text-rose">
          <Sparkles size={22} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose">today&apos;s pick</p>
        <h2 className="mt-1 font-logo text-[24px] text-ink">mimi girls公開準備中</h2>
        <p className="mt-2 text-sm font-bold leading-relaxed text-muted">
          編集部でエントリーを確認中です。
          <br />
          掲載されると、今日の注目mimi girlとして紹介されます。
        </p>
        <Link
          href="/entry"
          className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-rose px-5 text-xs font-black text-white shadow-soft"
        >
          mimi girlsにエントリーする
        </Link>
      </section>
    );
  }

  const tags = splitTags(girl.styleTags).slice(0, 3);
  const imageUrl = girl.mainImageUrl || girl.coverImageUrl;
  const comment = shortText(
    girl.editorComment,
    `柔らかい雰囲気と、少しずつ変わりたいという想いが魅力。${girl.region}からmimi復活号の表紙候補を目指しています。`,
    96
  );
  const reason = shortText(girl.reason, "自信がなかったけど、mimiで少しずつ変わりたい。", 62);
  const goal = shortText(girl.goal, `${girl.region}ランキングTOP5に入ること。`, 56);

  return (
    <section className="space-y-3">
      <div className="px-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rose">today&apos;s mimi girl</p>
        <h2 className="font-logo text-[25px] leading-tight text-ink">今日のmimi girl</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          今日、編集部が見つけた
          <br />
          応援したくなるmimi girl
        </p>
      </div>

      <article className="mimi-card overflow-hidden rounded-[28px] bg-paper">
        <div className="relative h-[245px] overflow-hidden bg-rose-mist">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${girl.displayName}のプロフィール写真`}
              fill
              className="object-cover"
              sizes="430px"
              priority
            />
          ) : (
            <MimiImagePlaceholder className="h-full w-full" label={girl.displayName} />
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/34 to-transparent" />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/88 px-3 py-1.5 text-[11px] font-black text-rose shadow-soft">
            <Crown size={13} />
            編集部PICK
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="min-w-0 text-white drop-shadow">
              <p className="text-[11px] font-bold">今日の注目</p>
              <h3 className="text-2xl font-black leading-tight">{girl.displayName}</h3>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold">
                <MapPin size={13} />
                {girl.region}
              </p>
            </div>
            <div className="shrink-0 rounded-2xl bg-white/90 px-3 py-2 text-center text-ink shadow-soft">
              <p className="text-lg font-black text-rose">{girl._count.votes.toLocaleString("ja-JP")}</p>
              <p className="text-[10px] font-bold text-muted">総票数</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-3.5">
          <div className="flex flex-wrap gap-1.5">
            {tags.length ? tags.map((tag) => <TagPill key={tag}>{tag}</TagPill>) : <TagPill>{girl.region}</TagPill>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border border-line bg-white px-3 py-2.5 text-center">
              <p className="text-lg font-black text-ink">{girl._count.favorites.toLocaleString("ja-JP")}</p>
              <p className="text-[10px] font-bold text-muted">推し登録者数</p>
            </div>
            <div className="rounded-2xl border border-line bg-white px-3 py-2.5 text-center">
              <p className="text-lg font-black text-ink">{Math.max(1, Math.round(girl._count.votes / 18))}</p>
              <p className="text-[10px] font-bold text-muted">今日の応援</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-rose-soft/60 bg-rose-mist/60 p-3">
            <div className="mb-2 flex items-center gap-1.5 text-[12px] font-black text-rose">
              <Sparkles size={14} />
              編集部コメント
            </div>
            <p className="text-[13px] leading-relaxed text-ink">{comment}</p>
          </div>

          <div className="space-y-2">
            <div className="rounded-[20px] border border-line bg-white p-3">
              <div className="mb-1 flex items-center gap-1.5 text-[12px] font-black text-ink">
                <Heart size={14} className="text-rose" />
                mimiを始めた理由
              </div>
              <p className="text-[13px] leading-relaxed text-muted">{reason}</p>
            </div>
            <div className="rounded-[20px] border border-line bg-white p-3">
              <div className="mb-1 flex items-center gap-1.5 text-[12px] font-black text-ink">
                <Target size={14} className="text-rose" />
                今月の目標
              </div>
              <p className="text-[13px] leading-relaxed text-muted">{goal}</p>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Link
              href={`/girls/${girl.slug}`}
              className="flex h-11 items-center justify-center rounded-full bg-rose px-4 text-[13px] font-black text-white shadow-soft"
            >
              プロフィールを見る
            </Link>
            <Link
              href={`/girls/${girl.slug}`}
              className="flex h-11 items-center justify-center gap-1 rounded-full border border-rose-soft bg-white px-4 text-[13px] font-black text-rose"
            >
              応援
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
