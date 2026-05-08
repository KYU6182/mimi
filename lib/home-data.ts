export type MagazineArchiveItem = {
  volume: string;
  label: string;
  imageUrl: string;
};

export type PopularFeature = {
  title: string;
  english: string;
  imageUrl: string;
  href: string;
};

export type HomeWork = {
  title: string;
  subtitle: string;
  category: string;
  reward: string;
  deadline: string;
  imageUrl: string;
};

export type SalonPartner = {
  name: string;
  area: string;
  category: string;
  imageUrl: string;
};

export type RegionalRankingItem = {
  rank: number;
  name: string;
  slug: string;
  votes: number;
  imageUrl: string;
};

export type CoverContestItem = {
  rank: number;
  handle: string;
  slug: string;
  votes: number;
  imageUrl: string;
};

export type HomeGuideCard = {
  title: string;
  description: string;
  button: string;
  href: string;
  tone: "event" | "instagram" | "guide" | "line";
  imageUrl: string;
};

export const magazineArchives: MagazineArchiveItem[] = [
  { volume: "vol.40", label: "透明感メイク", imageUrl: "/images/magazine/vol12.png" },
  { volume: "vol.39", label: "カフェ巡り", imageUrl: "/images/girls/mio.png" },
  { volume: "vol.38", label: "春ネイル", imageUrl: "/images/works/nail.png" }
];

export const popularFeatures: PopularFeature[] = [
  {
    title: "韓国っぽコーデ特集",
    english: "KOREAN STYLE",
    imageUrl: "/images/girls/riko.png",
    href: "/magazine"
  },
  {
    title: "カフェ巡りコーデ",
    english: "CAFE STYLE",
    imageUrl: "/images/girls/mio.png",
    href: "/magazine"
  }
];

export const homeWorks: HomeWork[] = [
  {
    title: "アパレルPRモデル",
    subtitle: "新作アイテム着用",
    category: "モデル",
    reward: "報酬 10,000円〜",
    deadline: "締切 5/31",
    imageUrl: "/images/works/apparel.png"
  },
  {
    title: "コスメPR",
    subtitle: "SNS投稿",
    category: "PR案件",
    reward: "報酬 8,000円〜",
    deadline: "締切 5/29",
    imageUrl: "/images/works/cosme.png"
  },
  {
    title: "カフェ紹介アンバサダー",
    subtitle: "体験レポート",
    category: "アンバサダー",
    reward: "報酬 5,000円〜",
    deadline: "締切 5/27",
    imageUrl: "/images/works/cafe.png"
  },
  {
    title: "サロンモデル",
    subtitle: "撮影モデル募集",
    category: "動画・配信",
    reward: "報酬 相談",
    deadline: "締切 6/02",
    imageUrl: "/images/works/salon.png"
  }
];

export const salonPartnersByRegion: Record<string, SalonPartner[]> = {
  東京: [
    { name: "Larme 表参道店", area: "東京", category: "ヘア", imageUrl: "/images/girls/riko.png" },
    { name: "melt 原宿店", area: "東京", category: "ヘア", imageUrl: "/images/girls/sakura.png" }
  ],
  大阪: [
    { name: "ChouChou 心斎橋店", area: "大阪", category: "ネイル", imageUrl: "/images/works/nail.png" },
    { name: "Lily salon 梅田店", area: "大阪", category: "ヘア", imageUrl: "/images/girls/mio.png" }
  ],
  名古屋: [
    { name: "Nagi 栄店", area: "名古屋", category: "まつげ", imageUrl: "/images/girls/akari.png" },
    { name: "pluie 名古屋店", area: "名古屋", category: "ネイル", imageUrl: "/images/works/nail.png" }
  ],
  福岡: [
    { name: "Ciel 天神店", area: "福岡", category: "ヘア", imageUrl: "/images/girls/sana.png" },
    { name: "etoile nail", area: "福岡", category: "ネイル", imageUrl: "/images/spots/nail.png" }
  ]
};

export const regionalRankings: Record<string, RegionalRankingItem[]> = {
  東京: [
    { rank: 1, name: "さくら", slug: "sakura", votes: 1934, imageUrl: "/images/girls/sakura.png" },
    { rank: 2, name: "りこ", slug: "riko", votes: 1624, imageUrl: "/images/girls/riko.png" },
    { rank: 3, name: "まい", slug: "riko", votes: 1482, imageUrl: "/images/girls/erika.png" }
  ],
  大阪: [
    { rank: 1, name: "みお", slug: "mio", votes: 1368, imageUrl: "/images/girls/mio.png" },
    { rank: 2, name: "あや", slug: "aya", votes: 1120, imageUrl: "/images/girls/aya.png" },
    { rank: 3, name: "ゆめ", slug: "mio", votes: 980, imageUrl: "/images/girls/sakura.png" }
  ],
  名古屋: [
    { rank: 1, name: "あかり", slug: "akari", votes: 1327, imageUrl: "/images/girls/akari.png" },
    { rank: 2, name: "まな", slug: "akari", votes: 1021, imageUrl: "/images/girls/erika.png" },
    { rank: 3, name: "れい", slug: "akari", votes: 870, imageUrl: "/images/girls/riko.png" }
  ],
  福岡: [
    { rank: 1, name: "ゆいな", slug: "yuina", votes: 1842, imageUrl: "/images/girls/yuina.png" },
    { rank: 2, name: "さな", slug: "sana", votes: 1128, imageUrl: "/images/girls/sana.png" },
    { rank: 3, name: "えりか", slug: "erika", votes: 754, imageUrl: "/images/girls/erika.png" }
  ]
};

export const coverContestRanking: CoverContestItem[] = [
  { rank: 1, handle: "@yuna__02", slug: "yuina", votes: 12345, imageUrl: "/images/girls/yuina.png" },
  { rank: 2, handle: "@sari__07", slug: "sana", votes: 9876, imageUrl: "/images/girls/sana.png" },
  { rank: 3, handle: "@mirei__06", slug: "mio", votes: 8765, imageUrl: "/images/girls/mio.png" },
  { rank: 4, handle: "@reina__28", slug: "riko", votes: 6543, imageUrl: "/images/girls/riko.png" },
  { rank: 5, handle: "@kokone__12", slug: "akari", votes: 4321, imageUrl: "/images/girls/akari.png" }
];

export const homeGuideCards: HomeGuideCard[] = [
  {
    title: "mimi EVENT",
    description: "オーディションや撮影会など最新イベント情報をチェック",
    button: "チェックする",
    href: "/works",
    tone: "event",
    imageUrl: "/images/girls/aya.png"
  },
  {
    title: "公式Instagram",
    description: "毎日かわいいをお届け中♡",
    button: "フォローする",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
    tone: "instagram",
    imageUrl: "/images/girls/sakura.png"
  },
  {
    title: "はじめての方へ GUIDE",
    description: "エントリーの流れや使い方をわかりやすくご案内",
    button: "読む",
    href: "/register",
    tone: "guide",
    imageUrl: "/images/magazine/vol12.png"
  },
  {
    title: "mi-mi LINE",
    description: "LINE限定で情報をもっと便利に。限定配信やプレゼントも♡",
    button: "友だち追加する",
    href: process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@mimi",
    tone: "line",
    imageUrl: "/images/girls/erika.png"
  }
];
