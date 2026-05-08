import "server-only";

import { getGirlByIdOrSlug, getGirls, getRanking, getSupportComments } from "@/lib/data";
import { db } from "@/lib/db";
import { getJstDateString } from "@/lib/utils";

export { getGirls };

function dailyIndex(length: number) {
  if (length <= 0) return 0;
  const dateNumber = Number(getJstDateString().replaceAll("-", ""));
  return dateNumber % length;
}

export async function getGirlBySlug(slug: string) {
  return getGirlByIdOrSlug(slug);
}

export async function getPublishedGirlsForHero(limit = 6) {
  return db.modelProfile.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      displayName: true,
      slug: true,
      mainImageUrl: true,
      coverImageUrl: true,
      region: true
    }
  });
}

export async function getPublishedGirlCount() {
  return db.modelProfile.count({
    where: { isPublished: true }
  });
}

export async function getTodayMimiGirl() {
  const girls = await db.modelProfile.findMany({
    where: { isPublished: true },
    include: {
      _count: {
        select: { votes: true, favorites: true, comments: true }
      }
    },
    orderBy: [{ profileBoosted: "desc" }, { createdAt: "desc" }]
  });

  if (!girls.length) return null;

  const boostedGirls = girls.filter((girl) => girl.profileBoosted);
  if (boostedGirls.length) {
    return boostedGirls[dailyIndex(boostedGirls.length)];
  }

  const rankedGirls = [...girls].sort(
    (a, b) => b._count.votes - a._count.votes || b.createdAt.getTime() - a.createdAt.getTime()
  );
  return rankedGirls[dailyIndex(rankedGirls.length)];
}

export async function getGirlProfile(slug: string) {
  const [girl, ranking] = await Promise.all([getGirlByIdOrSlug(slug), getRanking()]);
  if (!girl) return null;

  const overallRank = ranking.findIndex((item) => item.id === girl.id) + 1;
  const regionRank =
    ranking.filter((item) => item.region === girl.region).findIndex((item) => item.id === girl.id) + 1;
  const publicationCount = Math.max(3, Math.round(girl._count.votes / 16));

  return {
    girl,
    overallRank: overallRank || null,
    regionRank: regionRank || null,
    publicationCount
  };
}

export async function getGirlSupportComments(modelProfileId: string) {
  return getSupportComments(modelProfileId);
}

export async function getGirlProfileStats(modelProfileId: string) {
  const [voteCount, favoriteCount] = await Promise.all([
    db.vote.count({ where: { modelProfileId } }),
    db.favorite.count({ where: { modelProfileId } })
  ]);
  return { voteCount, favoriteCount };
}

export async function getRelatedGirlsByRegion(region: string, currentId: string, limit = 4) {
  const sameRegion = (await getGirls({ region, sort: "popular" })).filter((girl) => girl.id !== currentId);
  if (sameRegion.length) return sameRegion.slice(0, limit);

  const popular = (await getGirls({ sort: "popular" })).filter(
    (girl) => girl.id !== currentId && !sameRegion.some((related) => related.id === girl.id)
  );
  return [...sameRegion, ...popular].slice(0, limit);
}

export async function getGirlGrowthRecords(
  modelProfileId: string,
  displayName: string,
  region: string,
  createdAt: Date
) {
  const records = await db.growthRecord.findMany({
    where: { modelProfileId },
    orderBy: { occurredAt: "asc" }
  });
  if (records.length) {
    return records.map((record) => ({
      date: record.occurredAt.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }),
      body: record.description ? `${record.title} ${record.description}` : record.title
    }));
  }

  const joined = createdAt.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return [
    { date: joined, body: `${displayName}がmimiに参加しました！` },
    { date: "2026.04.15", body: "初めて100票を達成しました！" },
    { date: "2026.04.28", body: `${region}ランキングTOP10入り` },
    { date: "2026.05.10", body: "表紙候補に選出されました！" }
  ];
}

export function profileCoverUrl(url?: string | null) {
  if (!url || url.includes("hero.png") || url.includes("profile-cover.png")) {
    return "/images/profile-cover-clean.png";
  }
  return url;
}
