import { LeadList } from "@/components/dashboard/lead-list";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import {
  getLeadMetrics,
  getLeads,
} from "@/server/queries/leads";

export default async function LeadsPage() {
  const [leads, metrics] = await Promise.all([
    getLeads(),
    getLeadMetrics(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="CRM"
        title="Leads"
        description="Bekijk, zoek en filter alle aanvragen uit het contactformulier."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Totaal leads"
          value={metrics.total}
          description="Alle aanvragen"
        />

        <StatCard
          label="Nieuwe leads"
          value={metrics.new}
          description="Nog niet behandeld"
        />

        <StatCard
          label="Offertes"
          value={metrics.proposalSent}
          description="Offerte verstuurd"
        />

        <StatCard
          label="Gewonnen"
          value={metrics.won}
          description="Nieuwe klanten"
        />
      </section>

      <section>
        <LeadList leads={leads} />
      </section>
    </div>
  );
}