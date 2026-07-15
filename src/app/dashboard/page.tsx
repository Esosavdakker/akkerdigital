import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CircleAlert,
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
  getUpcomingFollowUps,
  getOverdueFollowUps,
} from "@/server/queries/follow-ups";

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
      "Beheer actieve en geplande projecten.",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Klanten",
    description:
      "Beheer klantgegevens en contactpersonen.",
    href: "/dashboard/clients",
    icon: BriefcaseBusiness,
  },
  {
    title: "Portfolio",
    description:
      "Beheer portfolio-items voor de website.",
    href: "/dashboard/portfolio",
    icon: LayoutDashboard,
  },
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";

  return "Goedenavond";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatFollowUpDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function DashboardPage() {
  const [
    metrics,
    leads,
    followUps,
    overdueFollowUps,
  ] = await Promise.all([
    getLeadMetrics(),
    getLeads(),
    getUpcomingFollowUps(),
    getOverdueFollowUps(),
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
        description="Welkom terug. Dit is jouw dagelijkse overzicht."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Totaal leads"
          value={metrics.total}
          description="Alle aanvragen"
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
          description="Lead → Klant"
          icon={<BriefcaseBusiness className="size-4" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">

          <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <CircleAlert className="size-5 text-red-500" />
              Achterstallige follow-ups
            </CardTitle>

            <CardDescription>
              Leads die direct aandacht nodig hebben.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {overdueFollowUps.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center">
                <p className="font-medium">
                  🎉 Geen achterstallige follow-ups
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Mooi! Alles is bijgewerkt.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {overdueFollowUps.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/dashboard/leads/${lead.id}`}
                    className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-muted/40"
                  >
                    <div>
                      <p className="font-medium">
                        {lead.name}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {lead.follow_up_reason || "Geen reden opgegeven"}
                      </p>
                    </div>

                    <span className="text-xs text-red-600">
                      {formatFollowUpDate(
                        lead.follow_up_at
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="size-5" />
              Komende follow-ups
            </CardTitle>

            <CardDescription>
              Geplande opvolgmomenten.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {followUps.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center">
                <p className="font-medium">
                  Geen follow-ups gepland
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Plan een follow-up vanuit een lead.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {followUps.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/dashboard/leads/${lead.id}`}
                    className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-muted/40"
                  >
                    <div>
                      <p className="font-medium">
                        {lead.name}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {lead.follow_up_reason ||
                          "Follow-up"}
                      </p>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {formatFollowUpDate(
                        lead.follow_up_at
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader className="border-b">
            <CardTitle>
              Recente leads
            </CardTitle>

            <CardDescription>
              De vijf nieuwste aanvragen.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/dashboard/leads/${lead.id}`}
                  className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-muted/40"
                >
                  <div>
                    <p className="font-medium">
                      {lead.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {lead.company || lead.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <LeadStatusBadge
                      status={lead.status}
                    />

                    <span className="hidden text-xs text-muted-foreground lg:block">
                      {formatDate(
                        lead.created_at
                      )}
                    </span>

                    <ArrowRight className="size-4" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Werkgebieden
          </h2>

          <p className="text-sm text-muted-foreground">
            Kies waar je verder wilt werken.
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
                <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardContent className="flex items-start gap-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-foreground text-background">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {module.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
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