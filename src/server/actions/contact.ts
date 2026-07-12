"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export type ContactActionResult = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Controleer je gegevens en probeer het opnieuw.",
    };
  }

  const data = parsed.data;

  const { error } = await supabaseAdmin.from("leads").insert({
    name: data.name,
    email: data.email,
    company: data.company || null,
    website: data.website || null,
    project_type: data.projectType,
    budget_range: data.budgetRange,
    message: data.message,
    status: "new",
    source: "contact_form",
  });

  if (error) {
    console.error("Supabase insert error:", error);

    return {
      success: false,
      message: "Opslaan is mislukt. Probeer het opnieuw.",
    };
  }

  return {
    success: true,
    message: "Je aanvraag is ontvangen en opgeslagen.",
  };
}
