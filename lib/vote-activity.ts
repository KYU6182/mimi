import "server-only";

export type VoteActivityItem = {
  id: string;
  type: "vote" | "ranking" | "milestone";
  message: string;
  modelSlug?: string;
  createdAt: Date | string;
};

export async function getRecentVoteActivity(limit = 4): Promise<VoteActivityItem[]> {
  const now = new Date();
  const items: VoteActivityItem[] = [
    {
      id: "vote-yuina",
      type: "vote",
      message: "ゆいなに +12票入りました",
      modelSlug: "yuina",
      createdAt: now
    },
    {
      id: "vote-mio",
      type: "vote",
      message: "みおに +8票入りました",
      modelSlug: "mio",
      createdAt: new Date(now.getTime() - 90 * 1000)
    },
    {
      id: "vote-sakura",
      type: "vote",
      message: "さくらに +5票入りました",
      modelSlug: "sakura",
      createdAt: new Date(now.getTime() - 180 * 1000)
    },
    {
      id: "ranking-rising",
      type: "ranking",
      message: "急上昇ランキング更新中",
      createdAt: new Date(now.getTime() - 240 * 1000)
    }
  ];

  return items.slice(0, limit);
}
