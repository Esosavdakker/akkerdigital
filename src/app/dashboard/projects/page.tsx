export default function ProjectsPage() {
  return (
    <DashboardPlaceholder
      title="Projecten"
      description="Hier gaan we actieve, geplande en afgeronde projecten beheren."
    />
  );
}

function DashboardPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-neutral-500">
        AkkerDigital CRM
      </p>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {title}
      </h1>

      <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-8">
        <p className="text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}