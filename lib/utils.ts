import type { ModelProfile } from "@prisma/client";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function splitTags(value?: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map((tag) => String(tag).trim()).filter(Boolean);
    }
  } catch {
    // Older seed data stores tags as comma-separated text.
  }
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function joinTags(tags: string[]) {
  return tags.map((tag) => tag.trim()).filter(Boolean).join(",");
}

export function tagsToJson(tags: string[]) {
  return JSON.stringify(tags.map((tag) => tag.trim()).filter(Boolean));
}

export function getJstDateString(date = new Date()) {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

export function calcRankingScore({
  votes,
  dailyGrowth,
  profileCompletion
}: {
  votes: number;
  dailyGrowth: number;
  profileCompletion: number;
}) {
  return votes * 1.0 + dailyGrowth * 0.3 + profileCompletion * 0.2;
}

export function profileCompletionScore(profile: ModelProfile) {
  const fields = [
    profile.displayName,
    profile.region,
    profile.prefecture,
    profile.bio,
    profile.reason,
    profile.goal,
    profile.editorComment,
    profile.styleTags,
    profile.interestTags,
    profile.mainImageUrl,
    profile.coverImageUrl
  ];
  return Math.round((fields.filter(Boolean).length / fields.length) * 100);
}

export function workCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    CAFE: "カフェ",
    SALON: "サロン",
    NAIL: "ネイル",
    APPAREL: "アパレル",
    COSMETIC: "コスメ",
    MODEL: "モデル",
    OTHER: "その他"
  };
  return labels[category] ?? category;
}

export function normalizeRegion(region: string) {
  const map: Record<string, string> = {
    fukuoka: "福岡",
    osaka: "大阪",
    tokyo: "東京",
    nagoya: "名古屋",
    kansai: "関西"
  };
  return map[region] ?? region;
}

export function makeSlug(value: string) {
  const roman: Record<string, string> = {
    ゆいな: "yuina",
    みお: "mio",
    あかり: "akari",
    りこ: "riko",
    さな: "sana",
    さくら: "sakura",
    あや: "aya",
    えりか: "erika"
  };
  if (roman[value]) return roman[value];
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || `girl-${Date.now().toString(36)}`;
}

export const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@mimi";
