"use server";

import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type ContactActionResult = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    console.error("Contact validation error:", parsed.error.flatten());

    return {
      success: false,
      message: "Controleer je gegevens en probeer het opnieuw.",
    };
  }

  const data = parsed.data;

  try {
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      email: data.email,
      company: data.company?.trim() || null,
      website: data.website?.trim() || null,
      project_type: data.projectType,
      budget_range: data.budgetRange,
      message: data.message,
      status: "new",
      source: "contact_form",
    });

    if (error) {
      console.error("Supabase insert error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return {
        success: false,
        message:
          "Je aanvraag kon niet worden opgeslagen. Probeer het opnieuw.",
      };
    }

    return {
      success: true,
      message: "Je aanvraag is ontvangen en opgeslagen.",
    };
  } catch (error) {
    console.error("Unexpected contact form error:", error);

    return {
      success: false,
      message:
        "Er ging onverwacht iets mis. Probeer het later opnieuw.",
    };
  }
}
