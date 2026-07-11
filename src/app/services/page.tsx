import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const services = [
  {
    title: "Websites",
    description:
      "Professionele websites met een duidelijke structuur, snelle performance en ruimte voor groei.",
  },
  {
    title: "Backend systems",
    description:
      "Databases, dashboards, formulieren en interne tools die je website functioneel maken.",
  },
  {
    title: "Automation",
    description:
      "Slimme workflows die terugkerende handmatige taken verminderen en processen versnellen.",
  },
  {
    title: "Digital growth tools",
    description:
      "Calculators, audits en datagedreven tools die bezoekers helpen sneller actie te nemen.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium text-neutral-500">Services</p>

        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Digitale oplossingen die verder gaan dan alleen design.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          AkkerDigital bouwt websites, systemen en automatiseringen met een sterke technische basis.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="mt-3 leading-7 text-neutral-600">{service.description}</p>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
