import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  project_type: string;
  budget_range: string;
  message: string;
  status: string;
  source: string;
  created_at: string;
};

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(
      `
      id,
      name,
      email,
      company,
      website,
      project_type,
      budget_range,
      message,
      status,
      source,
      created_at
      `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch leads:", error);
    throw new Error("Leads konden niet worden opgehaald.");
  }

  return data ?? [];
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select(
      `
      id,
      name,
      email,
      company,
      website,
      project_type,
      budget_range,
      message,
      status,
      source,
      created_at
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch lead:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error("De lead kon niet worden opgehaald.");
  }

  return data;
}
