"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  updateLeadStatusSchema,
  type UpdateLeadStatusInput,
} from "@/lib/validations/lead";

export type UpdateLeadStatusResult = {
  success: boolean;
  message: string;
};

export async function updateLeadStatus(
  input: UpdateLeadStatusInput
): Promise<UpdateLeadStatusResult> {
  const parsed = updateLeadStatusSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "De gekozen status is ongeldig.",
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

  const { leadId, status } = parsed.data;

  const { error } = await supabaseAdmin
    .from("leads")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) {
    console.error("Lead status update error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    return {
      success: false,
      message: "De leadstatus kon niet worden bijgewerkt.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${leadId}`);

  return {
    success: true,
    message: "De leadstatus is bijgewerkt.",
  };
}
