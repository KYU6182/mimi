import Link from "next/link";
import type { SupportComment, User } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import CommentForm from "@/components/CommentForm";

type CommentWithUser = SupportComment & { user: User };

function formatDate(date: Date) {
  return date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
}

export default function SupportCommentsSection({
  comments,
  modelProfileId,
  path
}: {
  comments: CommentWithUser[];
  modelProfileId: string;
  path: string;
}) {
  return (
    <section id="comments" className="space-y-3 scroll-mt-20">
      <div className="flex items-end justify-between px-1">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rose">comments</p>
          <h2 className="font-logo text-[23px] leading-tight text-ink">応援コメント</h2>
        </div>
        <Link href="#comments" className="text-xs font-black text-rose">
          もっと見る
        </Link>
      </div>

      <CommentForm modelProfileId={modelProfileId} path={path} />

      {comments.length ? (
        <div className="space-y-2">
          {comments.slice(0, 3).map((comment) => (
            <article key={comment.id} className="rounded-[18px] border border-line bg-paper p-3">
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="truncate text-xs font-black text-rose">{comment.user.nickname ?? "mimi fan"}</p>
                <time className="shrink-0 text-[10px] font-bold text-muted">{formatDate(comment.createdAt)}</time>
              </div>
              <p className="text-sm font-bold leading-6 text-ink">{comment.body}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-line bg-paper p-5 text-center">
          <div className="mx-auto mb-3 grid size-11 place-items-center rounded-full bg-rose-mist text-rose">
            <MessageCircle size={20} />
          </div>
          <p className="text-sm font-black text-ink">まだ応援コメントはありません。</p>
          <p className="mt-1 text-xs font-bold leading-6 text-muted">最初の応援コメントを送ってみよう♡</p>
        </div>
      )}
    </section>
  );
}
