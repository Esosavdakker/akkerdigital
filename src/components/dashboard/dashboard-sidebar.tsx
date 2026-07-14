import Link from "next/link";

const navigation = [
  {
    label: "Overzicht",
    href: "/dashboard",
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
  },
  {
    label: "Projecten",
    href: "/dashboard/projects",
  },
  {
    label: "Klanten",
    href: "/dashboard/clients",
  },
  {
    label: "Portfolio",
    href: "/dashboard/portfolio",
  },
  {
    label: "Instellingen",
    href: "/dashboard/settings",
  },
];

export function DashboardSidebar() {
  return (
    <aside className="border-b border-neutral-200 bg-neutral-950 text-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/dashboard" className="font-semibold">
          AkkerDigital CRM
        </Link>
      </div>

      <nav className="flex gap-2 overflow-x-auto p-4 md:flex-col">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-xl px-4 py-3 text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}