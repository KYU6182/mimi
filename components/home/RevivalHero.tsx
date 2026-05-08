import Image from "next/image";
import Link from "next/link";
import { BookOpen, Camera, ChevronRight, Heart } from "lucide-react";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import { cn } from "@/lib/utils";

export type RevivalHeroGirl = {
  id: string;
  displayName: string;
  slug: string;
  mainImageUrl?: string | null;
  coverImageUrl?: string | null;
  region?: string | null;
};

const collageSlots = [
  {
    className: "left-[-22px] top-8 h-[188px] w-[196px] -rotate-[7deg] min-[390px]:h-[212px] min-[390px]:w-[216px]",
    tape: "left-12 -top-4 w-24 rotate-[5deg]"
  },
  {
    className: "right-[-22px] top-4 h-[196px] w-[178px] rotate-[7deg] min-[390px]:h-[218px] min-[390px]:w-[196px]",
    tape: "left-10 -top-4 w-28 -rotate-[7deg]"
  },
  {
    className: "bottom-10 left-[-20px] h-[168px] w-[172px] rotate-[5deg] min-[390px]:h-[188px] min-[390px]:w-[190px]",
    tape: "left-4 -top-3 w-20 -rotate-[8deg]"
  },
  {
    className: "bottom-7 right-[-18px] h-[174px] w-[174px] -rotate-[6deg] min-[390px]:h-[194px] min-[390px]:w-[190px]",
    tape: "right-7 -top-3 w-20 rotate-[9deg]"
  }
];

const benefits = [
  {
    icon: BookOpen,
    text: "mimi復活号に\n掲載されるチャンス♡"
  },
  {
    icon: Camera,
    text: "あなたの魅力をPRできる\n特集やSNSで紹介♡"
  },
  {
    icon: Heart,
    text: "同じ夢を持つ女の子と\nつながれる♡"
  }
];

function heroImage(girl?: RevivalHeroGirl) {
  return girl?.mainImageUrl || girl?.coverImageUrl || null;
}

function PhotoCard({
  girl,
  index
}: {
  girl?: RevivalHeroGirl;
  index: number;
}) {
  const src = heroImage(girl);
  const slot = collageSlots[index];

  return (
    <div className={cn("absolute overflow-visible", slot.className)}>
      <div className={cn("absolute z-20 h-8 rounded-sm bg-[#f6bac8]/75 shadow-sm", slot.tape)} />
      <div className="relative h-full w-full overflow-hidden border-[8px] border-white bg-white shadow-[0_18px_32px_rgba(96,72,74,0.17)]">
        {src ? (
          <Image
            src={src}
            alt={girl?.displayName ?? "mimi girl"}
            fill
            priority={index < 2}
            className="object-cover"
            sizes="220px"
          />
        ) : (
          <MimiImagePlaceholder className="h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-paper/16 via-transparent to-white/6" />
      </div>
    </div>
  );
}

function AvatarRow({ girls }: { girls: RevivalHeroGirl[] }) {
  const avatars = girls.slice(0, 6);
  return (
    <div className="flex min-w-0 items-center">
      {avatars.map((girl, index) => {
        const src = heroImage(girl);
        return (
          <Link
            href={`/girls/${girl.slug}`}
            key={girl.id}
            className={cn(
              "relative size-11 shrink-0 overflow-hidden rounded-full border-[3px] border-white bg-rose-mist shadow-[0_8px_18px_rgba(96,72,74,0.12)] min-[390px]:size-[50px]",
              index ? "-ml-2.5" : ""
            )}
            aria-label={`${girl.displayName}のプロフィールを見る`}
          >
            {src ? (
              <Image src={src} alt={girl.displayName} fill className="object-cover" sizes="50px" />
            ) : (
              <MimiImagePlaceholder className="h-full w-full rounded-full" label="mimi" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function RevivalHero({
  girls,
  participantCount
}: {
  girls: RevivalHeroGirl[];
  participantCount: number;
}) {
  const collageGirls = girls.slice(0, 4);
  const currentDate = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return (
    <section className="relative overflow-hidden bg-[#fff8f7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,233,239,0.95),transparent_170px),radial-gradient(circle_at_88%_28%,rgba(243,198,207,0.35),transparent_150px),linear-gradient(180deg,#fff8f7_0%,#fbf6f3_100%)]" />

      <div className="relative min-h-[790px] overflow-hidden px-4 pb-5 pt-3 min-[390px]:min-h-[835px] min-[390px]:px-5">
        <div className="relative mx-auto h-[500px] max-w-[390px] min-[390px]:h-[540px]">
          {collageSlots.map((_, index) => (
            <PhotoCard key={index} girl={collageGirls[index]} index={index} />
          ))}

          <div className="absolute left-[22px] top-[146px] z-30 text-[44px] font-black leading-none text-[#f36a8c] drop-shadow-[0_2px_0_white] min-[390px]:left-[28px] min-[390px]:top-[164px]">
            ♡♡
          </div>
          <p className="absolute right-2 top-[238px] z-30 rotate-[-11deg] font-logo text-[25px] italic text-[#f36a8c] drop-shadow-[0_1px_0_white] min-[390px]:top-[258px]">
            my story
          </p>
          <div className="absolute bottom-[94px] right-1 z-30 text-[42px] text-[#f36a8c] drop-shadow-[0_2px_0_white]">
            ♡
          </div>

          <div className="absolute left-1/2 top-[112px] z-40 grid size-[92px] -translate-x-1/2 -rotate-[8deg] place-items-center rounded-[42%] border-[3px] border-white bg-[linear-gradient(145deg,#f7a7bb,#dc6f8b)] text-center text-white shadow-[0_16px_26px_rgba(217,121,140,0.28)] min-[390px]:top-[128px] min-[390px]:size-[102px]">
            <span className="font-logo text-[21px] leading-[1.15] min-[390px]:text-[23px]">
              mimi
              <br />
              復活♡
            </span>
          </div>

          <div className="absolute left-1/2 top-[218px] z-40 w-[288px] -translate-x-1/2 bg-paper px-6 py-8 text-center shadow-[0_18px_38px_rgba(96,72,74,0.2)] [clip-path:polygon(3%_6%,98%_0,96%_19%,100%_38%,96%_58%,99%_83%,92%_96%,70%_92%,51%_99%,35%_93%,9%_97%,0_82%,4%_62%,0_41%,5%_24%)] min-[390px]:top-[235px] min-[390px]:w-[316px] min-[390px]:px-7 min-[390px]:py-9">
            <p className="font-logo text-[23px] leading-none tracking-[0.08em] text-ink min-[390px]:text-[25px]">
              mimi復活号メンバー
            </p>
            <h1 className="mt-2 font-logo text-[76px] leading-none text-[#e76f91] min-[390px]:text-[86px]">
              募集
            </h1>
            <p className="mt-5 whitespace-pre-line text-[13px] font-bold leading-[2.05] tracking-[0.08em] text-ink min-[390px]:text-[14px]">
              {"mimi girlsに参加して、\nmimi復活号に掲載されよう♡"}
            </p>
          </div>
        </div>

        <div className="relative z-50 -mt-5 rounded-[30px] border border-white/80 bg-paper/96 p-4 shadow-[0_18px_42px_rgba(96,72,74,0.13)] min-[390px]:-mt-3 min-[390px]:rounded-[34px] min-[390px]:p-5">
          <div className="mb-4 text-center">
            <p className="text-[18px] font-black tracking-[0.12em] text-ink min-[390px]:text-[20px]">
              全国の <span className="font-logo text-[24px] tracking-[0.18em] text-[#f36a8c]">mimi girls</span> 参加中
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <AvatarRow girls={girls} />
            <div className="shrink-0 rounded-[22px] border border-[#f5dde4] bg-[linear-gradient(180deg,#fff,#ffe9ef)] px-4 py-3 text-center shadow-[0_10px_22px_rgba(217,121,140,0.11)]">
              <p className="text-[11px] font-black text-[#e76f91]">参加者数</p>
              <p className="mt-1 text-[25px] font-black leading-none tracking-[0.04em] text-[#e76f91]">
                {participantCount.toLocaleString("ja-JP")}
                <span className="text-sm">人</span>
              </p>
            </div>
          </div>
          <p className="mt-2 text-right text-[10px] font-bold text-muted">※{currentDate}現在</p>

          <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-[24px] border border-[#f5dde4] bg-[#fff8f7]">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.text}
                  className={cn(
                    "flex min-h-[118px] flex-col items-center justify-center gap-3 px-2 py-4 text-center",
                    index ? "border-l border-dashed border-[#f3b8c7]" : ""
                  )}
                >
                  <Icon size={31} strokeWidth={1.8} className="text-[#f36a8c]" />
                  <p className="whitespace-pre-line text-[11px] font-black leading-[1.8] text-ink min-[390px]:text-[12px]">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-center text-[14px] font-black tracking-[0.18em] text-[#f36a8c]">
            ＼ 簡単エントリーでOK！ ／
          </p>
          <Link
            href="/entry"
            className="mt-3 flex h-[62px] w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(180deg,#f98aa5_0%,#e9547e_100%)] px-5 text-[20px] font-black tracking-[0.1em] text-white shadow-[0_14px_26px_rgba(233,84,126,0.34)] transition hover:brightness-[1.02] min-[390px]:h-[68px] min-[390px]:text-[23px]"
          >
            エントリーして参加する
            <ChevronRight size={26} strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}
