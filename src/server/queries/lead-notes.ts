import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type LeadNote = {
  id: string;
  lead_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export async function getLeadNotes(
  leadId: string
): Promise<LeadNote[]> {
  const { data, error } = await supabaseAdmin
    .from("lead_notes")
    .select(
      `
      id,
      lead_id,
      content,
      created_at,
      updated_at
      `
    )
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch lead notes:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error("De notities konden niet worden opgehaald.");
  }

  return data ?? [];
}