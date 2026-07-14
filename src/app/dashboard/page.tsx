import Link from "next/link";

import { getLeadMetrics } from "@/server/queries/leads";

const modules = [
  {
    title: "Leads",
    description: "Bekijk en beheer alle binnengekomen aanvragen.",
    href: "/dashboard/leads",
  },
  {
    title: "Projecten",
    description: "Beheer actieve en toekomstige projecten.",
    href: "/dashboard/projects",
  },
  {
    title: "Klanten",
    description: "Beheer klantgegevens en relaties.",
    href: "/dashboard/clients",
  },
  {
    title: "Portfolio",
    description: "Beheer portfolio-items en case studies.",
    href: "/dashboard/portfolio",
  },
];

export default async function DashboardPage() {
  const metrics = await getLeadMetrics();

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-neutral-500">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Welkom bij AkkerDigital CRM
        </h1>

        <p className="mt-3 text-neutral-600">
          Beheer leads, klanten, projecten en portfolio vanuit één centrale omgeving.
        </p>
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

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-400 hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold">
              {module.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {module.description}
            </p>
          </Link>
        ))}
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