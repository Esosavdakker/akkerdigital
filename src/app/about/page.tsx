import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium text-neutral-500">Over AkkerDigital</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Een digital studio met focus op structuur, systemen en groei.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          AkkerDigital helpt ondernemers met professionele websites en digitale systemen die niet alleen mooi ogen,
          maar ook praktisch werken aan de achterkant.
        </p>

        <div className="mt-14 rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
          <h2 className="text-2xl font-semibold">Backend-first aanpak</h2>
          <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
            De basis van AkkerDigital is dat een website meer kan zijn dan een online visitekaartje.
            Denk aan databases, dashboards, formulieren, automatiseringen, klantportalen en slimme tools.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}