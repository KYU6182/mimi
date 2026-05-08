import "server-only";

import type { ModelProfile } from "@prisma/client";
import { db } from "@/lib/db";
import {
  calcRankingScore,
  getJstDateString,
  normalizeRegion,
  profileCompletionScore
} from "@/lib/utils";

export type GirlCardData = ModelProfile & {
  _count: {
    votes: number;
    favorites: number;
    comments?: number;
  };
};

export async function getGirls(options?: {
  region?: string;
  tag?: string;
  q?: string;
  sort?: string;
  includeUnpublished?: boolean;
}) {
  const region = options?.region ? normalizeRegion(options.region) : undefined;
  const where = {
    ...(options?.includeUnpublished ? {} : { isPublished: true }),
    ...(region ? { region } : {}),
    ...(options?.q
      ? {
          OR: [
            { displayName: { contains: options.q } },
            { region: { contains: options.q } },
            { styleTags: { contains: options.q } },
            { interestTags: { contains: options.q } }
          ]
        }
      : {}),
    ...(options?.tag
      ? {
          OR: [
            { styleTags: { contains: options.tag } },
            { interestTags: { contains: options.tag } }
          ]
        }
      : {})
  };
  const girls = await db.modelProfile.findMany({
    where,
    include: {
      _count: {
        select: { votes: true, favorites: true, comments: true }
      }
    },
    orderBy: options?.sort === "new" ? { createdAt: "desc" } : { displayName: "asc" }
  });
  if (options?.sort === "popular") {
    return girls.sort((a, b) => b._count.votes - a._count.votes);
  }
  if (options?.sort === "rising") {
    const today = getJstDateString();
    const growth = await Promise.all(
      girls.map(async (girl) => [
        girl.id,
        await db.vote.count({ where: { modelProfileId: girl.id, votedDate: today } })
      ] as const)
    );
    const growthMap = new Map(growth);
    return girls.sort(
      (a, b) => (growthMap.get(b.id) ?? 0) - (growthMap.get(a.id) ?? 0) || b._count.votes - a._count.votes
    );
  }
  return girls;
}

export async function getGirlByIdOrSlug(id: string) {
  return db.modelProfile.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
      isPublished: true
    },
    include: {
      user: true,
      _count: {
        select: { votes: true, favorites: true, comments: true }
      }
    }
  });
}

export async function getGirlForOwner(userId: string) {
  return db.modelProfile.findUnique({
    where: { userId },
    include: {
      _count: {
        select: { votes: true, favorites: true, comments: true }
      }
    }
  });
}

export async function getRanking(tab = "overall") {
  const girls = await getGirls({ sort: "popular" });
  const today = getJstDateString();
  const ranked = await Promise.all(
    girls.map(async (girl) => {
      const dailyGrowth = await db.vote.count({
        where: { modelProfileId: girl.id, votedDate: today }
      });
      const score = calcRankingScore({
        votes: girl._count.votes,
        dailyGrowth,
        profileCompletion: profileCompletionScore(girl)
      });
      return { ...girl, dailyGrowth, score };
    })
  );
  const sorted = ranked.sort((a, b) => {
    if (tab === "new") return b.createdAt.getTime() - a.createdAt.getTime();
    if (tab === "rising") return b.dailyGrowth - a.dailyGrowth;
    if (tab === "cover") return Number(b.profileBoosted) - Number(a.profileBoosted) || b.score - a.score;
    return b.score - a.score;
  });
  return sorted.map((girl, index) => ({
    ...girl,
    rank: index + 1,
    gapToTop10: Math.max(0, (sorted[9]?._count.votes ?? sorted[0]?._count.votes ?? 0) + 1 - girl._count.votes)
  }));
}

export async function getRegionRanking(region: string, take = 5) {
  const girls = await getRanking("overall");
  return girls.filter((girl) => girl.region === normalizeRegion(region)).slice(0, take);
}

export async function getSupportComments(modelProfileId: string) {
  return db.supportComment.findMany({
    where: { modelProfileId, status: "APPROVED" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 20
  });
}

export async function hasVotedToday(userId: string | undefined, modelProfileId: string) {
  if (!userId) return false;
  const vote = await db.vote.findUnique({
    where: {
      voterId_modelProfileId_votedDate: {
        voterId: userId,
        modelProfileId,
        votedDate: getJstDateString()
      }
    }
  });
  return Boolean(vote);
}

export async function isFavorite(userId: string | undefined, modelProfileId: string) {
  if (!userId) return false;
  const favorite = await db.favorite.findUnique({
    where: {
      userId_modelProfileId: {
        userId,
        modelProfileId
      }
    }
  });
  return Boolean(favorite);
}

export async function getLatestIssue() {
  return db.magazineIssue.findFirst({
    orderBy: { publishedAt: "desc" },
    include: { articles: true }
  });
}

export async function getMagazineIssues() {
  return db.magazineIssue.findMany({
    orderBy: { publishedAt: "desc" },
    include: { articles: true }
  });
}

export async function getWorks(category?: string) {
  return db.workOpportunity.findMany({
    where: {
      isActive: true,
      ...(category && category !== "all" ? { category: category as never } : {})
    },
    include: {
      _count: {
        select: { applications: true }
      }
    },
    orderBy: { deadline: "asc" }
  });
}

export async function getWork(id: string) {
  return db.workOpportunity.findUnique({
    where: { id },
    include: { _count: { select: { applications: true } } }
  });
}

export async function getMyFavorites(userId: string) {
  return db.favorite.findMany({
    where: {
      userId,
      modelProfile: {
        isPublished: true
      }
    },
    include: {
      modelProfile: {
        include: { _count: { select: { votes: true, favorites: true, comments: true } } }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getMyApplications(userId: string) {
  return db.workApplication.findMany({
    where: { userId },
    include: { workOpportunity: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function getLocalFeature(region: string) {
  const name = normalizeRegion(region);
  const [feature, spots, works] = await Promise.all([
    db.regionFeature.findFirst({ where: { region: name }, orderBy: { createdAt: "desc" } }),
    db.shopSpot.findMany({ where: { region: name }, take: 6 }),
    db.workOpportunity.findMany({ where: { region: name, isActive: true }, take: 4 })
  ]);
  return { region: name, feature, spots, works };
}
