"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  updateLeadPrioritySchema,
  type UpdateLeadPriorityInput,
} from "@/lib/validations/lead";

export type UpdateLeadPriorityResult = {
  success: boolean;
  message: string;
};

export async function updateLeadPriority(
  input: UpdateLeadPriorityInput
): Promise<UpdateLeadPriorityResult> {
  const parsed = updateLeadPrioritySchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "De gekozen prioriteit is ongeldig.",
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

  const { leadId, priority } = parsed.data;

  const { error } = await supabaseAdmin
    .from("leads")
    .update({
      priority,
      updated_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (error) {
    console.error("Lead priority update error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    return {
      success: false,
      message: "De prioriteit kon niet worden bijgewerkt.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${leadId}`);

  return {
    success: true,
    message: "De prioriteit is bijgewerkt.",
  };
}