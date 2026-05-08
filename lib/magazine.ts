import "server-only";

import { db } from "@/lib/db";

export async function getLatestIssue() {
  return db.magazineIssue.findFirst({
    orderBy: { publishedAt: "desc" },
    include: { articles: true }
  });
}

export async function getMagazineArchives(limit = 6) {
  return db.magazineIssue.findMany({
    orderBy: { publishedAt: "desc" },
    include: { articles: true },
    take: limit
  });
}

export async function getMagazineArticles(issueId: string) {
  return db.magazineArticle.findMany({
    where: { issueId },
    orderBy: { createdAt: "desc" }
  });
}
