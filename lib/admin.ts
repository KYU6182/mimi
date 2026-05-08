import "server-only";

import { db } from "@/lib/db";

export async function getAdminDashboardData() {
  const [
    publishedModels,
    pendingModels,
    totalUsers,
    totalVotes,
    totalFavorites,
    pendingComments,
    activeWorks,
    totalApplications,
    models,
    works,
    applications,
    issues,
    articles,
    comments,
    contests
  ] = await Promise.all([
    db.modelProfile.count({ where: { isPublished: true } }),
    db.modelProfile.count({ where: { isPublished: false } }),
    db.user.count(),
    db.vote.count(),
    db.favorite.count(),
    db.supportComment.count({ where: { status: "PENDING" } }),
    db.workOpportunity.count({ where: { isActive: true } }),
    db.workApplication.count(),
    db.modelProfile.findMany({
      include: {
        _count: { select: { votes: true, favorites: true, comments: true } }
      },
      orderBy: [{ isPublished: "asc" }, { createdAt: "desc" }]
    }),
    db.workOpportunity.findMany({
      include: { _count: { select: { applications: true } } },
      orderBy: { createdAt: "desc" }
    }),
    db.workApplication.findMany({
      include: {
        user: { include: { modelProfile: true } },
        workOpportunity: true
      },
      orderBy: { createdAt: "desc" },
      take: 50
    }),
    db.magazineIssue.findMany({
      include: { _count: { select: { articles: true } } },
      orderBy: { publishedAt: "desc" }
    }),
    db.magazineArticle.findMany({
      include: { issue: true },
      orderBy: { createdAt: "desc" },
      take: 30
    }),
    db.supportComment.findMany({
      include: { user: true, modelProfile: true },
      orderBy: { createdAt: "desc" },
      take: 50
    }),
    db.coverContest.findMany({
      include: {
        entries: {
          include: {
            modelProfile: {
              select: { id: true, displayName: true, slug: true, region: true }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    })
  ]);

  return {
    stats: {
      publishedModels,
      pendingModels,
      totalUsers,
      totalVotes,
      totalFavorites,
      pendingComments,
      activeWorks,
      totalApplications
    },
    pendingModelProfiles: models.filter((model) => !model.isPublished),
    models,
    works,
    applications,
    issues,
    articles,
    comments,
    contests
  };
}
