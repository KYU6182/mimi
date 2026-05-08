import bcrypt from "bcrypt";
import { PrismaClient, WorkCategory } from "@prisma/client";

const prisma = new PrismaClient();

const girls = [
  {
    email: "yuina.model@example.com",
    displayName: "ゆいな",
    slug: "yuina",
    region: "福岡",
    prefecture: "福岡",
    age: 21,
    instagram: "yuina_mimi",
    bio: "淡色カフェと韓国っぽコーデが好き。まだ知られていないかわいい場所を一緒に見つけたいです。",
    reason: "自分に自信がなくて一歩踏み出せなかったけど、誰かの好きになれる場所に挑戦したくて始めました。",
    goal: "mimiの表紙候補に選ばれて、福岡のかわいいを全国に届けること。",
    editorComment: "透明感のある表情と、少しずつ前に進むまっすぐな想いが魅力。福岡から見つけたいmimi girlです。",
    styleTags: "淡色,カフェ,韓国っぽ",
    interestTags: "旅行好き,メイク,写真",
    mainImageUrl: "/images/girls/yuina.png",
    coverImageUrl: "/images/hero.png",
    votes: 342,
    boosted: true
  },
  {
    email: "mio.model@example.com",
    displayName: "みお",
    slug: "mio",
    region: "大阪",
    prefecture: "大阪",
    age: 20,
    instagram: "mio_cafe",
    bio: "週末はカフェ巡り。写真に残したくなる空気感を大切にしています。",
    reason: "友だちに背中を押されて、好きな世界観をもっと発信したいと思いました。",
    goal: "関西のカフェ特集で巻頭に出ること。",
    editorComment: "写真の切り取り方にセンスがある、カフェ好きさんに見つけてほしい存在です。",
    styleTags: "カフェ,写真,ガーリー",
    interestTags: "フィルム,スイーツ,淡色",
    mainImageUrl: "/images/girls/mio.png",
    coverImageUrl: "/images/girls/profile-cover.png",
    votes: 298,
    boosted: false
  },
  {
    email: "akari.model@example.com",
    displayName: "あかり",
    slug: "akari",
    region: "名古屋",
    prefecture: "愛知",
    age: 22,
    instagram: "akari_nail",
    bio: "ネイルと美容が好き。手元から気分が上がるような投稿をしています。",
    reason: "地元でもかわいいを仕事にできることを証明したいです。",
    goal: "美容PR案件に挑戦してレビューの信頼感を育てること。",
    editorComment: "美容への丁寧な言葉が魅力。PR案件でも信頼感を育てられるmimi girlです。",
    styleTags: "ネイル,美容,淡色",
    interestTags: "セルフケア,コスメ,透明感",
    mainImageUrl: "/images/girls/akari.png",
    coverImageUrl: "/images/girls/profile-cover.png",
    votes: 275,
    boosted: false
  },
  {
    email: "riko.model@example.com",
    displayName: "りこ",
    slug: "riko",
    region: "東京",
    prefecture: "東京",
    age: 19,
    instagram: "riko_trip",
    bio: "韓国コスメと小旅行が好き。自然体でかわいく見えるメイクを研究中。",
    reason: "普通の毎日も、誰かの憧れに変えられるか試してみたかったから。",
    goal: "推し登録100人と、コスメPRの初採用。",
    editorComment: "背伸びしすぎない韓国っぽさが今のmimiにぴったり。等身大の憧れ感があります。",
    styleTags: "韓国,コスメ,旅行",
    interestTags: "メイク,ホテルステイ,淡色",
    mainImageUrl: "/images/girls/riko.png",
    coverImageUrl: "/images/girls/profile-cover.png",
    votes: 261,
    boosted: true
  },
  {
    email: "sana.model@example.com",
    displayName: "さな",
    slug: "sana",
    region: "福岡",
    prefecture: "福岡",
    age: 21,
    instagram: "sana_salon",
    bio: "サロンモデルとして透明感のあるヘアスタイルを発信しています。",
    reason: "福岡で撮影のお仕事に挑戦できる場所が欲しかったから。",
    goal: "ヘアサロンの年間モデルになること。",
    editorComment: "サロン撮影との相性がよく、地域の美容導線を広げてくれるモデルです。",
    styleTags: "サロンモデル,カフェ",
    interestTags: "ヘアケア,写真,朝活",
    mainImageUrl: "/images/girls/sana.png",
    coverImageUrl: "/images/girls/profile-cover.png",
    votes: 220,
    boosted: false
  },
  {
    email: "sakura.model@example.com",
    displayName: "さくら",
    slug: "sakura",
    region: "東京",
    prefecture: "東京",
    age: 20,
    instagram: "sakura_natural",
    bio: "ナチュラルで透明感のある雰囲気が好き。等身大のかわいさを届けたいです。",
    reason: "自分らしい写真で応援してもらえる経験を作りたくて参加しました。",
    goal: "地域代表としてmimi magazineに掲載されること。",
    editorComment: "透明感と自然体のバランスがきれい。雑誌企画に出てほしい空気を持っています。",
    styleTags: "透明感,ナチュラル",
    interestTags: "読書,カフェ,白シャツ",
    mainImageUrl: "/images/girls/sakura.png",
    coverImageUrl: "/images/girls/profile-cover.png",
    votes: 198,
    boosted: false
  },
  {
    email: "aya.model@example.com",
    displayName: "あや",
    slug: "aya",
    region: "大阪",
    prefecture: "大阪",
    age: 22,
    instagram: "aya_apparel",
    bio: "アパレルとガーリーコーデが好き。着回しのかわいさを研究しています。",
    reason: "ファッションをきっかけに同じ好きを持つ人とつながりたいです。",
    goal: "アパレル撮影モデルとして採用されること。",
    editorComment: "甘さのあるコーデをリアルに着こなせる、アパレルPRと相性のよいモデルです。",
    styleTags: "アパレル,ガーリー",
    interestTags: "古着,ヘアアレンジ,淡色",
    mainImageUrl: "/images/girls/aya.png",
    coverImageUrl: "/images/girls/profile-cover.png",
    votes: 176,
    boosted: false
  },
  {
    email: "erika.model@example.com",
    displayName: "えりか",
    slug: "erika",
    region: "福岡",
    prefecture: "福岡",
    age: 23,
    instagram: "erika_beauty",
    bio: "美容と淡色の世界観が好き。レビューはリアルな使い心地を大切にしています。",
    reason: "地元のかわいいお店やブランドを、モデルとして応援したいから。",
    goal: "コスメPRとカフェPRの両方に挑戦すること。",
    editorComment: "レビューの言葉がやさしく、地域ブランドのPRにも安心して起用できる存在です。",
    styleTags: "美容,淡色",
    interestTags: "スキンケア,カフェ,雑誌",
    mainImageUrl: "/images/girls/erika.png",
    coverImageUrl: "/images/girls/profile-cover.png",
    votes: 149,
    boosted: false
  }
];

const works = [
  ["福岡の新作カフェPRアンバサダー募集", WorkCategory.CAFE, "福岡", "/images/works/cafe.png", "新作ラテと季節スイーツをSNSで紹介するPR案件です。", "報酬 5,000円〜"],
  ["ヘアサロンのイメージモデル募集", WorkCategory.SALON, "福岡", "/images/works/salon.png", "透明感カラーの撮影に参加できるサロンモデル案件です。", "報酬 相談"],
  ["ネイルデザイン撮影ハンドモデル", WorkCategory.NAIL, "名古屋", "/images/works/nail.png", "春夏デザインのチップ撮影と着用レビューをお願いします。", "報酬 8,000円〜"],
  ["夏の新作アイテム着用モデル", WorkCategory.APPAREL, "大阪", "/images/works/apparel.png", "淡色ワンピースの着用撮影モデルを募集します。", "報酬 10,000円〜"],
  ["新作コスメPRモニター募集", WorkCategory.COSMETIC, "東京", "/images/works/cosme.png", "リップとチークの新色レビューを投稿するPR案件です。", "報酬 8,000円〜"]
] as const;

const salons = [
  ["Larme 表参道店", "東京", "東京", "ヘア", "/images/spots/room.png", "透明感カラーと韓国風レイヤーが得意な提携サロン。"],
  ["melt 原宿店", "東京", "東京", "ヘア", "/images/spots/room.png", "撮影モデル案件にも強い原宿のヘアサロン。"],
  ["ChouChou 心斎橋店", "大阪", "大阪", "ネイル", "/images/spots/nail.png", "淡色ニュアンスネイルの撮影協力サロン。"],
  ["Lily salon 梅田店", "大阪", "大阪", "ヘア", "/images/spots/room.png", "ガーリーなヘア撮影に向いた梅田のサロン。"],
  ["Nagi 栄店", "名古屋", "愛知", "まつげ", "/images/spots/room.png", "ナチュラルな目元づくりが人気の提携サロン。"],
  ["pluie 名古屋店", "名古屋", "愛知", "ネイル", "/images/spots/nail.png", "美容PRと連動しやすい名古屋のネイルサロン。"],
  ["Ciel 天神店", "福岡", "福岡", "ヘア", "/images/spots/room.png", "福岡mimi girlsの撮影に協力する透明感ヘアサロン。"],
  ["etoile nail", "福岡", "福岡", "ネイル", "/images/spots/nail.png", "淡色ネイルとカフェ撮影の相性がよい小さなサロン。"]
] as const;

async function main() {
  await prisma.workApplication.deleteMany();
  await prisma.coverContestEntry.deleteMany();
  await prisma.coverContest.deleteMany();
  await prisma.growthRecord.deleteMany();
  await prisma.supportComment.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.magazineArticle.deleteMany();
  await prisma.magazineIssue.deleteMany();
  await prisma.workOpportunity.deleteMany();
  await prisma.salonPartner.deleteMany();
  await prisma.shopSpot.deleteMany();
  await prisma.regionFeature.deleteMany();
  await prisma.modelProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password", 12);
  const modelUser = await prisma.user.create({
    data: { email: "model@example.com", passwordHash, role: "MODEL", nickname: "モデルユーザー", region: "福岡" }
  });
  const fanUser = await prisma.user.create({
    data: { email: "fan@example.com", passwordHash, role: "FAN", nickname: "mimi fan", region: "福岡" }
  });
  await prisma.user.create({
    data: { email: "admin@example.com", passwordHash, role: "ADMIN", nickname: "編集部", region: "東京" }
  });

  const createdGirls = [];
  for (const [index, girl] of girls.entries()) {
    const owner =
      index === 0
        ? modelUser
        : await prisma.user.create({
            data: {
              email: girl.email,
              passwordHash,
              role: "MODEL",
              nickname: girl.displayName,
              region: girl.region
            }
          });
    createdGirls.push(
      await prisma.modelProfile.create({
        data: {
          userId: owner.id,
          displayName: girl.displayName,
          slug: girl.slug,
          region: girl.region,
          prefecture: girl.prefecture,
          age: girl.age,
          instagram: girl.instagram,
          bio: girl.bio,
          reason: girl.reason,
          goal: girl.goal,
          editorComment: girl.editorComment,
          styleTags: girl.styleTags,
          interestTags: girl.interestTags,
          mainImageUrl: girl.mainImageUrl,
          coverImageUrl: girl.coverImageUrl,
          profileBoosted: girl.boosted,
          isPublished: true
        }
      })
    );
  }

  const botUsers = [];
  for (let i = 0; i < 70; i += 1) {
    botUsers.push(
      await prisma.user.create({
        data: {
          email: `fan+${i}@example.com`,
          passwordHash,
          role: "FAN",
          nickname: `mimi応援部${i + 1}`,
          region: girls[i % girls.length].region
        }
      })
    );
  }

  const base = new Date("2026-05-07T00:00:00.000Z");
  for (const [girlIndex, girl] of createdGirls.entries()) {
    const target = girls[girlIndex].votes;
    for (let i = 0; i < target; i += 1) {
      const voter = botUsers[i % botUsers.length];
      const day = new Date(base);
      day.setUTCDate(day.getUTCDate() - Math.floor(i / botUsers.length));
      await prisma.vote.create({
        data: {
          voterId: voter.id,
          modelProfileId: girl.id,
          votedDate: day.toISOString().slice(0, 10)
        }
      });
    }
  }

  await prisma.favorite.createMany({
    data: [
      { userId: fanUser.id, modelProfileId: createdGirls[0].id },
      { userId: fanUser.id, modelProfileId: createdGirls[1].id },
      { userId: botUsers[0].id, modelProfileId: createdGirls[0].id },
      { userId: botUsers[1].id, modelProfileId: createdGirls[0].id },
      { userId: botUsers[2].id, modelProfileId: createdGirls[1].id },
      { userId: botUsers[3].id, modelProfileId: createdGirls[2].id }
    ]
  });

  await prisma.supportComment.createMany({
    data: [
      { userId: fanUser.id, modelProfileId: createdGirls[0].id, body: "ゆいなちゃんの笑顔にいつも癒されてます。福岡代表応援してるよ♡" },
      { userId: botUsers[0].id, modelProfileId: createdGirls[0].id, body: "写真の雰囲気が本当にかわいいです。福岡代表応援してます！" },
      { userId: botUsers[1].id, modelProfileId: createdGirls[0].id, body: "今日も1票。表紙候補まで一緒に行こうね。" },
      { userId: botUsers[2].id, modelProfileId: createdGirls[1].id, body: "カフェ投稿いつも楽しみにしています。" },
      { userId: botUsers[3].id, modelProfileId: createdGirls[1].id, body: "みおちゃんの淡色写真、保存したくなるかわいさです。" },
      { userId: botUsers[4].id, modelProfileId: createdGirls[3].id, body: "韓国コスメのレビューがリアルで好きです！" }
    ]
  });

  await prisma.growthRecord.createMany({
    data: [
      { modelProfileId: createdGirls[0].id, title: "mimiに参加しました！", occurredAt: new Date("2026-04-01T00:00:00+09:00") },
      { modelProfileId: createdGirls[0].id, title: "初めて100票を達成しました！", occurredAt: new Date("2026-04-15T00:00:00+09:00") },
      { modelProfileId: createdGirls[0].id, title: "福岡ランキングTOP10入り", occurredAt: new Date("2026-04-28T00:00:00+09:00") },
      { modelProfileId: createdGirls[0].id, title: "表紙候補に選出されました！", occurredAt: new Date("2026-05-10T00:00:00+09:00") },
      { modelProfileId: createdGirls[1].id, title: "関西カフェ企画の候補になりました", occurredAt: new Date("2026-04-18T00:00:00+09:00") },
      { modelProfileId: createdGirls[2].id, title: "美容PR候補に入りました", occurredAt: new Date("2026-04-20T00:00:00+09:00") },
      { modelProfileId: createdGirls[3].id, title: "推し登録50人を達成しました", occurredAt: new Date("2026-04-26T00:00:00+09:00") }
    ]
  });

  const issue12 = await prisma.magazineIssue.create({
    data: {
      title: "mimi vol.12",
      slug: "vol-12",
      coverImageUrl: "/images/magazine/mimi-vol12-award.png",
      description: "私らしく、かわいく生きる。",
      publishedAt: new Date("2026-04-05T00:00:00+09:00")
    }
  });
  await prisma.magazineIssue.createMany({
    data: [
      {
        title: "mimi vol.11",
        slug: "vol-11",
        coverImageUrl: "/images/magazine/vol12.png",
        description: "春の淡色カフェ案内。",
        publishedAt: new Date("2026-03-05T00:00:00+09:00")
      },
      {
        title: "mimi vol.10",
        slug: "vol-10",
        coverImageUrl: "/images/magazine/vol12.png",
        description: "韓国っぽガーリーのはじめ方。",
        publishedAt: new Date("2026-02-05T00:00:00+09:00")
      }
    ]
  });
  await prisma.magazineArticle.createMany({
    data: [
      {
        issueId: issue12.id,
        title: "透明感メイクで叶えるナチュラル可愛いのつくり方",
        slug: "natural-clear-makeup",
        category: "巻頭特集",
        thumbnailUrl: "/images/girls/sakura.png",
        body: "肌の質感と淡い血色を主役にした、mimiらしい透明感メイク。"
      },
      {
        issueId: issue12.id,
        title: "春のカフェ巡りにおすすめの福岡カフェ3選",
        slug: "fukuoka-cafe-spring",
        category: "地域代表",
        thumbnailUrl: "/images/spots/cafe.png",
        body: "福岡mimi girlsが選ぶ、写真に残したいカフェ案内。"
      },
      {
        issueId: issue12.id,
        title: "韓国っぽコーデ特集",
        slug: "korean-style-feature",
        category: "人気の特集",
        thumbnailUrl: "/images/girls/riko.png",
        body: "いつもの服に少しだけ韓国っぽさを足す、リアルに着られるコーデ案。"
      },
      {
        issueId: issue12.id,
        title: "カフェ巡りコーデ",
        slug: "cafe-style-feature",
        category: "人気の特集",
        thumbnailUrl: "/images/girls/mio.png",
        body: "写真に残したくなる淡色コーデと小物の組み合わせ。"
      }
    ]
  });

  for (const [index, work] of works.entries()) {
    await prisma.workOpportunity.create({
      data: {
        title: work[0],
        category: work[1],
        region: work[2],
        imageUrl: work[3],
        description: work[4],
        rewardText: work[5],
        deadline: new Date(2026, 4, 23 + index)
      }
    });
  }

  await prisma.salonPartner.createMany({
    data: salons.map(([name, region, prefecture, category, imageUrl, description]) => ({
      name,
      region,
      prefecture,
      category,
      imageUrl,
      description,
      url: "https://example.com"
    }))
  });

  const coverContest = await prisma.coverContest.create({
    data: {
      title: "2026年5月 表紙モデル決定戦",
      slug: "cover-contest-2026-05",
      monthLabel: "2026年5月",
      startsAt: new Date("2026-05-01T00:00:00+09:00"),
      endsAt: new Date("2026-05-31T23:59:59+09:00"),
      isActive: true
    }
  });
  await prisma.coverContestEntry.createMany({
    data: createdGirls.slice(0, 6).map((girl) => ({
      contestId: coverContest.id,
      modelProfileId: girl.id
    }))
  });

  await prisma.regionFeature.create({
    data: {
      region: "福岡",
      title: "福岡特集 Fukuoka",
      description: "カフェ、美容、サロン撮影。福岡から始まるmimi girlsのリアルな推し活特集。"
    }
  });

  await prisma.shopSpot.createMany({
    data: [
      {
        region: "福岡",
        name: "cafe Lily",
        category: "カフェ",
        imageUrl: "/images/spots/cafe.png",
        description: "白い余白と季節のラテがかわいい淡色カフェ。",
        url: "https://example.com"
      },
      {
        region: "福岡",
        name: "kiki by float",
        category: "美容室",
        imageUrl: "/images/spots/room.png",
        description: "透明感カラーの撮影にも人気のサロン。",
        url: "https://example.com"
      },
      {
        region: "福岡",
        name: "etoile nail",
        category: "ネイル",
        imageUrl: "/images/spots/nail.png",
        description: "淡色ニュアンスネイルが得意な小さなサロン。",
        url: "https://example.com"
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
