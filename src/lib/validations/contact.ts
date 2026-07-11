import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 tekens bevatten."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  company: z.string().optional(),
  website: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.startsWith("http://") || value.startsWith("https://"),
      "Gebruik een volledige URL, bijvoorbeeld https://voorbeeld.nl"
    ),
  projectType: z.enum(["website", "backend", "automation", "dashboard", "not_sure"]),
  budgetRange: z.enum(["under_1000", "1000_2500", "2500_5000", "5000_plus", "not_sure"]),
  message: z.string().min(10, "Bericht moet minimaal 10 tekens bevatten."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;