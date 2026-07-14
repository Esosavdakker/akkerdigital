import Link from "next/link";
import { notFound } from "next/navigation";

import { getLeadById } from "@/server/queries/leads";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "long",
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

export default async function LeadDetailPage({
  params,
}: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/dashboard/leads"
        className="text-sm text-neutral-500 hover:text-neutral-950"
      >
        ← Terug naar leads
      </Link>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            Lead
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {lead.name}
          </h1>

          <p className="mt-2 text-neutral-600">
            {lead.company || "Geen bedrijfsnaam opgegeven"}
          </p>
        </div>

        <span className="w-fit rounded-full bg-neutral-200 px-4 py-2 text-sm font-medium">
          {lead.status}
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <section className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">
            Aanvraag
          </h2>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <DetailItem label="Naam" value={lead.name} />
            <DetailItem label="Bedrijf" value={lead.company || "—"} />

            <DetailItem
              label="E-mail"
              value={
                <a
                  href={`mailto:${lead.email}`}
                  className="hover:underline"
                >
                  {lead.email}
                </a>
              }
            />

            <DetailItem
              label="Website"
              value={
                lead.website ? (
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all hover:underline"
                  >
                    {lead.website}
                  </a>
                ) : (
                  "—"
                )
              }
            />

            <DetailItem
              label="Projecttype"
              value={formatProjectType(lead.project_type)}
            />

            <DetailItem
              label="Budget"
              value={formatBudget(lead.budget_range)}
            />

            <DetailItem
              label="Bron"
              value={lead.source}
            />

            <DetailItem
              label="Ontvangen"
              value={formatDate(lead.created_at)}
            />
          </dl>
        </section>

        <aside className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold">
            Bericht
          </h2>

          <p className="mt-5 whitespace-pre-wrap leading-7 text-neutral-700">
            {lead.message}
          </p>
        </aside>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-sm text-neutral-500">
        {label}
      </dt>

      <dd className="mt-1 font-medium text-neutral-950">
        {value}
      </dd>
    </div>
  );
}
