import { z } from "zod";

export const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
]);

export const updateLeadStatusSchema = z.object({
  leadId: z.string().uuid("Ongeldig lead-ID."),
  status: leadStatusSchema,
});

export type UpdateLeadStatusInput = z.infer<
  typeof updateLeadStatusSchema
>;

export const leadPrioritySchema = z.enum([
  "low",
  "medium",
  "high",
]);

export const updateLeadPrioritySchema = z.object({
  leadId: z.string().uuid("Ongeldig lead-ID."),
  priority: leadPrioritySchema,
});

export type UpdateLeadPriorityInput = z.infer<
  typeof updateLeadPrioritySchema
>;

export const createLeadNoteSchema = z.object({
  leadId: z.string().uuid("Ongeldig lead-ID."),
  content: z
    .string()
    .trim()
    .min(2, "De notitie moet minimaal 2 tekens bevatten.")
    .max(5000, "De notitie mag maximaal 5000 tekens bevatten."),
});

export type CreateLeadNoteInput = z.infer<
  typeof createLeadNoteSchema
>;

export const updateLeadFollowUpSchema = z.object({
  leadId: z.string().uuid("Ongeldig lead-ID."),
  followUpAt: z
    .string()
    .min(1, "Kies een datum en tijd.")
    .refine(
      (value) => !Number.isNaN(new Date(value).getTime()),
      "Ongeldige datum of tijd."
    ),
  reason: z
    .string()
    .trim()
    .min(2, "De reden moet minimaal 2 tekens bevatten.")
    .max(500, "De reden mag maximaal 500 tekens bevatten."),
});

export type UpdateLeadFollowUpInput = z.infer<
  typeof updateLeadFollowUpSchema
>;
