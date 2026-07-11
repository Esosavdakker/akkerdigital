"use server";

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

  // Tijdelijke server-side test.
  // In de volgende fase vervangen we dit door een Supabase database insert.
  console.log("New AkkerDigital lead:", {
    name: data.name,
    email: data.email,
    company: data.company || null,
    website: data.website || null,
    projectType: data.projectType,
    budgetRange: data.budgetRange,
    message: data.message,
    createdAt: new Date().toISOString(),
  });

  return {
    success: true,
    message:
      "Je aanvraag is ontvangen. In de volgende fase slaan we deze op in de database.",
  };
}
