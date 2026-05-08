import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import GrowthRecordTimeline from "@/components/GrowthRecordTimeline";
import Header from "@/components/Header";
import ProfileActions from "@/components/ProfileActions";
import ProfileHero from "@/components/ProfileHero";
import ProfileStoryCards from "@/components/ProfileStoryCards";
import ProfileTabs from "@/components/ProfileTabs";
import RelatedGirlsSection from "@/components/RelatedGirlsSection";
import SupportCommentsSection from "@/components/SupportCommentsSection";
import { getCurrentUser } from "@/lib/auth";
import { hasVotedToday, isFavorite } from "@/lib/data";
import {
  getGirlGrowthRecords,
  getGirlProfile,
  getGirlSupportComments,
  getRelatedGirlsByRegion
} from "@/lib/girls";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getGirlProfile(id);
  const girl = profile?.girl;
  return {
    title: girl ? `${girl.displayName} | mimi girls` : "mimi girls",
    description: girl?.bio ?? "mimi girlsのプロフィールページです。"
  };
}

export default async function GirlProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [profile, user] = await Promise.all([getGirlProfile(id), getCurrentUser()]);
  if (!profile) notFound();

  const { girl, regionRank, publicationCount } = profile;
  const path = `/girls/${girl.slug}`;
  const [voted, favorite, comments, relatedGirls, growthRecords] = await Promise.all([
    hasVotedToday(user?.id, girl.id),
    isFavorite(user?.id, girl.id),
    getGirlSupportComments(girl.id),
    getRelatedGirlsByRegion(girl.region, girl.id),
    getGirlGrowthRecords(girl.id, girl.displayName, girl.region, girl.createdAt)
  ]);

  return (
    <AppShell>
      <Header />
      <ProfileHero girl={girl} regionRank={regionRank} publicationCount={publicationCount} />

      <div className="space-y-5 px-3.5 py-4 min-[390px]:px-4">
        <ProfileActions
          modelProfileId={girl.id}
          initialVoted={voted}
          initialFavorite={favorite}
          initialFavoriteCount={girl._count.favorites}
          isSelf={user?.id === girl.userId}
          isLoggedIn={Boolean(user)}
          path={path}
        />

        <ProfileTabs />
        <div id="story" className="scroll-mt-20" />

        <ProfileStoryCards girl={girl} />
        <SupportCommentsSection comments={comments} modelProfileId={girl.id} path={path} />
        <GrowthRecordTimeline records={growthRecords} />
        <RelatedGirlsSection region={girl.region} girls={relatedGirls} />
      </div>
    </AppShell>
  );
}
