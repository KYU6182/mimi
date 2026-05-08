import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import WorkCard from "@/components/WorkCard";
import { getCurrentUser } from "@/lib/auth";
import { getActiveWorkOpportunities, getAppliedWorkOpportunityIds } from "@/lib/works";
import { cn, workCategoryLabel } from "@/lib/utils";

const tabs = [
  ["all", "すべて"],
  ["CAFE", "カフェ"],
  ["SALON", "サロン"],
  ["APPAREL", "アパレル"],
  ["COSMETIC", "コスメ"],
  ["NAIL", "ネイル"]
] as const;

export const metadata = {
  title: "お仕事・PR応募 | mimi",
  description: "mimi girls限定で、カフェPR、サロンモデル、美容、アパレルなどのお仕事情報を掲載しています。"
};

function WorksLockCard({ isUser }: { isUser: boolean }) {
  return (
    <section className="mimi-card overflow-hidden rounded-[28px]">
      <div className="bg-rose-mist/70 px-5 py-6 text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-paper text-rose shadow-card">
          <Lock size={22} />
        </div>
        <h1 className="mt-4 text-lg font-black leading-8 text-ink">
          お仕事・PR応募の内容は、
          <br />
          mimi girlsのみ閲覧できます
        </h1>
        <p className="mt-3 text-xs font-bold leading-6 text-muted">
          mimi girlsとして参加すると、PR案件・サロンモデル・撮影案件に応募できます。
          {isUser ? " mimi girls登録が必要です。" : " すでにmimi girlsの方はログインしてください。"}
        </p>
      </div>
      <div className="space-y-2 p-4">
        {!isUser ? (
          <Link
            href="/login?next=%2Fworks"
            className="flex h-11 items-center justify-center rounded-full border border-line bg-paper text-xs font-black text-muted"
          >
            ログインする
          </Link>
        ) : null}
        <Link
          href="/entry"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-rose text-sm font-black text-white shadow-soft"
        >
          <Sparkles size={16} />
          mimi girlsにエントリーする
        </Link>
      </div>
    </section>
  );
}

export default async function WorksPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [params, user] = await Promise.all([searchParams, getCurrentUser()]);
  const active = params.category ?? "all";
  const canViewWorks = user?.role === "MODEL" || user?.role === "ADMIN";
  const canApply = user?.role === "MODEL";

  if (!canViewWorks) {
    return (
      <AppShell>
        <Header title="お仕事・PR応募" centered />
        <div className="space-y-5 px-4 py-5">
          <SectionTitle eyebrow="works" title="お仕事・PR応募" />
          <p className="rounded-[22px] border border-line bg-paper p-4 text-xs font-bold leading-6 text-muted shadow-card">
            mimi girls限定で、カフェPR・サロンモデル・美容・アパレルなどのお仕事情報を掲載しています。
          </p>
          <WorksLockCard isUser={Boolean(user)} />
        </div>
      </AppShell>
    );
  }

  const [works, appliedIds] = await Promise.all([
    getActiveWorkOpportunities(active),
    user ? getAppliedWorkOpportunityIds(user.id) : Promise.resolve(new Set<string>())
  ]);

  return (
    <AppShell>
      <Header title="お仕事・PR応募" centered />
      <div className="space-y-5 px-4 py-5">
        <SectionTitle eyebrow="works" title="応募できるお仕事・PR案件" />
        <div className="rounded-[22px] border border-line bg-paper p-3 text-xs font-bold leading-6 text-muted shadow-card">
          mimi girls限定で公開中の募集です。応募結果や確認状況はマイページで確認できます。
          {active !== "all" ? ` 現在は${workCategoryLabel(active)}カテゴリを表示中。` : ""}
        </div>
        <div className="mimi-scrollbar flex gap-2 overflow-x-auto rounded-[22px] border border-line bg-paper p-2 shadow-card">
          {tabs.map(([key, label]) => (
            <Link
              key={key}
              href={`/works?category=${key}`}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-black",
                active === key ? "bg-rose text-white" : "bg-rose-mist/60 text-muted"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        {works.length ? (
          <div className="space-y-3">
            {works.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                showApplication={canApply}
                initialApplied={appliedIds.has(work.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-line bg-paper p-5 text-center shadow-card">
            <p className="text-sm font-black text-ink">現在応募できるお仕事・PR案件はありません。</p>
            <p className="mt-2 text-xs font-bold leading-6 text-muted">新しい募集が始まるまでお待ちください。</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
