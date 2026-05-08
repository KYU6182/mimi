import "server-only";

import { db } from "@/lib/db";
import { getJstDateString } from "@/lib/utils";

export type RankingItem = {
  rank: number;
  id: string;
  slug: string;
  displayName: string;
  region: string;
  mainImageUrl: string | null;
  voteCount: number;
  deltaText?: string;
  gapToTop10?: number;
};

export type HomeRankingPreview = {
  overall: RankingItem[];
  rising: RankingItem[];
  newcomer: RankingItem[];
};

type RankedSource = {
  id: string;
  slug: string;
  displayName: string;
  region: string;
  mainImageUrl: string | null;
  createdAt: Date;
  profileBoosted?: boolean;
  _count: { votes: number };
};

function withRanks(items: RankedSource[], limit?: number, deltas?: Map<string, number>): RankingItem[] {
  const top10Votes = items[9]?._count.votes ?? items[0]?._count.votes ?? 0;
  return items.slice(0, limit ?? items.length).map((girl, index) => {
    const delta = deltas?.get(girl.id);
    return {
      rank: index + 1,
      id: girl.id,
      slug: girl.slug,
      displayName: girl.displayName,
      region: girl.region,
      mainImageUrl: girl.mainImageUrl,
      voteCount: girl._count.votes,
      deltaText: typeof delta === "number" ? `昨日から +${delta}票` : undefined,
      gapToTop10: Math.max(0, top10Votes + 1 - girl._count.votes)
    };
  });
}

async function getPublishedGirls() {
  return db.modelProfile.findMany({
    where: { isPublished: true },
    include: { _count: { select: { votes: true } } }
  });
}

async function getTodayVoteMap() {
  const today = getJstDateString();
  const groups = await db.vote.groupBy({
    by: ["modelProfileId"],
    where: { votedDate: today },
    _count: { _all: true }
  });
  return new Map(groups.map((group) => [group.modelProfileId, group._count._all]));
}

function displayDelta(voteCount: number, todayCount = 0, index = 0) {
  if (todayCount > 0) return todayCount;
  return Math.max(5, Math.round(voteCount / 52) + [12, 8, 5, 4, 3][index % 5]);
}

export async function getOverallRanking(limit?: number) {
  const girls = await getPublishedGirls();
  const sorted = girls.sort((a, b) => b._count.votes - a._count.votes);
  return withRanks(sorted, limit);
}

export async function getRisingRanking(limit?: number) {
  const [girls, todayVotes] = await Promise.all([getPublishedGirls(), getTodayVoteMap()]);
  const sorted = girls.sort((a, b) => {
    const todayDiff = (todayVotes.get(b.id) ?? 0) - (todayVotes.get(a.id) ?? 0);
    return todayDiff || b._count.votes - a._count.votes;
  });
  const deltas = new Map(
    sorted.map((girl, index) => [girl.id, displayDelta(girl._count.votes, todayVotes.get(girl.id), index)])
  );
  return withRanks(sorted, limit, deltas);
}

export async function getNewcomerRanking(limit?: number) {
  const girls = await getPublishedGirls();
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const freshGirls = girls.filter((girl) => girl.createdAt.getTime() >= thirtyDaysAgo);
  const pool = freshGirls.length >= 3 ? freshGirls : girls;
  const sorted = pool.sort((a, b) => {
    const createdDiff = b.createdAt.getTime() - a.createdAt.getTime();
    return createdDiff || b._count.votes - a._count.votes;
  });
  return withRanks(sorted, limit).map((item, index) => ({
    ...item,
    deltaText: index === 0 ? "NEW FACE" : item.deltaText
  }));
}

export async function getCoverCandidateRanking(limit?: number) {
  const activeContest = await db.coverContest.findFirst({
    where: { isActive: true },
    include: {
      entries: {
        include: {
          modelProfile: {
            include: { _count: { select: { votes: true } } }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  if (activeContest?.entries.length) {
    const entries = activeContest.entries
      .map((entry) => entry.modelProfile)
      .filter((girl) => girl.isPublished)
      .sort((a, b) => b._count.votes - a._count.votes);
    return withRanks(entries, limit);
  }

  const girls = await getPublishedGirls();
  const sorted = girls.sort(
    (a, b) => Number(b.profileBoosted) - Number(a.profileBoosted) || b._count.votes - a._count.votes
  );
  return withRanks(sorted, limit);
}

export const getCoverContestRanking = getCoverCandidateRanking;

export async function getRegionalRanking(limit?: number, region = "福岡") {
  const girls = await getPublishedGirls();
  const sorted = girls
    .filter((girl) => girl.region === region)
    .sort((a, b) => b._count.votes - a._count.votes);
  return withRanks(sorted, limit);
}

export async function getHomeRankingPreview(): Promise<HomeRankingPreview> {
  const [overall, rising, newcomer] = await Promise.all([
    getOverallRanking(5),
    getRisingRanking(5),
    getNewcomerRanking(5)
  ]);
  return { overall, rising, newcomer };
}
