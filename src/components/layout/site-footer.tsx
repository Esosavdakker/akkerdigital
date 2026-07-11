export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} AkkerDigital.</p>
        <p>Websites · Databases · Dashboards · Automations</p>
      </div>
    </footer>
  );
}
