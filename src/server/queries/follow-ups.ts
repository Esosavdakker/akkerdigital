import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type DashboardFollowUp = {
  id: string;
  name: string;
  company: string | null;
  follow_up_at: string;
  follow_up_reason: string | null;
  status: string;
};

export async function getUpcomingFollowUps(): Promise<
  DashboardFollowUp[]
> {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(
      `
      id,
      name,
      company,
      follow_up_at,
      follow_up_reason,
      status
      `
    )
    .not("follow_up_at", "is", null)
    .gte("follow_up_at", now)
    .order("follow_up_at", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Upcoming follow-ups query error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error(
      "Komende follow-ups konden niet worden opgehaald."
    );
  }

  return (data ?? []) as DashboardFollowUp[];
}

export async function getOverdueFollowUps(): Promise<
  DashboardFollowUp[]
> {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(
      `
      id,
      name,
      company,
      follow_up_at,
      follow_up_reason,
      status
      `
    )
    .not("follow_up_at", "is", null)
    .lt("follow_up_at", now)
    .not("status", "in", '("won","lost")')
    .order("follow_up_at", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Overdue follow-ups query error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error(
      "Achterstallige follow-ups konden niet worden opgehaald."
    );
  }

  return (data ?? []) as DashboardFollowUp[];
}

