import Image from "next/image";
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
              <Image src={latest.coverImageUrl} alt={latest.title} fill priority className="object-cover" sizes="178px" />
            </div>
            <div className="space-y-2 py-1">
              <p className="text-xs font-black text-rose">最新号</p>
              <h1 className="font-logo text-3xl leading-tight text-ink">{latest.title}</h1>
              <p className="text-sm font-bold leading-6 text-ink">{latest.description}</p>
              {latest.articles.map((article) => (
                <div key={article.id} className="flex gap-2 rounded-2xl bg-rose-mist/50 p-2">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-paper">
                    <Image src={article.thumbnailUrl} alt={article.title} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-rose">{article.category}</p>
                    <p className="line-clamp-2 text-[11px] font-bold leading-snug text-ink">{article.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-3">
          <SectionTitle title="back number" />
          {issues.map((issue) => (
            <div key={issue.id} className="mimi-card flex gap-3 rounded-[22px] p-3">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl bg-rose-mist">
                <Image src={issue.coverImageUrl} alt={issue.title} fill className="object-cover" sizes="64px" />
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
      </div>
    </AppShell>
  );
}
