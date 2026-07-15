"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  updateLeadFollowUpSchema,
  type UpdateLeadFollowUpInput,
} from "@/lib/validations/lead";

export type UpdateLeadFollowUpResult = {
  success: boolean;
  message: string;
};

export async function updateLeadFollowUp(
  input: UpdateLeadFollowUpInput
): Promise<UpdateLeadFollowUpResult> {
  const parsed = updateLeadFollowUpSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ??
        "De follow-up is ongeldig.",
    };
  }

  const supabase = await createClient();

  const { data: authData, error: authError } =
    await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    return {
      success: false,
      message: "Je sessie is verlopen.",
    };
  }

  const { leadId, followUpAt, reason } = parsed.data;

  const { error } = await supabaseAdmin
    .from("leads")
    .update({
      follow_up_at: followUpAt,
      follow_up_reason: reason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) {
    console.error(error);

    return {
      success: false,
      message: "Follow-up kon niet worden opgeslagen.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${leadId}`);

  return {
    success: true,
    message: "Follow-up opgeslagen.",
  };
}