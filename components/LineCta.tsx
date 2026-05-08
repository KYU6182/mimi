import Link from "next/link";
import { Bell, Gift, Heart, Star } from "lucide-react";
import { lineUrl } from "@/lib/utils";

const benefits = [
  { icon: Bell, title: "推し通知", body: "推しのランキングUPや新着情報をお届け" },
  { icon: Gift, title: "限定情報", body: "LINE限定の募集やプレゼントをお知らせ" },
  { icon: Heart, title: "応援・投票", body: "投票できるタイミングを忘れずチェック" },
  { icon: Star, title: "お気に入り登録", body: "推し登録したmimi girlsの近況を受け取れます" }
];

export default function LineCta() {
  return (
    <article className="mimi-card rounded-[26px] p-5 text-center">
      <p className="font-logo text-[26px] leading-tight text-ink">LINEでつながって、</p>
      <p className="mb-4 text-sm font-bold text-ink">もっと推し活を楽しもう♡</p>
      <div className="mb-5 space-y-2 text-left">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-3 rounded-2xl border border-line bg-paper p-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-rose-mist text-rose">
                <Icon size={18} />
              </span>
              <span>
                <span className="block text-xs font-black text-rose">{item.title}</span>
                <span className="block text-[11px] font-bold text-muted">{item.body}</span>
              </span>
            </div>
          );
        })}
      </div>
      <Link
        href={lineUrl}
        className="flex h-12 items-center justify-center rounded-full bg-linegreen px-5 text-sm font-black text-white shadow-soft"
      >
        LINEで友だち登録
      </Link>
    </article>
  );
}
