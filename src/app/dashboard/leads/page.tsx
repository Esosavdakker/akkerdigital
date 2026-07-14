import Link from "next/link";

import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import {
  getLeadMetrics,
  getLeads,
} from "@/server/queries/leads";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatProjectType(value: string) {
  const labels: Record<string, string> = {
    website: "Website",
    backend: "Backend-systeem",
    automation: "Automatisering",
    dashboard: "Dashboard",
    not_sure: "Nog niet zeker",
  };

  return labels[value] ?? value;
}

function formatBudget(value: string) {
  const labels: Record<string, string> = {
    under_1000: "Onder €1.000",
    "1000_2500": "€1.000 – €2.500",
    "2500_5000": "€2.500 – €5.000",
    "5000_plus": "€5.000+",
    not_sure: "Nog niet zeker",
  };

  return labels[value] ?? value;
}

export default async function LeadsPage() {
  const [leads, metrics] = await Promise.all([
    getLeads(),
    getLeadMetrics(),
  ]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            CRM
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Leads
          </h1>

          <p className="mt-3 text-neutral-600">
            Ingekomen aanvragen uit het contactformulier.
          </p>
        </div>

        <div className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm">
          {leads.length} {leads.length === 1 ? "lead" : "leads"}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {leads.length === 0 ? (
          <div className="p-8 text-sm text-neutral-600">
            Er zijn nog geen leads.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Naam
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Bedrijf
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Project
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Budget
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Datum
                  </th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-neutral-200 transition hover:bg-neutral-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="font-medium hover:underline"
                      >
                        {lead.name}
                      </Link>

                      <p className="mt-1 text-neutral-500">
                        {lead.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {lead.company || "—"}
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {formatProjectType(lead.project_type)}
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {formatBudget(lead.budget_range)}
                    </td>

                    <td className="px-5 py-4">
                      <LeadStatusBadge status={lead.status} />
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <p className="text-sm font-medium text-neutral-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold">
        {value}
      </p>

      <p className="mt-2 text-sm text-neutral-500">
        {description}
      </p>
    </div>
  );
}