import Link from "next/link";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
      <div>
        <p className="mb-6 inline-flex rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600">
          Backend-first digital studio
        </p>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 md:text-6xl">
          Websites en digitale systemen die niet alleen mooi zijn, maar ook slim werken.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          AkkerDigital bouwt professionele websites, databases, dashboards en automatiseringen
          voor ondernemers die verder willen dan een standaard online visitekaartje.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#contact"
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Project starten
          </Link>

          <Link
            href="#backend"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-950 hover:bg-neutral-100"
          >
            Bekijk aanpak
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-950">AkkerDigital System</p>
              <p className="text-xs text-neutral-500">Project dashboard preview</p>
            </div>
            <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs text-white">
              MVP
            </span>
          </div>

          <div className="space-y-3">
            {[
              ["Leads", "Contact requests"],
              ["Projects", "Portfolio cases"],
              ["Database", "PostgreSQL planned"],
              ["Automation", "Workflows later"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
                <span className="text-sm text-neutral-500">{label}</span>
                <span className="text-sm font-medium text-neutral-950">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
