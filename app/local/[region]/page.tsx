import AppShell from "@/components/AppShell";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import RegionFeature from "@/components/RegionFeature";
import WorkCard from "@/components/WorkCard";
import FinalEntryCta from "@/components/FinalEntryCta";
import { getLocalFeature, getRegionRanking } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function LocalPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const [local, ranking] = await Promise.all([getLocalFeature(region), getRegionRanking(region, 5)]);
  return (
    <AppShell>
      <Header title={`${local.region}特集`} centered />
      <div className="space-y-6 px-4 py-5">
        <SectionTitle eyebrow="local feature" title={`${local.region}特集`} />
        {local.feature ? (
          <p className="rounded-[22px] border border-line bg-paper p-4 text-sm font-bold leading-7 text-muted shadow-card">
            {local.feature.description}
          </p>
        ) : null}
        <RegionFeature region={local.region} girls={ranking} spots={local.spots} works={local.works} />
        <section>
          <SectionTitle title="地域PR案件" />
          <div className="space-y-3">
            {local.works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        </section>
        <FinalEntryCta />
      </div>
    </AppShell>
  );
}
