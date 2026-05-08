import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  LineChart,
  LogOut,
  Megaphone,
  Gift
} from "lucide-react";
import AppShell from "@/components/AppShell";
import GirlCard from "@/components/GirlCard";
import Header from "@/components/Header";
import MimiImagePlaceholder from "@/components/MimiImagePlaceholder";
import MyFavoritesSection from "@/components/MyFavoritesSection";
import ProfileEditForm from "@/components/ProfileEditForm";
import SectionTitle from "@/components/SectionTitle";
import TagPill from "@/components/TagPill";
import VoteButton from "@/components/VoteButton";
import { requireUser } from "@/lib/auth";
import {
  getGirlForOwner,
  getGirls,
  getMyApplications,
  getMyFavorites,
  getRanking,
  hasVotedToday
} from "@/lib/data";
import { db } from "@/lib/db";
import { lineUrl, splitTags, getJstDateString, workCategoryLabel } from "@/lib/utils";

export const metadata = {
  title: "マイページ | mimi",
  description: "mimiでの推し登録、応援履歴、プロフィール編集、PR案件応募履歴を確認できます。"
};

function formatDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function applicationStatusLabel(status: string) {
  const labels: Record<string, string> = {
    PENDING: "確認中",
    ACCEPTED: "採用",
    REJECTED: "見送り"
  };
  return labels[status] ?? status;
}

function MiniStatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[20px] border border-line bg-paper p-3 text-center shadow-card">
      <p className="text-[20px] font-black tabular-nums text-ink">{value}</p>
      <p className="mt-1 text-[10px] font-black text-muted">{label}</p>
    </div>
  );
}

function ModelProfileCard({
  profile,
  rank
}: {
  profile: Awaited<ReturnType<typeof getGirlForOwner>>;
  rank: number;
}) {
  if (!profile) return null;
  const tags = splitTags(profile.styleTags).slice(0, 4);
  return (
    <section className="mimi-card overflow-hidden rounded-[30px]">
      <div className="relative h-36 bg-rose-mist">
        {profile.coverImageUrl ? (
          <Image src={profile.coverImageUrl} alt={`${profile.displayName}のカバー`} fill className="object-cover" sizes="430px" />
        ) : (
          <MimiImagePlaceholder className="size-full" />
        )}
        <span className="absolute right-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-black text-rose shadow-card">
          {profile.isPublished ? "公開中" : "確認中"}
        </span>
      </div>
      <div className="-mt-10 p-4 pt-0">
        <div className="relative mb-3 size-20 overflow-hidden rounded-full border-4 border-paper bg-rose-mist">
          {profile.mainImageUrl ? (
            <Image src={profile.mainImageUrl} alt={profile.displayName} fill className="object-cover" sizes="80px" />
          ) : (
            <MimiImagePlaceholder className="size-full rounded-full" label="mimi" />
          )}
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-black text-ink">{profile.displayName}</h1>
            <p className="mt-1 text-xs font-bold text-muted">
              {profile.region} / 現在 {rank > 0 ? `${rank}位` : "集計中"}
            </p>
          </div>
          <Link href="/logout" className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted">
            <LogOut size={17} />
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
        {profile.isPublished ? (
          <Link
            href={`/girls/${profile.slug}`}
            className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-rose text-xs font-black text-white shadow-soft"
          >
            自分のページを確認する
            <ChevronRight size={15} />
          </Link>
        ) : (
          <p className="mt-4 rounded-[20px] bg-rose-mist px-3 py-3 text-xs font-bold leading-6 text-muted">
            現在、プロフィールは確認中です。公開されるとmimi girls一覧とランキングに表示されます。
          </p>
        )}
      </div>
    </section>
  );
}

function WorkApplicationsSection({
  applications
}: {
  applications: Awaited<ReturnType<typeof getMyApplications>>;
}) {
  return (
    <section>
      <SectionTitle title="応募したPR案件" href="/works" />
      <div className="space-y-2">
        {applications.length ? (
          applications.map((application) => (
            <article key={application.id} className="rounded-[20px] border border-line bg-paper p-3 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-black text-ink">{application.workOpportunity.title}</p>
                  <p className="mt-1 text-xs font-bold text-muted">
                    {workCategoryLabel(application.workOpportunity.category)} / {application.workOpportunity.region}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-muted">応募日 {formatDate(application.createdAt)}</p>
                </div>
                <span className="shrink-0 rounded-full bg-rose-mist px-3 py-1 text-[11px] font-black text-rose">
                  {applicationStatusLabel(application.status)}
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[20px] border border-line bg-paper p-4 text-center shadow-card">
            <p className="text-sm font-black text-ink">まだ応募したPR案件はありません。</p>
            <p className="mt-2 text-xs font-bold leading-6 text-muted">気になる案件に応募して、活動のきっかけを増やしましょう。</p>
            <Link href="/works" className="mx-auto mt-4 flex h-10 max-w-[190px] items-center justify-center rounded-full bg-rose text-xs font-black text-white">
              お仕事・PR募集を見る
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function PublicationHistorySection({
  isPublished,
  coverEntries
}: {
  isPublished: boolean;
  coverEntries: Array<{ id: string; contest: { title: string; monthLabel: string } }>;
}) {
  const histories = [
    isPublished ? "地域別ランキング掲載中" : null,
    coverEntries[0] ? `${coverEntries[0].contest.monthLabel} 表紙モデル決定戦 参加中` : null,
    isPublished ? "mimi girls一覧に掲載中" : "mimi復活号 掲載候補"
  ].filter(Boolean) as string[];

  return (
    <section>
      <SectionTitle title="掲載履歴" />
      {histories.length ? (
        <div className="space-y-2">
          {histories.map((history) => (
            <div key={history} className="flex items-center gap-3 rounded-[18px] border border-line bg-paper p-3 shadow-card">
              <BookOpen size={16} className="text-rose" />
              <p className="text-xs font-black text-ink">{history}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-[20px] border border-line bg-paper p-4 text-xs font-bold leading-6 text-muted shadow-card">
          まだ掲載履歴はありません。公開後、掲載履歴がここに表示されます。
        </p>
      )}
    </section>
  );
}

function PaidOfferCards() {
  return (
    <section className="grid grid-cols-2 gap-3">
      <Link href="/boost" className="rounded-[24px] bg-gradient-to-br from-rose to-[#ee9aad] p-4 text-white shadow-soft">
        <LineChart size={19} />
        <p className="mt-3 text-sm font-black">PROFILE BOOST</p>
        <p className="mt-1 text-[11px] font-bold leading-5 text-white/90">
          プロフィールを整えて掲載チャンスを広げよう。
        </p>
        <p className="mt-3 text-sm font-black">¥3,300</p>
      </Link>
      <Link href="/memory-pack" className="rounded-[24px] border border-line bg-paper p-4 text-ink shadow-card">
        <Gift size={19} className="text-rose" />
        <p className="mt-3 text-sm font-black">記念パック</p>
        <p className="mt-1 text-[11px] font-bold leading-5 text-muted">
          掲載画像や雑誌風デザインを思い出に。
        </p>
        <p className="mt-3 text-sm font-black text-rose">¥1,980〜</p>
      </Link>
    </section>
  );
}

function TodayVoteTargetsSection({
  targets
}: {
  targets: Array<{ girl: Awaited<ReturnType<typeof getGirls>>[number]; voted: boolean }>;
}) {
  return (
    <section>
      <SectionTitle title="今日投票できる子" href="/girls" />
      {targets.length ? (
        <div className="space-y-2">
          {targets.map(({ girl, voted }) => (
            <article key={girl.id} className="mimi-card rounded-[20px] p-2.5">
              <div className="mb-2 flex items-center gap-3">
                <Link href={`/girls/${girl.slug}`} className="relative size-14 overflow-hidden rounded-2xl bg-rose-mist">
                  {girl.mainImageUrl ? (
                    <Image src={girl.mainImageUrl} alt={girl.displayName} fill className="object-cover" sizes="56px" />
                  ) : (
                    <MimiImagePlaceholder className="size-full" />
                  )}
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/girls/${girl.slug}`} className="text-sm font-black text-ink">
                    {girl.displayName}
                  </Link>
                  <p className="text-xs font-bold text-muted">{girl.region}</p>
                </div>
              </div>
              <VoteButton
                modelProfileId={girl.id}
                initialVoted={voted}
                isSelf={false}
                isLoggedIn
                compact
                path="/mypage"
              />
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-line bg-paper p-4 text-center shadow-card">
          <p className="text-sm font-black text-ink">今日はすべて応援済みです♡</p>
          <p className="mt-2 text-xs font-bold leading-6 text-muted">また明日、推しのランキングを見に来てください。</p>
        </div>
      )}
    </section>
  );
}

function VoteHistorySection({
  votes
}: {
  votes: Array<{ id: string; votedDate: string; modelProfile: { slug: string; displayName: string; mainImageUrl: string | null; region: string } }>;
}) {
  return (
    <section>
      <SectionTitle title="応援履歴" />
      {votes.length ? (
        <div className="space-y-2">
          {votes.map((vote) => (
            <Link key={vote.id} href={`/girls/${vote.modelProfile.slug}`} className="flex items-center gap-3 rounded-[18px] border border-line bg-paper p-2.5 shadow-card">
              <div className="relative size-12 overflow-hidden rounded-2xl bg-rose-mist">
                {vote.modelProfile.mainImageUrl ? (
                  <Image src={vote.modelProfile.mainImageUrl} alt={vote.modelProfile.displayName} fill className="object-cover" sizes="48px" />
                ) : (
                  <MimiImagePlaceholder className="size-full" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-ink">{vote.modelProfile.displayName}を応援しました</p>
                <p className="mt-0.5 text-[11px] font-bold text-muted">{vote.votedDate} / {vote.modelProfile.region}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-[18px] border border-line bg-paper p-4 text-center text-xs font-bold leading-6 text-muted shadow-card">
          まだ応援履歴はありません。気になるmimi girlを応援してみましょう。
        </p>
      )}
    </section>
  );
}

function CommentHistorySection({
  comments
}: {
  comments: Array<{ id: string; body: string; createdAt: Date; modelProfile: { slug: string; displayName: string } }>;
}) {
  return (
    <section>
      <SectionTitle title="応援コメント履歴" />
      {comments.length ? (
        <div className="space-y-2">
          {comments.map((comment) => (
            <Link key={comment.id} href={`/girls/${comment.modelProfile.slug}`} className="block rounded-[18px] border border-line bg-paper p-3 shadow-card">
              <p className="text-xs font-black text-rose">{comment.modelProfile.displayName}へ / {formatDate(comment.createdAt)}</p>
              <p className="mt-1 text-sm leading-6 text-ink">{comment.body}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-[18px] border border-line bg-paper p-4 text-center text-xs font-bold leading-6 text-muted shadow-card">
          まだ応援コメントはありません。プロフィールページから応援コメントを送ってみましょう。
        </p>
      )}
    </section>
  );
}

function LineConnectCard() {
  return (
    <section className="rounded-[24px] border border-line bg-paper p-4 text-center shadow-card">
      <p className="text-sm font-black text-ink">LINEで推し通知を受け取る</p>
      <p className="mt-2 text-xs font-bold leading-6 text-muted">
        ランキング更新や推しの最新情報をLINEでお知らせします。
      </p>
      <Link
        href={lineUrl || "/line"}
        className="mx-auto mt-4 flex h-11 max-w-[230px] items-center justify-center gap-2 rounded-full bg-linegreen px-4 text-xs font-black text-white shadow-soft"
      >
        <Megaphone size={15} />
        LINEで友だち登録
      </Link>
    </section>
  );
}

export default async function MyPage() {
  const user = await requireUser();

  if (user.role === "ADMIN") {
    return (
      <AppShell>
        <Header title="管理者マイページ" centered />
        <div className="space-y-5 px-4 py-5">
          <section className="mimi-card rounded-[28px] p-5">
            <p className="font-logo text-3xl text-ink">mimi admin</p>
            <p className="mt-2 text-sm font-bold text-muted">管理者向けの導線です。</p>
            <div className="mt-4 grid gap-2">
              <Link href="/admin" className="flex h-11 items-center justify-center rounded-full bg-rose text-xs font-black text-white">
                管理画面へ
              </Link>
              <Link href="/girls" className="flex h-11 items-center justify-center rounded-full border border-line bg-paper text-xs font-black text-muted">
                通常ページを見る
              </Link>
            </div>
          </section>
        </div>
      </AppShell>
    );
  }

  if (user.role === "MODEL") {
    const [profile, ranking, applications, favorites] = await Promise.all([
      getGirlForOwner(user.id),
      getRanking(),
      getMyApplications(user.id),
      getMyFavorites(user.id)
    ]);

    if (!profile) {
      return (
        <AppShell>
          <Header title="mimi girls マイページ" centered />
          <div className="px-4 py-6">
            <div className="mimi-card rounded-[24px] p-5 text-center">
              <p className="text-sm font-black text-ink">モデルプロフィールを準備中です。</p>
              <p className="mt-2 text-xs font-bold leading-6 text-muted">エントリー情報の確認後、プロフィールが作成されます。</p>
              <Link href="/entry" className="mx-auto mt-4 flex h-10 max-w-[190px] items-center justify-center rounded-full bg-rose text-xs font-black text-white">
                エントリーを確認する
              </Link>
            </div>
          </div>
        </AppShell>
      );
    }

    const rank = ranking.findIndex((girl) => girl.id === profile.id) + 1;
    const [todayVotes, coverEntries] = await Promise.all([
      db.vote.count({
        where: { modelProfileId: profile.id, votedDate: getJstDateString() }
      }),
      db.coverContestEntry.findMany({
        where: { modelProfileId: profile.id },
        include: { contest: true },
        orderBy: { createdAt: "desc" },
        take: 3
      })
    ]);

    return (
      <AppShell>
        <Header title="mimi girls マイページ" centered />
        <div className="space-y-6 px-4 py-5">
          <section className="rounded-[26px] bg-rose-mist/70 p-4">
            <p className="font-logo text-3xl text-ink">mimi girls</p>
            <p className="mt-1 text-sm font-bold leading-6 text-muted">あなたのmimiでの活動をまとめました。</p>
          </section>

          <ModelProfileCard profile={profile} rank={rank} />

          <section className="grid grid-cols-2 gap-3">
            <MiniStatCard label="総獲得票数" value={profile._count.votes.toLocaleString()} />
            <MiniStatCard label="今日の票数" value={`${todayVotes}票`} />
            <MiniStatCard label="現在順位" value={rank > 0 ? `${rank}位` : "集計中"} />
            <MiniStatCard label="推し登録者数" value={`${profile._count.favorites}人`} />
          </section>

          <ProfileEditForm profile={profile} />
          <WorkApplicationsSection applications={applications} />
          <PublicationHistorySection isPublished={profile.isPublished} coverEntries={coverEntries} />
          <PaidOfferCards />
          <MyFavoritesSection favorites={favorites} />
        </div>
      </AppShell>
    );
  }

  const [favorites, recommendations, voteHistory, commentHistory] = await Promise.all([
    getMyFavorites(user.id),
    getGirls({ sort: "popular" }),
    db.vote.findMany({
      where: { voterId: user.id },
      include: { modelProfile: true },
      orderBy: { createdAt: "desc" },
      take: 10
    }),
    db.supportComment.findMany({
      where: { userId: user.id },
      include: { modelProfile: true },
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  const favoriteGirls = favorites.map((favorite) => favorite.modelProfile);
  const candidateGirls = favoriteGirls.length
    ? favoriteGirls
    : recommendations.slice(0, 4);
  const todayVoteTargets = (
    await Promise.all(
      candidateGirls.map(async (girl) => ({
        girl,
        voted: await hasVotedToday(user.id, girl.id)
      }))
    )
  ).filter(({ voted }) => !voted).slice(0, 4);

  const favoriteIds = new Set(favoriteGirls.map((girl) => girl.id));
  const recommendedGirls = recommendations.filter((girl) => !favoriteIds.has(girl.id)).slice(0, 4);

  return (
    <AppShell>
      <Header title="mimi マイページ" centered />
      <div className="space-y-6 px-4 py-5">
        <section className="mimi-card rounded-[28px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-logo text-3xl text-ink">my mimi</p>
              <p className="text-xs font-black text-rose">ユーザーマイページ</p>
              <p className="mt-1 text-sm font-bold text-muted">{user.nickname ?? "mimi user"}さんのmimi</p>
            </div>
            <Link href="/logout" className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted">
              <LogOut size={17} />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/girls" className="flex h-10 items-center justify-center rounded-full bg-rose text-xs font-black text-white">
              推しを見つける
            </Link>
            <Link href="/ranking" className="flex h-10 items-center justify-center rounded-full border border-line bg-paper text-xs font-black text-muted">
              ランキングを見る
            </Link>
          </div>
        </section>

        <MyFavoritesSection favorites={favorites} />
        <TodayVoteTargetsSection targets={todayVoteTargets} />
        <VoteHistorySection votes={voteHistory} />
        <CommentHistorySection comments={commentHistory} />

        <section>
          <SectionTitle title="おすすめmimi girls" href="/girls" />
          <div className="grid grid-cols-2 gap-3">
            {recommendedGirls.map((girl) => (
              <GirlCard key={girl.id} girl={girl} />
            ))}
          </div>
        </section>

        <LineConnectCard />
      </div>
    </AppShell>
  );
}
