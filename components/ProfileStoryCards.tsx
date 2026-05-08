import { Flag, Heart, PenLine, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { GirlCardData } from "@/lib/data";
import TagPill from "@/components/TagPill";
import { splitTags } from "@/lib/utils";

const fallbackReason =
  "自分に自信がなくて、ずっと自分のことが好きになれませんでした。でも、mimiを通して誰かに見つけてもらい、少しずつ変わりたいと思いました。";
const fallbackGoal = "地域ランキングTOP10入り！そしていつか、mimiの特集に選ばれることが目標です。";

function StoryCard({
  title,
  body,
  icon
}: {
  title: string;
  body: ReactNode;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-[20px] border border-line bg-paper p-4 shadow-[0_8px_18px_rgba(96,72,74,0.05)]">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-black text-rose">{title}</p>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rose-mist text-rose">{icon}</span>
      </div>
      <div className="text-sm font-bold leading-7 text-ink">{body}</div>
    </article>
  );
}

export default function ProfileStoryCards({ girl }: { girl: GirlCardData }) {
  const interests = splitTags(girl.interestTags).length
    ? splitTags(girl.interestTags)
    : [...splitTags(girl.styleTags), "カフェ巡り", "淡色コーデ"].slice(0, 4);

  return (
    <section id="profile" className="space-y-3 scroll-mt-20">
      <StoryCard title="mimiを始めた理由" icon={<Heart size={17} />} body={girl.reason || fallbackReason} />
      <StoryCard title="今月の目標" icon={<Flag size={17} />} body={girl.goal || fallbackGoal} />
      <StoryCard
        title="好きなもの"
        icon={<Sparkles size={17} />}
        body={
          <div className="flex flex-wrap gap-1.5">
            {interests.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        }
      />
      <StoryCard
        title="編集部コメント"
        icon={<PenLine size={17} />}
        body={
          girl.editorComment ||
          `柔らかな雰囲気と、まっすぐな想いが魅力の${girl.displayName}ちゃん。その一歩一歩の成長を、編集部も全力で応援しています！`
        }
      />
    </section>
  );
}
