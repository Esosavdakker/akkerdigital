import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleCheckBig,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Users,
} from "lucide-react";

import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import {
  getLeadMetrics,
  getLeads,
} from "@/server/queries/leads";

const modules = [
  {
    title: "Leads",
    description:
      "Bekijk aanvragen, wijzig statussen en leg contactmomenten vast.",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    title: "Projecten",
    description:
      "Beheer actieve, geplande en afgeronde klantprojecten.",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Klanten",
    description:
      "Beheer klantgegevens, contactpersonen en relaties.",
    href: "/dashboard/clients",
    icon: BriefcaseBusiness,
  },
  {
    title: "Portfolio",
    description:
      "Beheer case studies en publicaties voor de website.",
    href: "/dashboard/portfolio",
    icon: LayoutDashboard,
  },
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Goedemorgen";
  }

  if (hour < 18) {
    return "Goedemiddag";
  }

  return "Goedenavond";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function DashboardPage() {
  const [metrics, leads] = await Promise.all([
    getLeadMetrics(),
    getLeads(),
  ]);

  const recentLeads = leads.slice(0, 5);

  const conversionRate =
    metrics.total === 0
      ? 0
      : Math.round((metrics.won / metrics.total) * 100);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="AkkerDigital Business Cockpit"
        title={`${getGreeting()} 👋`}
        description="Bekijk wat aandacht nodig heeft en ga direct verder met je belangrijkste werkzaamheden."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Totaal leads"
          value={metrics.total}
          description="Alle binnengekomen aanvragen"
          icon={<Users className="size-4" />}
        />

        <StatCard
          label="Nieuwe leads"
          value={metrics.new}
          description="Nog niet behandeld"
          icon={<FileText className="size-4" />}
        />

        <StatCard
          label="Gewonnen"
          value={metrics.won}
          description="Nieuwe klanten"
          icon={<CircleCheckBig className="size-4" />}
        />

        <StatCard
          label="Conversie"
          value={`${conversionRate}%`}
          description="Gewonnen van totaal"
          icon={<BriefcaseBusiness className="size-4" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader className="border-b">
            <div>
              <CardTitle>Recente leads</CardTitle>

              <CardDescription>
                De nieuwste aanvragen uit je contactformulier.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {recentLeads.length === 0 ? (
              <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                Er zijn nog geen leads binnengekomen.
              </div>
            ) : (
              <div className="divide-y">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/dashboard/leads/${lead.id}`}
                    className="flex flex-col gap-3 py-4 transition first:pt-0 last:pb-0 hover:opacity-75 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {lead.name}
                      </p>

                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {lead.company || lead.email}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <LeadStatusBadge status={lead.status} />

                      <span className="hidden text-xs text-muted-foreground md:block">
                        {formatDate(lead.created_at)}
                      </span>

                      <ArrowRight className="size-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/dashboard/leads"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              Alle leads bekijken
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Vandaag</CardTitle>

            <CardDescription>
              Een kort overzicht van je verkoopproces.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <DashboardSummaryRow
              label="Nieuwe aanvragen"
              value={metrics.new}
            />

            <DashboardSummaryRow
              label="Offertes verstuurd"
              value={metrics.proposalSent}
            />

            <DashboardSummaryRow
              label="Gewonnen leads"
              value={metrics.won}
            />

            <div className="rounded-xl bg-muted p-4">
              <p className="text-sm font-medium">
                Volgende uitbreiding
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Hier verschijnen straks follow-ups, achterstallige acties en
                afspraken voor vandaag.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold tracking-tight">
            Werkgebieden
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Ga direct naar een onderdeel van het beheerplatform.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.href}
                href={module.href}
                className="group"
              >
                <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardContent className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {module.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function DashboardSummaryRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border px-4 py-3">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="text-lg font-semibold">
        {value}
      </span>
    </div>
  );
}
   