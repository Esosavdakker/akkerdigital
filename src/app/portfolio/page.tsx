import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const projects = [
  {
    title: "AkkerDigital Platform",
    type: "Internal project",
    description:
      "De eigen AkkerDigital website wordt gebouwd als backend-first platform met database, dashboard en lead-systeem.",
  },
  {
    title: "Website ROI Calculator",
    type: "Planned tool",
    description:
      "Een interactieve calculator waarmee bezoekers kunnen inschatten wat een betere website kan opleveren.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm font-medium text-neutral-500">Portfolio</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Cases en systemen in ontwikkeling.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          Hier komen projecten, case studies en technische builds van AkkerDigital.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.title} className="rounded-2xl border border-neutral-200 p-6">
              <p className="text-sm text-neutral-500">{project.type}</p>
              <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
              <p className="mt-3 leading-7 text-neutral-600">{project.description}</p>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}