import { LogoutButton } from "@/components/dashboard/logout-button";

export function DashboardHeader() {
  return (
    <header className="flex min-h-16 items-center justify-between border-b border-neutral-200 bg-white px-6">
      <div>
        <p className="text-sm font-medium text-neutral-950">
          AkkerDigital
        </p>
        <p className="text-xs text-neutral-500">
          Intern beheerplatform
        </p>
      </div>

      <LogoutButton />
    </header>
  );
}