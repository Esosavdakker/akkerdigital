import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium text-neutral-500">Contact</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Start een project met AkkerDigital.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          In de volgende fase bouwen we hier een echt contactformulier met validatie en database-opslag.
        </p>

        <div className="mt-14 rounded-3xl border border-neutral-200 p-8">
          <h2 className="text-2xl font-semibold">Formulier komt in Fase 3</h2>
          <p className="mt-4 leading-7 text-neutral-600">
            Dit wordt straks gekoppeld aan Supabase/PostgreSQL, zodat elke aanvraag als lead wordt opgeslagen.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}