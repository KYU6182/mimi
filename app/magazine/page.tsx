import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import { getMagazineIssues } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "WEB雑誌 | mimi",
  description: "mimi magazineの最新号、巻頭特集、地域代表、新人賞、編集部ピックを紹介します。"
};

export default async function MagazinePage() {
  const issues = await getMagazineIssues();
  const latest = issues[0];
  return (
    <AppShell>
      <Header />
      <div className="space-y-6 px-4 py-5">
        <SectionTitle eyebrow="web magazine" title="mimi magazine" />
        {latest ? (
          <section className="mimi-card grid grid-cols-[178px_1fr] gap-3 rounded-[28px] p-3">
            <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-rose-mist">
              {latest.coverImageUrl ? (
                <Image src={latest.coverImageUrl} alt={latest.title} fill priority className="object-cover" sizes="178px" />
              ) : (
                <div className="grid h-full place-items-center px-3 text-center">
                  <p className="font-logo text-3xl text-rose">mimi</p>
                </div>
              )}
            </div>
            <div className="space-y-2 py-1">
              <p className="text-xs font-black text-rose">最新号</p>
              <h1 className="font-logo text-3xl leading-tight text-ink">{latest.title}</h1>
              <p className="text-sm font-bold leading-6 text-ink">{latest.description}</p>
              {latest.articles.map((article) => (
                <div key={article.id} className="flex gap-2 rounded-2xl bg-rose-mist/50 p-2">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-paper">
                    {article.thumbnailUrl ? (
                      <Image src={article.thumbnailUrl} alt={article.title} fill className="object-cover" sizes="48px" />
                    ) : (
                      <div className="grid h-full place-items-center text-rose">
                        <BookOpen size={18} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-rose">{article.category}</p>
                    <p className="line-clamp-2 text-[11px] font-bold leading-snug text-ink">{article.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="mimi-card rounded-[28px] p-6 text-center">
            <div className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-rose-mist text-rose">
              <BookOpen size={24} />
            </div>
            <p className="font-logo text-[26px] text-ink">mimi復活号を準備中</p>
            <p className="mt-3 text-sm font-bold leading-7 text-muted">
              最新号と記事は編集部で制作中です。
              <br />
              掲載候補のmimi girlsも募集中です。
            </p>
            <Link
              href="/entry"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-rose px-5 text-xs font-black text-white shadow-soft"
            >
              復活号メンバーにエントリー
            </Link>
          </section>
        )}

        {issues.length ? (
          <section className="space-y-3">
            <SectionTitle title="back number" />
            {issues.map((issue) => (
              <div key={issue.id} className="mimi-card flex gap-3 rounded-[22px] p-3">
                <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-rose-mist">
                  {issue.coverImageUrl ? (
                    <Image src={issue.coverImageUrl} alt={issue.title} fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="grid h-full place-items-center text-rose">
                      <BookOpen size={18} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-logo text-2xl text-ink">{issue.title}</p>
                  <p className="text-sm font-bold text-muted">{issue.description}</p>
                  <p className="mt-1 text-[11px] font-bold text-rose">
                    巻頭特集 / 地域代表 / 新人賞 / 編集部ピック
                  </p>
                </div>
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
