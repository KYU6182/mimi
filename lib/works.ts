import "server-only";

import { db } from "@/lib/db";

export async function getActiveWorkOpportunities(category?: string) {
  return db.workOpportunity.findMany({
    where: {
      isActive: true,
      ...(category && category !== "all" ? { category: category as never } : {})
    },
    include: { _count: { select: { applications: true } } },
    orderBy: { deadline: "asc" }
  });
}

export async function getWorkOpportunity(id: string) {
  return db.workOpportunity.findFirst({
    where: { id, isActive: true },
    include: { _count: { select: { applications: true } } }
  });
}

export async function getAppliedWorkOpportunityIds(userId: string) {
  const applications = await db.workApplication.findMany({
    where: { userId },
    select: { workOpportunityId: true }
  });
  return new Set(applications.map((application) => application.workOpportunityId));
}

export async function hasAppliedToWork(userId: string, workOpportunityId: string) {
  const application = await db.workApplication.findUnique({
    where: { userId_workOpportunityId: { userId, workOpportunityId } },
    select: { id: true }
  });
  return Boolean(application);
}

export async function applyToWork(userId: string, workOpportunityId: string, message?: string) {
  const work = await db.workOpportunity.findFirst({
    where: { id: workOpportunityId, isActive: true },
    select: { id: true }
  });
  if (!work) throw new Error("この案件は現在応募できません");

  return db.workApplication.upsert({
    where: {
      userId_workOpportunityId: {
        userId,
        workOpportunityId
      }
    },
    update: {},
    create: {
      userId,
      workOpportunityId,
      message: message || "応募します。よろしくお願いします。",
      status: "PENDING"
    }
  });
}

export async function getMyApplications(userId: string) {
  return db.workApplication.findMany({
    where: { userId },
    include: { workOpportunity: true },
    orderBy: { createdAt: "desc" }
  });
}
