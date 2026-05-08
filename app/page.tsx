import AppShell from "@/components/AppShell";
import HomeImageHero from "@/components/home/HomeImageHero";
import TodayMimiGirl from "@/components/home/TodayMimiGirl";
import HomeActivityLog from "@/components/home/HomeActivityLog";
import HomeMonthlyEvents from "@/components/home/HomeMonthlyEvents";
import RankingPreview from "@/components/RankingPreview";
import FeaturedProfileCard from "@/components/FeaturedProfileCard";
import MagazinePreview from "@/components/MagazinePreview";
import PopularFeaturesSection from "@/components/PopularFeaturesSection";
import WorksSection from "@/components/WorksSection";
import SalonPartnersSection from "@/components/SalonPartnersSection";
import RegionalRankingSection from "@/components/RegionalRankingSection";
import CoverModelContestSection from "@/components/CoverModelContestSection";
import HomeGuideCards from "@/components/HomeGuideCards";
import LineCta from "@/components/LineCta";
import FinalJoinCta from "@/components/FinalJoinCta";
import SectionTitle from "@/components/SectionTitle";
import { getCurrentUser } from "@/lib/auth";
import {
  getGirls,
  getLatestIssue,
  hasVotedToday
} from "@/lib/data";
import { getTodayMimiGirl } from "@/lib/girls";
import { magazineArchives } from "@/lib/home-data";
import { getHomeActivityLogs } from "@/lib/activity";
import { getHomeEvents } from "@/lib/events";
import { getHomeRankingPreview } from "@/lib/rankings";

export default async function HomePage() {
  const [girls, todayGirl, activityLogs, monthlyEvents, issue, user, rankingPreview] = await Promise.all([
    getGirls({ sort: "popular" }),
    getTodayMimiGirl(),
    getHomeActivityLogs(8),
    getHomeEvents(),
    getLatestIssue(),
    getCurrentUser(),
    getHomeRankingPreview()
  ]);
  const featured = girls[1] ?? girls[0];
  const voted = featured ? await hasVotedToday(user?.id, featured.id) : false;

  return (
    <AppShell>
      <HomeImageHero />
      <div className="space-y-7 px-3.5 py-4 min-[390px]:px-4 min-[390px]:py-5">
        <TodayMimiGirl girl={todayGirl} />

        <HomeActivityLog logs={activityLogs} />

        <HomeMonthlyEvents events={monthlyEvents} />

        <section>
          <RankingPreview rankings={rankingPreview} />
        </section>

        {featured ? (
          <section>
            <SectionTitle eyebrow="pick up" title="注目プロフィール" href="/girls" />
            <FeaturedProfileCard
              girl={featured}
              hasVoted={voted}
              isSelf={user?.id === featured.userId}
              isLoggedIn={Boolean(user)}
            />
          </section>
        ) : null}

        <section>
          <SectionTitle eyebrow="magazine" title="WEB雑誌" href="/magazine" />
          <MagazinePreview issue={issue} archives={magazineArchives} />
        </section>

        <PopularFeaturesSection />

        <WorksSection />

        <SalonPartnersSection />

        <RegionalRankingSection />

        <CoverModelContestSection />

        <HomeGuideCards />

        <section>
          <SectionTitle eyebrow="line" title="LINE連携・推し活" href="/line" />
          <LineCta />
        </section>

        <FinalJoinCta />
      </div>
    </AppShell>
  );
}
