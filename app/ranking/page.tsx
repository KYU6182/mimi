import Link from "next/link";
import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import RankingCard from "@/components/RankingCard";
import SectionTitle from "@/components/SectionTitle";
import {
  getCoverCandidateRanking,
  getNewcomerRanking,
  getOverallRanking,
  getRegionalRanking,
  getRisingRanking
} from "@/lib/rankings";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "ランキング | mimi",
  description: "mimi girlsの総合・新人・急上昇・地域別ランキングをチェックできます。"
};

const tabs = [
  ["overall", "総合"],
  ["new", "新人"],
  ["rising", "急上昇"],
  ["region", "地域別"],
  ["cover", "表紙候補"]
] as const;

export default async function RankingPage({
  searchParams
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const active = params.tab ?? "overall";
  const ranking =
    active === "new"
      ? await getNewcomerRanking()
      : active === "rising"
        ? await getRisingRanking()
        : active === "region"
          ? await getRegionalRanking(undefined, "福岡")
          : active === "cover"
            ? await getCoverCandidateRanking()
            : await getOverallRanking();
  const first = ranking[0];

  return (
    <AppShell>
      <Header title="ランキング" centered />
      <div className="space-y-5 px-4 py-5">
        <SectionTitle eyebrow="daily update" title="ランキング" />
        <div className="mimi-scrollbar flex gap-2 overflow-x-auto rounded-[22px] border border-line bg-paper p-2 shadow-card">
          {tabs.map(([key, label]) => (
            <Link
              key={key}
              href={`/ranking?tab=${key}`}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-black",
                active === key ? "bg-rose text-white" : "bg-rose-mist/60 text-muted"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <p className="text-center text-[11px] font-bold text-rose">毎日0時に更新</p>
        {first ? <RankingCard girl={first} large /> : null}
        <div className="space-y-2">
          {ranking.slice(1).map((girl) => (
            <RankingCard key={girl.id} girl={girl} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
