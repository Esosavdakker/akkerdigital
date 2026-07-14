import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 md:flex">
      <DashboardSidebar />

      <div className="min-w-0 flex-1">
        <DashboardHeader />

        <main className="p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}