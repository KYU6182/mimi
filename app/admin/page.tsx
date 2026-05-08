import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Check,
  Eye,
  EyeOff,
  FileText,
  Home,
  MessageCircle,
  Pencil,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import {
  createMagazineArticleAction,
  createMagazineIssueAction,
  createWorkOpportunityAction,
  setModelPublishedAction,
  toggleCoverContestActiveAction,
  toggleWorkOpportunityActiveAction,
  updateSupportCommentStatusAction,
  updateWorkApplicationStatusAction,
  updateWorkOpportunityAction
} from "@/lib/admin-actions";
import { getAdminDashboardData } from "@/lib/admin";
import { requireAdmin } from "@/lib/auth";
import { splitTags, workCategoryLabel } from "@/lib/utils";

export const metadata = {
  title: "mimi 管理画面 | mimi",
  description: "mimiのモデル承認、PR案件、雑誌、コメントを管理します。"
};

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function formatInputDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function applicationStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: "確認中",
    ACCEPTED: "採用",
    REJECTED: "見送り"
  };
  return labels[status] ?? status;
}

function commentStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: "確認中",
    APPROVED: "表示中",
    REJECTED: "非表示"
  };
  return labels[status] ?? status;
}

function AdminSection({
  title,
  icon,
  children,
  id
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="rounded-[26px] border border-line bg-white p-4 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-full bg-rose-mist text-rose">{icon}</span>
        <h2 className="text-lg font-black text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function AdminButton({
  children,
  tone = "pink"
}: {
  children: React.ReactNode;
  tone?: "pink" | "paper" | "danger";
}) {
  const toneClass =
    tone === "pink"
      ? "bg-rose text-white"
      : tone === "danger"
        ? "bg-[#f7e4e7] text-rose"
        : "border border-line bg-paper text-muted";
  return (
    <button className={`h-9 rounded-full px-3 text-[11px] font-black ${toneClass}`}>
      {children}
    </button>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="h-10 w-full rounded-2xl border border-line bg-paper px-3 text-xs font-bold outline-none" />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="min-h-20 w-full rounded-2xl border border-line bg-paper px-3 py-2 text-xs font-bold outline-none" />;
}

function CategorySelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <select name="category" defaultValue={defaultValue ?? "CAFE"} className="h-10 w-full rounded-2xl border border-line bg-paper px-3 text-xs font-bold outline-none">
      <option value="CAFE">カフェPR</option>
      <option value="SALON">サロンモデル</option>
      <option value="NAIL">ネイル</option>
      <option value="APPAREL">アパレル</option>
      <option value="COSMETIC">コスメ</option>
      <option value="MODEL">撮影モデル</option>
      <option value="OTHER">その他</option>
    </select>
  );
}

export default async function AdminPage() {
  await requireAdmin();
  const data = await getAdminDashboardData();
  const {
    stats,
    pendingModelProfiles,
    models,
    works,
    applications,
    issues,
    articles,
    comments,
    contests
  } = data;

  const kpis = [
    ["公開中モデル", stats.publishedModels],
    ["確認待ちモデル", stats.pendingModels],
    ["総ユーザー数", stats.totalUsers],
    ["総投票数", stats.totalVotes],
    ["総推し登録数", stats.totalFavorites],
    ["未確認コメント", stats.pendingComments],
    ["募集中PR案件", stats.activeWorks],
    ["PR応募数", stats.totalApplications]
  ];

  return (
    <main className="min-h-screen bg-ivory px-4 py-6 text-ink">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[30px] border border-line bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-logo text-4xl text-rose">mimi</p>
              <h1 className="mt-1 text-2xl font-black text-ink">mimi 管理画面</h1>
              <p className="mt-2 text-sm font-bold text-muted">モデル承認、案件、雑誌、コメントを管理できます。</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                ["/", "HOMEを見る"],
                ["/girls", "モデル一覧を見る"],
                ["/ranking", "ランキングを見る"],
                ["/works", "お仕事ページを見る"],
                ["/magazine", "雑誌ページを見る"],
                ["/mypage", "マイページを見る"]
              ].map(([href, label]) => (
                <Link key={href} href={href} className="rounded-full border border-line bg-paper px-3 py-2 text-xs font-black text-muted">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map(([label, value]) => (
            <div key={label} className="rounded-[22px] border border-line bg-white p-4 shadow-card">
              <p className="text-[11px] font-black text-muted">{label}</p>
              <p className="mt-2 text-2xl font-black text-rose">{Number(value).toLocaleString()}</p>
            </div>
          ))}
        </section>

        <AdminSection id="pending-models" title="確認待ちモデル" icon={<ShieldCheck size={18} />}>
          {pendingModelProfiles.length ? (
            <div className="grid gap-3 md:grid-cols-2">
              {pendingModelProfiles.map((model) => (
                <article key={model.id} className="rounded-[22px] border border-line bg-paper p-3">
                  <div className="flex gap-3">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-rose-mist">
                      {model.mainImageUrl ? (
                        <Image src={model.mainImageUrl} alt={model.displayName} fill className="object-cover" sizes="80px" />
                      ) : (
                        <MimiImagePlaceholder className="size-full" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-ink">{model.displayName}</p>
                      <p className="text-xs font-bold text-muted">{model.region} / @{model.instagram || "未設定"}</p>
                      <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-muted">{model.reason}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {splitTags(model.styleTags).slice(0, 4).map((tag) => (
                          <span key={tag} className="rounded-full bg-rose-mist px-2 py-0.5 text-[10px] font-black text-rose">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-muted">登録日 {formatDate(model.createdAt)}</span>
                    <form action={setModelPublishedAction.bind(null, model.id, true)}>
                      <AdminButton>公開する</AdminButton>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-[18px] bg-paper p-4 text-sm font-bold text-muted">確認待ちモデルはありません。</p>
          )}
        </AdminSection>

        <AdminSection id="models" title="モデル一覧" icon={<Users size={18} />}>
          <div className="grid gap-3">
            {models.map((model) => (
              <article key={model.id} className="rounded-[20px] border border-line bg-paper p-3">
                <div className="grid gap-3 md:grid-cols-[72px_1fr_auto] md:items-center">
                  <div className="relative size-[72px] overflow-hidden rounded-2xl bg-rose-mist">
                    {model.mainImageUrl ? (
                      <Image src={model.mainImageUrl} alt={model.displayName} fill className="object-cover" sizes="72px" />
                    ) : (
                      <MimiImagePlaceholder className="size-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-black text-ink">{model.displayName}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${model.isPublished ? "bg-rose text-white" : "bg-greige/30 text-muted"}`}>
                        {model.isPublished ? "公開中" : "確認中"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-muted">
                      slug: {model.slug} / {model.region} / {model._count.votes}票 / 推し {model._count.favorites}人 / 登録 {formatDate(model.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={setModelPublishedAction.bind(null, model.id, !model.isPublished)}>
                      <AdminButton tone={model.isPublished ? "paper" : "pink"}>
                        {model.isPublished ? "非公開にする" : "公開する"}
                      </AdminButton>
                    </form>
                    {model.isPublished ? (
                      <Link href={`/girls/${model.slug}`} className="flex h-9 items-center gap-1 rounded-full border border-line bg-white px-3 text-[11px] font-black text-muted">
                        <Eye size={13} />
                        プロフィール
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection id="works" title="PR案件管理" icon={<Sparkles size={18} />}>
          <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
            <form action={createWorkOpportunityAction} className="space-y-2 rounded-[22px] border border-line bg-paper p-3">
              <p className="text-sm font-black text-ink">PR案件作成</p>
              <TextInput name="title" placeholder="案件タイトル" />
              <CategorySelect />
              <TextInput name="region" placeholder="地域" defaultValue="福岡" />
              <TextInput name="rewardText" placeholder="報酬 / 特典テキスト" />
              <TextInput name="imageUrl" placeholder="/images/works/cafe.png" defaultValue="/images/works/cafe.png" />
              <TextInput name="deadline" type="date" />
              <TextArea name="description" placeholder="説明" />
              <label className="flex items-center gap-2 text-xs font-black text-muted">
                <input type="checkbox" name="isActive" defaultChecked />
                公開する
              </label>
              <AdminButton>PR案件を作成する</AdminButton>
              <p className="text-[10px] font-bold text-muted">画像は public/images 配下のパスを入力してください。</p>
            </form>

            <div className="space-y-3">
              {works.map((work) => (
                <form key={work.id} action={updateWorkOpportunityAction} className="grid gap-2 rounded-[20px] border border-line bg-paper p-3 md:grid-cols-2">
                  <input type="hidden" name="id" value={work.id} />
                  <TextInput name="title" defaultValue={work.title} />
                  <CategorySelect defaultValue={work.category} />
                  <TextInput name="region" defaultValue={work.region} />
                  <TextInput name="rewardText" defaultValue={work.rewardText ?? ""} placeholder="報酬 / 特典" />
                  <TextInput name="imageUrl" defaultValue={work.imageUrl} />
                  <TextInput name="deadline" type="date" defaultValue={formatInputDate(work.deadline)} />
                  <div className="md:col-span-2">
                    <TextArea name="description" defaultValue={work.description} />
                  </div>
                  <label className="flex items-center gap-2 text-xs font-black text-muted">
                    <input type="checkbox" name="isActive" defaultChecked={work.isActive} />
                    {work.isActive ? "公開中" : "非公開"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <AdminButton>保存する</AdminButton>
                    <button
                      formAction={toggleWorkOpportunityActiveAction.bind(null, work.id, !work.isActive)}
                      className="h-9 rounded-full border border-line bg-white px-3 text-[11px] font-black text-muted"
                    >
                      {work.isActive ? "非公開にする" : "公開する"}
                    </button>
                    <Link href={`/works/${work.id}`} className="flex h-9 items-center rounded-full border border-line bg-white px-3 text-[11px] font-black text-muted">
                      詳細
                    </Link>
                  </div>
                  <p className="text-[10px] font-bold text-muted md:col-span-2">応募数 {work._count.applications}件</p>
                </form>
              ))}
            </div>
          </div>
        </AdminSection>

        <AdminSection id="applications" title="PR応募一覧" icon={<Pencil size={18} />}>
          <div className="space-y-2">
            {applications.map((application) => {
              const profile = application.user.modelProfile;
              return (
                <article key={application.id} className="rounded-[18px] border border-line bg-paper p-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-black text-ink">{application.workOpportunity.title}</p>
                      <p className="text-xs font-bold text-muted">
                        応募者: {profile?.displayName ?? application.user.nickname ?? application.user.email} / {profile?.region ?? application.user.region ?? "地域未設定"} / {workCategoryLabel(application.workOpportunity.category)} / {formatDate(application.createdAt)}
                      </p>
                      <p className="mt-1 text-[11px] font-black text-rose">ステータス: {applicationStatusLabel(application.status)}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <form action={updateWorkApplicationStatusAction.bind(null, application.id, "PENDING")}>
                        <AdminButton tone="paper">確認中</AdminButton>
                      </form>
                      <form action={updateWorkApplicationStatusAction.bind(null, application.id, "ACCEPTED")}>
                        <AdminButton>採用</AdminButton>
                      </form>
                      <form action={updateWorkApplicationStatusAction.bind(null, application.id, "REJECTED")}>
                        <AdminButton tone="danger">見送り</AdminButton>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </AdminSection>

        <AdminSection id="magazine" title="雑誌管理" icon={<BookOpen size={18} />}>
          <div className="grid gap-4 lg:grid-cols-2">
            <form action={createMagazineIssueAction} className="space-y-2 rounded-[22px] border border-line bg-paper p-3">
              <p className="text-sm font-black text-ink">雑誌号作成</p>
              <TextInput name="title" placeholder="mimi vol.13" />
              <TextInput name="slug" placeholder="mimi-vol-13" />
              <TextInput name="coverImageUrl" defaultValue="/images/magazine/vol12.png" />
              <TextInput name="publishedAt" type="date" />
              <TextArea name="description" placeholder="説明文" />
              <AdminButton>雑誌号を作成する</AdminButton>
            </form>
            <form action={createMagazineArticleAction} className="space-y-2 rounded-[22px] border border-line bg-paper p-3">
              <p className="text-sm font-black text-ink">記事作成</p>
              <select name="issueId" className="h-10 w-full rounded-2xl border border-line bg-paper px-3 text-xs font-bold outline-none">
                {issues.map((issue) => (
                  <option key={issue.id} value={issue.id}>{issue.title}</option>
                ))}
              </select>
              <TextInput name="title" placeholder="記事タイトル" />
              <TextInput name="slug" placeholder="natural-makeup-2026" />
              <TextInput name="category" placeholder="巻頭特集" />
              <TextInput name="thumbnailUrl" defaultValue="/images/girls/sakura.png" />
              <TextArea name="body" placeholder="本文" />
              <AdminButton>記事を作成する</AdminButton>
            </form>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-black text-ink">雑誌号一覧</p>
              {issues.map((issue) => (
                <div key={issue.id} className="rounded-[18px] border border-line bg-paper p-3">
                  <p className="text-sm font-black text-ink">{issue.title}</p>
                  <p className="text-xs font-bold text-muted">{issue.slug} / {formatDate(issue.publishedAt)} / 記事 {issue._count.articles}件</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-black text-ink">記事一覧</p>
              {articles.map((article) => (
                <div key={article.id} className="rounded-[18px] border border-line bg-paper p-3">
                  <p className="text-sm font-black text-ink">{article.title}</p>
                  <p className="text-xs font-bold text-muted">{article.issue.title} / {article.category} / {formatDate(article.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </AdminSection>

        <AdminSection id="comments" title="応援コメント管理" icon={<MessageCircle size={18} />}>
          <div className="space-y-2">
            {comments.map((comment) => (
              <article key={comment.id} className="rounded-[18px] border border-line bg-paper p-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-black text-rose">{comment.modelProfile.displayName} / {comment.user.nickname ?? comment.user.email}</p>
                    <p className="mt-1 break-words text-sm font-bold leading-6 text-ink">{comment.body}</p>
                    <p className="mt-1 text-[11px] font-black text-muted">{commentStatusLabel(comment.status)} / {formatDate(comment.createdAt)}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <form action={updateSupportCommentStatusAction.bind(null, comment.id, "APPROVED")}>
                      <AdminButton>表示する</AdminButton>
                    </form>
                    <form action={updateSupportCommentStatusAction.bind(null, comment.id, "REJECTED")}>
                      <AdminButton tone="danger">非表示</AdminButton>
                    </form>
                    <form action={updateSupportCommentStatusAction.bind(null, comment.id, "PENDING")}>
                      <AdminButton tone="paper">確認中</AdminButton>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <AdminSection id="cover" title="表紙決定戦管理" icon={<FileText size={18} />}>
          <div className="space-y-3">
            {contests.map((contest) => (
              <article key={contest.id} className="rounded-[18px] border border-line bg-paper p-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-black text-ink">{contest.title}</p>
                    <p className="text-xs font-bold text-muted">{contest.monthLabel} / エントリー {contest.entries.length}人 / {contest.isActive ? "開催中" : "停止中"}</p>
                    <p className="mt-1 text-[11px] font-bold text-muted">
                      {contest.entries.map((entry) => entry.modelProfile.displayName).join("、") || "参加モデルなし"}
                    </p>
                  </div>
                  <form action={toggleCoverContestActiveAction.bind(null, contest.id, !contest.isActive)}>
                    <AdminButton tone={contest.isActive ? "paper" : "pink"}>{contest.isActive ? "停止する" : "開催中にする"}</AdminButton>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </AdminSection>

        <footer className="rounded-[24px] border border-line bg-white p-4 shadow-card">
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="flex h-10 items-center gap-2 rounded-full bg-rose px-4 text-xs font-black text-white">
              <Home size={14} />
              HOMEを見る
            </Link>
            <Link href="/magazine" className="flex h-10 items-center gap-2 rounded-full border border-line bg-paper px-4 text-xs font-black text-muted">
              <BookOpen size={14} />
              雑誌ページを見る
            </Link>
            <Link href="/works" className="flex h-10 items-center gap-2 rounded-full border border-line bg-paper px-4 text-xs font-black text-muted">
              <EyeOff size={14} />
              お仕事ページを見る
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
