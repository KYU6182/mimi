import "server-only";

export type HomeEvent = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  tone?: "pink" | "beige" | "rose" | "ivory";
};

export async function getHomeEvents(): Promise<HomeEvent[]> {
  return [
    {
      id: "revival-entry",
      label: "募集中",
      title: "mimi復活号メンバー募集",
      description:
        "フォロワーが多くなくても、モデル経験がなくても大丈夫。mimi girlsとして復活号に参加しよう。",
      href: "/entry",
      cta: "エントリーする",
      tone: "pink"
    },
    {
      id: "cover-contest",
      label: "開催中",
      title: "表紙モデル決定戦",
      description: "今月の表紙候補をランキングで決定。応援数で表紙掲載チャンスが広がります。",
      href: "/ranking",
      cta: "ランキングを見る",
      tone: "rose"
    },
    {
      id: "fukuoka-feature",
      label: "地域特集",
      title: "福岡mimi girls特集",
      description: "福岡から見つかる、淡色カフェ系mimi girlsをピックアップ。",
      href: "/girls?region=%E7%A6%8F%E5%B2%A1",
      cta: "福岡の子を見る",
      tone: "ivory"
    },
    {
      id: "cafe-work",
      label: "MODEL限定",
      title: "カフェPRモデル募集",
      description: "mimi girls限定で、カフェPRや撮影案件に応募できます。",
      href: "/works",
      cta: "お仕事を見る",
      tone: "beige"
    }
  ];
}
