"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  createLeadNoteSchema,
  type CreateLeadNoteInput,
} from "@/lib/validations/lead";

export type CreateLeadNoteResult = {
  success: boolean;
  message: string;
};

export async function createLeadNote(
  input: CreateLeadNoteInput
): Promise<CreateLeadNoteResult> {
  const parsed = createLeadNoteSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ??
        "De notitie is ongeldig.",
    };
  }

  const supabase = await createClient();

  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    return {
      success: false,
      message: "Je sessie is verlopen. Log opnieuw in.",
    };
  }

  const { leadId, content } = parsed.data;

  const { error } = await supabaseAdmin
    .from("lead_notes")
    .insert({
      lead_id: leadId,
      content,
    });

  if (error) {
    console.error("Lead note insert error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    return {
      success: false,
      message: "De notitie kon niet worden opgeslagen.",
    };
  }

  revalidatePath(`/dashboard/leads/${leadId}`);

  return {
    success: true,
    message: "De notitie is toegevoegd.",
  };
}