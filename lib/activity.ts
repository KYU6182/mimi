import "server-only";

import { db } from "@/lib/db";

export type HomeActivityLog = {
  id: string;
  type: "vote" | "favorite" | "comment" | "ranking" | "cover" | "join";
  text: string;
  createdAtLabel?: string;
  href?: string;
};

function createdAtLabel(date?: Date) {
  if (!date) return "今日";

  const diffMinutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (diffMinutes <= 2) return "たった今";
  if (diffMinutes < 60) return `${diffMinutes}分前`;
  if (diffMinutes < 24 * 60) return "今日";

  return date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
}

function fallbackLogs(
  girls: Array<{ displayName: string; slug: string; region: string }>,
  limit: number
): HomeActivityLog[] {
  const first = girls[0] ?? { displayName: "ゆいな", slug: "yuina", region: "福岡" };
  const second = girls[1] ?? { displayName: "みお", slug: "mio", region: "大阪" };
  const third = girls[2] ?? { displayName: "さくら", slug: "sakura", region: "東京" };

  const logs: HomeActivityLog[] = [
    {
      id: "fallback-vote",
      type: "vote",
      text: `♡ ${first.displayName}に1票入りました`,
      createdAtLabel: "たった今",
      href: `/girls/${first.slug}`
    },
    {
      id: "fallback-favorite",
      type: "favorite",
      text: `♡ ${second.displayName}が推し登録されました`,
      createdAtLabel: "3分前",
      href: `/girls/${second.slug}`
    },
    {
      id: "fallback-region",
      type: "ranking",
      text: `↗ ${first.region}ランキングが更新されました`,
      createdAtLabel: "12分前",
      href: "/ranking"
    },
    {
      id: "fallback-cover",
      type: "cover",
      text: `♕ ${third.displayName}が表紙候補に入りました`,
      createdAtLabel: "今日",
      href: `/girls/${third.slug}`
    }
  ];

  return logs.slice(0, limit);
}

export async function getHomeActivityLogs(limit = 8): Promise<HomeActivityLog[]> {
  const [votes, favorites, comments, joins, coverEntries, girls] = await Promise.all([
    db.vote.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        modelProfile: {
          select: { displayName: true, slug: true }
        }
      }
    }),
    db.favorite.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        modelProfile: {
          select: { displayName: true, slug: true }
        }
      }
    }),
    db.supportComment.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        modelProfile: {
          select: { displayName: true, slug: true }
        }
      }
    }),
    db.modelProfile.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, displayName: true, slug: true, region: true, createdAt: true }
    }),
    db.coverContestEntry.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        modelProfile: {
          select: { displayName: true, slug: true }
        }
      }
    }),
    db.modelProfile.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { displayName: true, slug: true, region: true }
    })
  ]);

  const logs: Array<HomeActivityLog & { sortAt: number }> = [
    ...votes.map((vote) => ({
      id: `vote-${vote.id}`,
      type: "vote" as const,
      text: `♡ ${vote.modelProfile.displayName}に1票入りました`,
      createdAtLabel: createdAtLabel(vote.createdAt),
      href: `/girls/${vote.modelProfile.slug}`,
      sortAt: vote.createdAt.getTime()
    })),
    ...favorites.map((favorite) => ({
      id: `favorite-${favorite.id}`,
      type: "favorite" as const,
      text: `♡ ${favorite.modelProfile.displayName}が推し登録されました`,
      createdAtLabel: createdAtLabel(favorite.createdAt),
      href: `/girls/${favorite.modelProfile.slug}`,
      sortAt: favorite.createdAt.getTime()
    })),
    ...comments.map((comment) => ({
      id: `comment-${comment.id}`,
      type: "comment" as const,
      text: `♡ ${comment.modelProfile.displayName}に応援コメントが届きました`,
      createdAtLabel: createdAtLabel(comment.createdAt),
      href: `/girls/${comment.modelProfile.slug}`,
      sortAt: comment.createdAt.getTime()
    })),
    ...joins.map((girl) => ({
      id: `join-${girl.id}`,
      type: "join" as const,
      text: `✦ 新しいmimi girl、${girl.displayName}が参加しました`,
      createdAtLabel: createdAtLabel(girl.createdAt),
      href: `/girls/${girl.slug}`,
      sortAt: girl.createdAt.getTime()
    })),
    ...coverEntries.map((entry) => ({
      id: `cover-${entry.id}`,
      type: "cover" as const,
      text: `♕ ${entry.modelProfile.displayName}が表紙候補に入りました`,
      createdAtLabel: createdAtLabel(entry.createdAt),
      href: `/girls/${entry.modelProfile.slug}`,
      sortAt: entry.createdAt.getTime()
    })),
    {
      id: "ranking-update",
      type: "ranking",
      text: `↗ ${girls[0]?.region ?? "福岡"}ランキングが更新されました`,
      createdAtLabel: "今日",
      href: "/ranking",
      sortAt: Date.now() - 18 * 60 * 1000
    }
  ];

  const sortedLogs = logs.sort((a, b) => b.sortAt - a.sortAt).slice(0, limit);
  if (sortedLogs.length >= Math.min(limit, 5)) {
    return sortedLogs.map(({ sortAt: _sortAt, ...log }) => log);
  }

  const fallback = fallbackLogs(girls, limit - sortedLogs.length).map((log, index) => ({
    ...log,
    id: `${log.id}-${index}`
  }));

  return [...sortedLogs.map(({ sortAt: _sortAt, ...log }) => log), ...fallback].slice(0, limit);
}
