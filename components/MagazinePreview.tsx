import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import type { MagazineArticle, MagazineIssue } from "@prisma/client";
import MagazineArchiveStrip from "@/components/MagazineArchiveStrip";
import type { MagazineArchiveItem } from "@/lib/home-data";

export default function MagazinePreview({
  issue,
  archives = []
}: {
  issue: (MagazineIssue & { articles: MagazineArticle[] }) | null;
  archives?: MagazineArchiveItem[];
}) {
  if (!issue) return null;
  return (
    <article className="mimi-card space-y-3 rounded-[26px] p-3">
      <div className="grid grid-cols-[132px_1fr] gap-2.5 sm:grid-cols-[145px_1fr] sm:gap-3">
        <Link href="/magazine" className="relative h-[205px] overflow-hidden rounded-[20px] bg-rose-mist sm:h-[218px]">
          {issue.coverImageUrl ? (
            <Image src={issue.coverImageUrl} alt={issue.title} fill className="object-cover" sizes="145px" />
          ) : (
            <div className="grid h-full place-items-center px-3 text-center">
              <p className="font-logo text-3xl text-rose">mimi</p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-3 text-white">
            <p className="text-[10px] font-black">最新号の表紙</p>
            <p className="font-logo text-[21px] leading-none sm:text-[24px]">{issue.title}</p>
          </div>
        </Link>
        <div className="min-w-0 py-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-rose px-2 py-0.5 text-[10px] font-black text-white">NEW</span>
            <p className="font-logo text-[22px] text-ink sm:text-2xl">mimi</p>
          </div>
          <p className="mb-2 text-[13px] font-black leading-6 text-ink sm:text-sm">
            ナチュラル透明感の
            <br />
            つくり方を大公開
          </p>
          <Link
            href="/magazine"
            className="mb-2 inline-flex h-8 items-center gap-1 rounded-full bg-rose px-3 text-[11px] font-black text-white sm:mb-3"
          >
            記事を読む
            <ChevronRight size={13} />
          </Link>
          <div className="space-y-1.5 sm:space-y-2">
            {issue.articles.slice(0, 2).map((article) => (
              <Link key={article.id} href="/magazine" className="flex gap-2 rounded-2xl bg-rose-mist/45 p-1.5 sm:p-2">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-paper sm:size-12">
                  {article.thumbnailUrl ? (
                    <Image src={article.thumbnailUrl} alt={article.title} fill className="object-cover" sizes="48px" />
                  ) : (
                    <div className="grid h-full place-items-center text-rose">
                      <BookOpen size={17} />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-rose">{article.category}</p>
                  <p className="line-clamp-2 text-[11px] font-bold leading-snug text-ink">{article.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {archives.length ? <MagazineArchiveStrip archives={archives} /> : null}
    </article>
  );
}
