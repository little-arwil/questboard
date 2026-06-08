import { AppPageHeader } from "@/components/prototype/AppShell";
import { CampaignCard } from "@/components/prototype/CampaignCard";
import { FilterControls } from "@/components/prototype/FilterControls";
import { campaigns } from "@/data/appMockData";

export default function CampaignBrowsePage() {
  return (
    <>
      <AppPageHeader
        eyebrow="Campaigns"
        title="Browse tables that already speak your language."
        body="Filter mock listings by schedule, language, experience, playstyle, and format. These controls are static for the prototype."
      />

      <FilterControls />

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </section>
    </>
  );
}
