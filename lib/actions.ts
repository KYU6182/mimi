"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import {
  clearSession,
  getCurrentUser,
  hashPassword,
  requireRole,
  setSession,
  verifyPassword
} from "@/lib/auth";
import {
  adminWorkSchema,
  commentSchema,
  loginSchema,
  profileUpdateSchema,
  registerSchema,
  workApplicationSchema
} from "@/lib/validations";
import {
  getFavoriteCount,
  toggleFavorite as toggleFavoriteRecord
} from "@/lib/favorites";
import { applyToWork as createWorkApplication } from "@/lib/works";
import { getJstDateString, makeSlug, splitTags, tagsToJson } from "@/lib/utils";

export type ActionState = {
  ok?: boolean;
  message?: string;
  redirectTo?: string;
  isFavorite?: boolean;
  favoriteCount?: number;
  status?: string;
};

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function values(formData: FormData, key: string) {
  return formData.getAll(key).map(String).filter(Boolean);
}

function loginRedirect(path: string) {
  const next = path.startsWith("/") && !path.startsWith("//") ? path : "/";
  return `/login?next=${encodeURIComponent(next)}`;
}

function safeNext(path: string) {
  return path.startsWith("/") && !path.startsWith("//") ? path : "/mypage";
}

function formError(error: unknown, fallback = "入力内容を確認してください"): ActionState {
  if (error && typeof error === "object" && "flatten" in error) {
    return { ok: false, message: fallback };
  }
  return { ok: false, message: error instanceof Error ? error.message : fallback };
}

function randomId(length = 5) {
  return Math.random().toString(36).slice(2, 2 + length);
}

function normalizeInstagram(value: string) {
  return value.trim().replace(/^@+/, "");
}

function registrationRaw(formData: FormData, role: "MODEL" | "FAN") {
  const selectedTags = values(formData, "styleTags");
  return {
    role,
    email: value(formData, "email").toLowerCase(),
    password: value(formData, "password"),
    nickname: role === "MODEL" ? value(formData, "displayName") : value(formData, "nickname"),
    birthDate: value(formData, "birthDate"),
    region: value(formData, "region"),
    instagram: value(formData, "instagram"),
    styleTags: selectedTags.length ? tagsToJson(selectedTags) : value(formData, "styleTags"),
    reason: value(formData, "reason"),
    terms: value(formData, "terms"),
    over18: value(formData, "over18")
  };
}

async function createRegisteredUser(raw: ReturnType<typeof registrationRaw>): Promise<ActionState> {
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message };

  const input = parsed.data;

  const existing = await db.user.findUnique({ where: { email: input.email } });
  if (existing) return { ok: false, message: "すでに登録されているメールアドレスです" };

  const passwordHash = await hashPassword(input.password);
  const user = await db.$transaction(async (tx) => {
    const slugBase = makeSlug(input.nickname);
    let slug = `${slugBase}-${randomId()}`;
    if (input.role === "MODEL") {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const existingSlug = await tx.modelProfile.findUnique({
          where: { slug },
          select: { id: true }
        });
        if (!existingSlug) break;
        slug = `${slugBase}-${randomId(6)}`;
      }
    }
    return tx.user.create({
      data: {
        email: input.email,
        passwordHash,
        role: input.role as Role,
        nickname: input.nickname,
        region: input.region,
        ...(input.role === "MODEL"
          ? {
              modelProfile: {
                create: {
                  displayName: input.nickname,
                  slug,
                  region: input.region,
                  prefecture: input.region,
                  age: 18,
                  instagram: normalizeInstagram(input.instagram || ""),
                  bio: "",
                  reason: input.reason || "",
                  goal: "",
                  editorComment: null,
                  styleTags: input.styleTags || "[]",
                  interestTags: "[]",
                  mainImageUrl: "/images/profile-cover-clean.png",
                  coverImageUrl: "/images/profile-cover-clean.png",
                  isPublished: false,
                  profileBoosted: false
                }
              }
            }
          : {})
      }
    });
  });

  await setSession(user.id);
  redirect("/mypage");
}

export async function registerUserAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return createRegisteredUser(registrationRaw(formData, "FAN"));
}

export async function entryModelAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return createRegisteredUser(registrationRaw(formData, "MODEL"));
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: value(formData, "email").trim().toLowerCase(),
    password: value(formData, "password")
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message };

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return { ok: false, message: "メールアドレスまたはパスワードが違います" };
  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) return { ok: false, message: "メールアドレスまたはパスワードが違います" };
  await setSession(user.id);
  redirect(safeNext(value(formData, "next") || "/mypage"));
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function voteForGirl(modelProfileId: string, path: string): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "ログインすると応援できます", redirectTo: loginRedirect(path) };

  const girl = await db.modelProfile.findUnique({ where: { id: modelProfileId } });
  if (!girl) return { ok: false, message: "モデルが見つかりません" };
  if (girl.userId === user.id) return { ok: false, message: "自分には投票できません" };

  try {
    await db.vote.create({
      data: {
        voterId: user.id,
        modelProfileId,
        votedDate: getJstDateString()
      }
    });
  } catch {
    return { ok: false, message: "本日は応援済みです" };
  }

  revalidatePath(path);
  revalidatePath("/ranking");
  revalidatePath("/girls");
  revalidatePath("/");
  return { ok: true, message: "応援しました♡" };
}

export async function toggleFavoriteAction(modelProfileId: string, path: string): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "ログインすると推し登録できます", redirectTo: loginRedirect(path) };

  const girl = await db.modelProfile.findUnique({ where: { id: modelProfileId } });
  if (!girl) return { ok: false, message: "モデルが見つかりません" };

  const result = await toggleFavoriteRecord(user.id, modelProfileId);
  const favoriteCount = await getFavoriteCount(modelProfileId);

  revalidatePath(path);
  revalidatePath(`/girls/${girl.slug}`);
  revalidatePath("/mypage");
  revalidatePath("/girls");
  return {
    ok: true,
    isFavorite: result.isFavorite,
    favoriteCount,
    message: result.isFavorite ? "推し登録しました♡" : "推し登録を解除しました"
  };
}

export async function toggleFavorite(modelProfileId: string, path: string): Promise<ActionState> {
  return toggleFavoriteAction(modelProfileId, path);
}

export async function createSupportComment(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "ログインするとコメントできます", redirectTo: loginRedirect(value(formData, "path")) };
  const parsed = commentSchema.safeParse({
    modelProfileId: value(formData, "modelProfileId"),
    body: value(formData, "body"),
    path: value(formData, "path")
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message };

  const ngWords = ["死ね", "ばか", "ブス"];
  if (ngWords.some((word) => parsed.data.body.includes(word))) {
    return { ok: false, message: "送信できない言葉が含まれています" };
  }

  await db.supportComment.create({
    data: {
      userId: user.id,
      modelProfileId: parsed.data.modelProfileId,
      body: parsed.data.body,
      status: "APPROVED"
    }
  });
  revalidatePath(parsed.data.path);
  return { ok: true, message: "応援コメントを届けました" };
}

export async function applyToWork(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "ログインが必要です", redirectTo: loginRedirect(value(formData, "path")) };
  if (user.role !== "MODEL") {
    return { ok: false, message: "mimi girlsエントリーが必要です" };
  }
  const parsed = workApplicationSchema.safeParse({
    workOpportunityId: value(formData, "workOpportunityId"),
    message: value(formData, "message"),
    path: value(formData, "path")
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message };

  try {
    await createWorkApplication(user.id, parsed.data.workOpportunityId, parsed.data.message);
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "応募に失敗しました" };
  }

  revalidatePath(parsed.data.path);
  revalidatePath("/mypage");
  return { ok: true, message: "応募しました。結果はマイページで確認できます。", status: "applied" };
}

export async function applyToWorkAction(workOpportunityId: string): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "ログインが必要です", redirectTo: loginRedirect("/works"), status: "UNAUTHENTICATED" };
  if (user.role !== "MODEL") {
    return { ok: false, message: "mimi girls登録が必要です", status: "MODEL_REQUIRED" };
  }

  try {
    const alreadyApplied = await db.workApplication.findUnique({
      where: { userId_workOpportunityId: { userId: user.id, workOpportunityId } },
      select: { id: true }
    });
    await createWorkApplication(user.id, workOpportunityId);
    revalidatePath("/works");
    revalidatePath(`/works/${workOpportunityId}`);
    revalidatePath("/mypage");
    return {
      ok: true,
      message: alreadyApplied ? "この案件には応募済みです" : "応募しました。結果はマイページで確認できます。",
      status: alreadyApplied ? "already_applied" : "applied"
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "応募に失敗しました",
      status: "ERROR"
    };
  }
}

export async function updateMyModelProfile(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireRole(["MODEL"]);
  const profile = await db.modelProfile.findUnique({
    where: { userId: user.id },
    select: { slug: true }
  });
  if (!profile) return { ok: false, message: "プロフィールが見つかりません" };

  const parsed = profileUpdateSchema.safeParse({
    displayName: value(formData, "displayName"),
    region: value(formData, "region"),
    instagram: value(formData, "instagram"),
    bio: value(formData, "bio"),
    reason: value(formData, "reason"),
    goal: value(formData, "goal"),
    styleTags: value(formData, "styleTags"),
    interestTags: value(formData, "interestTags")
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message };

  await db.modelProfile.update({
    where: { userId: user.id },
    data: {
      displayName: parsed.data.displayName,
      region: parsed.data.region,
      prefecture: parsed.data.region,
      instagram: normalizeInstagram(parsed.data.instagram || ""),
      bio: parsed.data.bio || "",
      reason: parsed.data.reason || "",
      goal: parsed.data.goal || "",
      styleTags: tagsToJson(splitTags(parsed.data.styleTags || "")),
      interestTags: tagsToJson(splitTags(parsed.data.interestTags || ""))
    }
  });
  revalidatePath("/mypage");
  revalidatePath("/girls");
  revalidatePath(`/girls/${profile.slug}`);
  return { ok: true, message: "プロフィールを更新しました" };
}

export async function togglePublish(modelProfileId: string) {
  await requireRole(["ADMIN"]);
  const girl = await db.modelProfile.findUnique({ where: { id: modelProfileId } });
  if (!girl) return;
  await db.modelProfile.update({
    where: { id: modelProfileId },
    data: { isPublished: !girl.isPublished }
  });
  revalidatePath("/admin");
  revalidatePath("/girls");
}

export async function createWorkAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireRole(["ADMIN"]);
  const parsed = adminWorkSchema.safeParse({
    title: value(formData, "title"),
    category: value(formData, "category"),
    region: value(formData, "region"),
    description: value(formData, "description"),
    imageUrl: value(formData, "imageUrl"),
    deadline: value(formData, "deadline")
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message };
  await db.workOpportunity.create({
    data: {
      ...parsed.data,
      deadline: new Date(parsed.data.deadline)
    }
  });
  revalidatePath("/admin");
  revalidatePath("/works");
  return { ok: true, message: "PR案件を作成しました" };
}

export async function createMagazineIssueAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireRole(["ADMIN"]);
  const title = value(formData, "title");
  const description = value(formData, "description");
  if (!title || !description) return { ok: false, message: "タイトルと説明を入力してください" };
  await db.magazineIssue.create({
    data: {
      title,
      slug: `${makeSlug(title)}-${Date.now().toString(36)}`,
      coverImageUrl: value(formData, "coverImageUrl") || "/images/magazine/vol12.png",
      description,
      publishedAt: new Date()
    }
  });
  revalidatePath("/admin");
  revalidatePath("/magazine");
  return { ok: true, message: "雑誌号を作成しました" };
}

export async function createArticleAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireRole(["ADMIN"]);
  const issueId = value(formData, "issueId");
  const title = value(formData, "title");
  if (!issueId || !title) return { ok: false, message: "記事タイトルを入力してください" };
  await db.magazineArticle.create({
    data: {
      issueId,
      title,
      slug: `${makeSlug(title)}-${Date.now().toString(36)}`,
      category: value(formData, "category") || "編集部ピック",
      thumbnailUrl: value(formData, "thumbnailUrl") || "/images/girls/sakura.png",
      body: value(formData, "body") || "本文を準備中です。"
    }
  });
  revalidatePath("/admin");
  revalidatePath("/magazine");
  return { ok: true, message: "記事を作成しました" };
}

export async function noOpAction(_prev: ActionState): Promise<ActionState> {
  return formError(new Error("未対応の操作です"));
}
