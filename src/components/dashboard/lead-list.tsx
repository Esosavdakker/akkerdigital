"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Users, X } from "lucide-react";

import { LeadPriorityBadge } from "@/components/dashboard/lead-priority-badge";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getLeadPriority,
  leadPriorities,
} from "@/constants/lead-priority";
import {
  getLeadStatusLabel,
  leadStatuses,
} from "@/constants/lead-status";

type LeadListItem = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget_range: string;
  status: string;
  priority: string;
  created_at: string;
};

type LeadListProps = {
  leads: LeadListItem[];
};

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

export function LeadList({ leads }: LeadListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredLeads = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        lead.name.toLowerCase().includes(normalizedSearch) ||
        lead.email.toLowerCase().includes(normalizedSearch) ||
        lead.company?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        lead.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    leads,
    searchQuery,
    statusFilter,
    priorityFilter,
  ]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    statusFilter !== "all" ||
    priorityFilter !== "all";

  function clearFilters() {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
  }

  return (
    <div className="space-y-5">
      <div className="space-y-4 rounded-xl border bg-background p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Zoek op naam, bedrijf of e-mail..."
              className="pl-9"
            />
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="shrink-0"
            >
              <X className="size-4" />
              Filters wissen
            </Button>
          )}
        </div>

        <FilterGroup label="Status">
          <FilterButton
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          >
            Alle
          </FilterButton>

          {leadStatuses.map((status) => (
            <FilterButton
              key={status.value}
              active={statusFilter === status.value}
              onClick={() =>
                setStatusFilter(status.value)
              }
            >
              {status.label}
            </FilterButton>
          ))}
        </FilterGroup>

        <FilterGroup label="Prioriteit">
          <FilterButton
            active={priorityFilter === "all"}
            onClick={() => setPriorityFilter("all")}
          >
            Alle
          </FilterButton>

          {leadPriorities.map((priority) => (
            <FilterButton
              key={priority.value}
              active={
                priorityFilter === priority.value
              }
              onClick={() =>
                setPriorityFilter(priority.value)
              }
            >
              {priority.label}
            </FilterButton>
          ))}
        </FilterGroup>
      </div>

      <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          {filteredLeads.length}{" "}
          {filteredLeads.length === 1
            ? "lead gevonden"
            : "leads gevonden"}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {statusFilter !== "all" && (
            <span>
              Status:{" "}
              {getLeadStatusLabel(statusFilter)}
            </span>
          )}

          {priorityFilter !== "all" && (
            <span>
              Prioriteit:{" "}
              {getLeadPriority(priorityFilter).label}
            </span>
          )}
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-muted">
            <Users className="size-5 text-muted-foreground" />
          </div>

          <p className="mt-4 font-medium">
            Geen leads gevonden
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Pas je zoekopdracht of filters aan.
          </p>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="mt-5"
            >
              Filters wissen
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
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
                    Prioriteit
                  </th>
                  <th className="px-5 py-4 font-medium">
                    Datum
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t transition hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="font-medium hover:underline"
                      >
                        {lead.name}
                      </Link>

                      <p className="mt-1 text-muted-foreground">
                        {lead.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {lead.company || "—"}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatProjectType(
                        lead.project_type
                      )}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatBudget(
                        lead.budget_range
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <LeadStatusBadge
                        status={lead.status}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <LeadPriorityBadge
                        priority={lead.priority}
                      />
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <p className="w-20 shrink-0 text-sm font-medium">
        {label}
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {children}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          : "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
      }
    >
      {children}
    </button>
  );
}