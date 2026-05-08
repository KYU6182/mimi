import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, Sparkles } from "lucide-react";
import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import WorkApplicationButton from "@/components/WorkApplicationButton";
import { getCurrentUser } from "@/lib/auth";
import { getAppliedWorkOpportunityIds, getWorkOpportunity } from "@/lib/works";
import { workCategoryLabel } from "@/lib/utils";

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function LockedDetail({ isUser }: { isUser: boolean }) {
  return (
    <AppShell>
      <Header title="お仕事・PR応募" centered />
      <div className="space-y-5 px-4 py-5">
        <section className="mimi-card overflow-hidden rounded-[28px]">
          <div className="bg-rose-mist/70 px-5 py-7 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-paper text-rose shadow-card">
              <Lock size={22} />
            </div>
            <h1 className="mt-4 text-lg font-black leading-8 text-ink">
              お仕事・PR応募の内容は、
              <br />
              mimi girlsのみ閲覧できます
            </h1>
            <p className="mt-3 text-xs font-bold leading-6 text-muted">
              {isUser
                ? "mimi girls登録が必要です。mimi girlsとして参加すると、PR案件・サロンモデル・撮影案件に応募できます。"
                : "すでにmimi girlsの方はログインしてください。これから参加したい方はエントリーから応募できます。"}
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
      </div>
    </AppShell>
  );
}

export default async function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, user] = await Promise.all([params, getCurrentUser()]);
  const canViewWork = user?.role === "MODEL" || user?.role === "ADMIN";
  const canApply = user?.role === "MODEL";
  if (!canViewWork) return <LockedDetail isUser={Boolean(user)} />;

  const work = await getWorkOpportunity(id);
  if (!work) notFound();
  const appliedIds = user ? await getAppliedWorkOpportunityIds(user.id) : new Set<string>();

  return (
    <AppShell>
      <Header title="PR案件" centered />
      <div className="space-y-5 px-4 py-5">
        <section className="mimi-card overflow-hidden rounded-[28px]">
          <div className="relative h-[230px] bg-rose-mist">
            {work.imageUrl ? (
              <Image src={work.imageUrl} alt={work.title} fill priority className="object-cover" sizes="430px" />
            ) : (
              <MimiImagePlaceholder className="size-full" />
            )}
          </div>
          <div className="space-y-3 p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-mist px-3 py-1 text-xs font-black text-rose">
                {workCategoryLabel(work.category)}
              </span>
              <span className="text-xs font-bold text-muted">{work.region}</span>
            </div>
            <h1 className="text-xl font-black leading-snug text-ink">{work.title}</h1>
            <p className="text-sm leading-7 text-ink">{work.description}</p>
            {work.rewardText ? (
              <p className="rounded-2xl bg-rose-mist/70 px-3 py-2 text-xs font-black leading-6 text-rose">
                報酬・特典: {work.rewardText}
              </p>
            ) : null}
            <p className="rounded-2xl bg-rose-mist/50 px-3 py-2 text-xs font-bold leading-6 text-muted">
              応募締切: {formatDate(work.deadline)}
              <br />
              応募数: {work._count.applications}件
            </p>
          </div>
        </section>
        {canApply ? (
          <WorkApplicationButton workOpportunityId={work.id} initialApplied={appliedIds.has(work.id)} />
        ) : (
          <div className="rounded-[22px] border border-line bg-paper p-4 text-center text-xs font-bold leading-6 text-muted shadow-card">
            管理者アカウントでは閲覧のみ可能です。応募はmimi girlsアカウントから行えます。
          </div>
        )}
      </div>
    </AppShell>
  );
}
