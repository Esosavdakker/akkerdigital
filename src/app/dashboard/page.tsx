import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getLeads } from "@/server/queries/leads";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function DashboardPage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Leads
            </h1>
            <p className="mt-3 text-neutral-600">
              Ingekomen aanvragen uit het contactformulier.
            </p>
          </div>

          <div className="rounded-full border border-neutral-200 px-4 py-2 text-sm">
            {leads.length} {leads.length === 1 ? "lead" : "leads"}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200">
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
                      className="border-t border-neutral-200 align-top"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">{lead.name}</p>
                        <a
                          href={`mailto:${lead.email}`}
                          className="mt-1 block text-neutral-500 hover:text-neutral-950"
                        >
                          {lead.email}
                        </a>
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
      </main>

      <SiteFooter />
    </div>
  );
}