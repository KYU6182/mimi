import "server-only";

import { db } from "@/lib/db";

export async function isFavorite(userId: string | undefined, modelProfileId: string): Promise<boolean> {
  if (!userId) return false;
  const favorite = await db.favorite.findUnique({
    where: { userId_modelProfileId: { userId, modelProfileId } }
  });
  return Boolean(favorite);
}

export async function addFavorite(userId: string, modelProfileId: string) {
  const existing = await db.favorite.findUnique({
    where: { userId_modelProfileId: { userId, modelProfileId } }
  });
  if (existing) return existing;

  return db.favorite.create({ data: { userId, modelProfileId } });
}

export async function removeFavorite(userId: string, modelProfileId: string) {
  const existing = await db.favorite.findUnique({
    where: { userId_modelProfileId: { userId, modelProfileId } }
  });
  if (!existing) return null;

  return db.favorite.delete({ where: { id: existing.id } });
}

export async function toggleFavorite(userId: string, modelProfileId: string) {
  const existing = await db.favorite.findUnique({
    where: { userId_modelProfileId: { userId, modelProfileId } }
  });
  if (existing) {
    await db.favorite.delete({ where: { id: existing.id } });
    return { isFavorite: false };
  }
  await db.favorite.create({ data: { userId, modelProfileId } });
  return { isFavorite: true };
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

export async function getFavoriteCount(modelProfileId: string): Promise<number> {
  return db.favorite.count({ where: { modelProfileId } });
}
