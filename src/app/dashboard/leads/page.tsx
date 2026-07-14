import Link from "next/link";

import { getLeads } from "@/server/queries/leads";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function LeadsPage() {
  const leads = await getLeads();

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
                  <th className="px-5 py-4 font-medium">Naam</th>
                  <th className="px-5 py-4 font-medium">Bedrijf</th>
                  <th className="px-5 py-4 font-medium">Project</th>
                  <th className="px-5 py-4 font-medium">Budget</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Datum</th>
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
                      {lead.project_type}
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {lead.budget_range}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
                        {lead.status}
                      </span>
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