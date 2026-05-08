"use server";

import { revalidatePath } from "next/cache";
import type { ApplicationStatus, CommentStatus, WorkCategory } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { makeSlug } from "@/lib/utils";

const workCategories = ["CAFE", "SALON", "NAIL", "APPAREL", "COSMETIC", "MODEL", "OTHER"] as const;
const applicationStatuses = ["PENDING", "ACCEPTED", "REJECTED"] as const;
const commentStatuses = ["PENDING", "APPROVED", "REJECTED"] as const;

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function boolValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function fallbackDate(valueString: string) {
  if (valueString) return new Date(valueString);
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
}

function publicationDate(valueString: string) {
  return valueString ? new Date(valueString) : new Date();
}

function revalidateAdminCore() {
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/girls");
  revalidatePath("/ranking");
  revalidatePath("/works");
  revalidatePath("/magazine");
  revalidatePath("/mypage");
}

export async function setModelPublishedAction(modelProfileId: string, isPublished: boolean) {
  await requireAdmin();
  const model = await db.modelProfile.update({
    where: { id: modelProfileId },
    data: { isPublished },
    select: { slug: true }
  });
  revalidateAdminCore();
  revalidatePath(`/girls/${model.slug}`);
}

export async function createWorkOpportunityAction(formData: FormData) {
  await requireAdmin();
  const title = value(formData, "title");
  const category = value(formData, "category") as WorkCategory;
  if (!title) throw new Error("タイトルを入力してください");
  if (!workCategories.includes(category as (typeof workCategories)[number])) throw new Error("カテゴリを選択してください");

  await db.workOpportunity.create({
    data: {
      title,
      category,
      region: value(formData, "region") || "全国",
      description: value(formData, "description") || "詳細を準備中です。",
      rewardText: value(formData, "rewardText") || null,
      imageUrl: value(formData, "imageUrl") || "/images/works/cafe.png",
      deadline: fallbackDate(value(formData, "deadline")),
      isActive: boolValue(formData, "isActive")
    }
  });
  revalidateAdminCore();
}

export async function updateWorkOpportunityAction(formData: FormData) {
  await requireAdmin();
  const id = value(formData, "id");
  const title = value(formData, "title");
  const category = value(formData, "category") as WorkCategory;
  if (!id || !title) throw new Error("案件情報を確認してください");
  if (!workCategories.includes(category as (typeof workCategories)[number])) throw new Error("カテゴリを選択してください");

  await db.workOpportunity.update({
    where: { id },
    data: {
      title,
      category,
      region: value(formData, "region") || "全国",
      description: value(formData, "description") || "詳細を準備中です。",
      rewardText: value(formData, "rewardText") || null,
      imageUrl: value(formData, "imageUrl") || "/images/works/cafe.png",
      deadline: fallbackDate(value(formData, "deadline")),
      isActive: boolValue(formData, "isActive")
    }
  });
  revalidateAdminCore();
  revalidatePath(`/works/${id}`);
}

export async function toggleWorkOpportunityActiveAction(workOpportunityId: string, isActive: boolean) {
  await requireAdmin();
  await db.workOpportunity.update({
    where: { id: workOpportunityId },
    data: { isActive }
  });
  revalidateAdminCore();
  revalidatePath(`/works/${workOpportunityId}`);
}

export async function updateWorkApplicationStatusAction(applicationId: string, status: ApplicationStatus) {
  await requireAdmin();
  if (!applicationStatuses.includes(status as (typeof applicationStatuses)[number])) throw new Error("不正なステータスです");
  await db.workApplication.update({
    where: { id: applicationId },
    data: { status }
  });
  revalidatePath("/admin");
  revalidatePath("/mypage");
}

export async function createMagazineIssueAction(formData: FormData) {
  await requireAdmin();
  const title = value(formData, "title");
  const slug = value(formData, "slug") || `${makeSlug(title)}-${Date.now().toString(36)}`;
  if (!title) throw new Error("タイトルを入力してください");
  if (!slug) throw new Error("slugを入力してください");
  try {
    await db.magazineIssue.create({
      data: {
        title,
        slug,
        coverImageUrl: value(formData, "coverImageUrl") || "/images/magazine/vol12.png",
        description: value(formData, "description") || "説明を準備中です。",
        publishedAt: publicationDate(value(formData, "publishedAt"))
      }
    });
  } catch {
    throw new Error("slugがすでに使われています");
  }
  revalidateAdminCore();
}

export async function createMagazineArticleAction(formData: FormData) {
  await requireAdmin();
  const issueId = value(formData, "issueId");
  const title = value(formData, "title");
  const slug = value(formData, "slug") || `${makeSlug(title)}-${Date.now().toString(36)}`;
  if (!issueId || !title) throw new Error("雑誌号と記事タイトルを入力してください");
  try {
    await db.magazineArticle.create({
      data: {
        issueId,
        title,
        slug,
        category: value(formData, "category") || "編集部ピック",
        thumbnailUrl: value(formData, "thumbnailUrl") || "/images/girls/sakura.png",
        body: value(formData, "body") || "本文を準備中です。"
      }
    });
  } catch {
    throw new Error("slugがすでに使われています");
  }
  revalidateAdminCore();
}

export async function updateSupportCommentStatusAction(commentId: string, status: CommentStatus) {
  await requireAdmin();
  if (!commentStatuses.includes(status as (typeof commentStatuses)[number])) throw new Error("不正なステータスです");
  const comment = await db.supportComment.update({
    where: { id: commentId },
    data: { status },
    select: { modelProfile: { select: { slug: true } } }
  });
  revalidatePath("/admin");
  revalidatePath(`/girls/${comment.modelProfile.slug}`);
}

export async function toggleCoverContestActiveAction(contestId: string, isActive: boolean) {
  await requireAdmin();
  await db.coverContest.update({
    where: { id: contestId },
    data: { isActive }
  });
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/ranking");
}
