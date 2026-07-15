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
  priority: string;
  follow_up_at: string | null;
  follow_up_reason: string | null;
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
      priority,
      follow_up_at,
      follow_up_reason,
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
      priority,
      follow_up_at,
      follow_up_reason,
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

export type LeadMetrics = {
  total: number;
  new: number;
  proposalSent: number;
  won: number;
};

export async function getLeadMetrics(): Promise<LeadMetrics> {
  const [
    totalResult,
    newResult,
    proposalSentResult,
    wonResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true }),

    supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),

    supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "proposal_sent"),

    supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "won"),
  ]);

  const firstError =
    totalResult.error ||
    newResult.error ||
    proposalSentResult.error ||
    wonResult.error;

  if (firstError) {
    console.error("Failed to fetch lead metrics:", {
      code: firstError.code,
      message: firstError.message,
      details: firstError.details,
      hint: firstError.hint,
    });

    throw new Error("De leadstatistieken konden niet worden opgehaald.");
  }

  return {
    total: totalResult.count ?? 0,
    new: newResult.count ?? 0,
    proposalSent: proposalSentResult.count ?? 0,
    won: wonResult.count ?? 0,
  };
}
