import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const dashboardItems = [
  "Leads beheren",
  "Projecten beheren",
  "Case studies beheren",
  "Audit requests bekijken",
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium text-neutral-500">Dashboard</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Admin dashboard placeholder.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          Later wordt dit een beveiligd dashboard voor leads, projecten, case studies en instellingen.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {dashboardItems.map((item) => (
            <div key={item} className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="font-semibold">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Wordt gekoppeld aan Supabase en authentication in een latere fase.
              </p>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}