import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LeadFollowUpForm } from "@/components/dashboard/lead-followup-form";
import { LeadNoteForm } from "@/components/dashboard/lead-note-form";
import { LeadNoteList } from "@/components/dashboard/lead-note-list";
import { LeadPriorityBadge } from "@/components/dashboard/lead-priority-badge";
import { LeadPriorityForm } from "@/components/dashboard/lead-priority-form";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import { LeadStatusForm } from "@/components/dashboard/lead-status-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LeadPriority } from "@/constants/lead-priority";
import type { LeadStatus } from "@/constants/lead-status";
import { getLeadNotes } from "@/server/queries/lead-notes";
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

function formatSource(value: string) {
  const labels: Record<string, string> = {
    contact_form: "Contactformulier",
  };

  return labels[value] ?? value;
}

export default async function LeadDetailPage({
  params,
}: LeadDetailPageProps) {
  const { id } = await params;

  const [lead, notes] = await Promise.all([
    getLeadById(id),
    getLeadNotes(id),
  ]);

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/dashboard/leads"
        className="inline-flex text-sm text-muted-foreground transition hover:text-foreground"
      >
        ← Terug naar leads
      </Link>

      <header className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Lead
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {lead.name}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {lead.company || "Geen bedrijfsnaam opgegeven"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <LeadStatusBadge status={lead.status} />
          <LeadPriorityBadge priority={lead.priority} />
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Aanvraaggegevens</CardTitle>
          </CardHeader>

          <CardContent>
            <dl className="grid gap-6 sm:grid-cols-2">
              <DetailItem
                label="Naam"
                value={lead.name}
              />

              <DetailItem
                label="Bedrijf"
                value={lead.company || "—"}
              />

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
                value={formatSource(lead.source)}
              />

              <DetailItem
                label="Ontvangen"
                value={formatDate(lead.created_at)}
              />

              <DetailItem
                label="Volgende follow-up"
                value={
                  lead.follow_up_at
                    ? formatDate(lead.follow_up_at)
                    : "Nog niet gepland"
                }
              />

              <DetailItem
                label="Reden follow-up"
                value={lead.follow_up_reason || "—"}
              />
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Bericht</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="whitespace-pre-wrap leading-7 text-muted-foreground">
                {lead.message}
              </p>
            </CardContent>
          </Card>

          <LeadStatusForm
            leadId={lead.id}
            currentStatus={lead.status as LeadStatus}
          />

          <LeadPriorityForm
            leadId={lead.id}
            currentPriority={lead.priority as LeadPriority}
          />

          <LeadFollowUpForm
            leadId={lead.id}
            currentFollowUpAt={lead.follow_up_at}
            currentReason={lead.follow_up_reason}
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <LeadNoteList notes={notes} />
        <LeadNoteForm leadId={lead.id} />
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">
        {label}
      </dt>

      <dd className="mt-1 font-medium">
        {value}
      </dd>
    </div>
  );
}