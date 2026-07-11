import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactForm } from "@/components/sections/contact-form";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />

      <main className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-medium text-neutral-500">Contact</p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Start een project met AkkerDigital.
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Vul je projectinformatie in. Dit formulier valideert nu al je input.
            In de volgende fase koppelen we dit aan Supabase/PostgreSQL.
          </p>

          <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-medium">Volgende backend-stap</p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Elke aanvraag wordt straks opgeslagen als lead met status, projecttype,
              budgetindicatie en datum.
            </p>
          </div>
        </div>

        <ContactForm />
      </main>

      <SiteFooter />
    </div>
  );
}