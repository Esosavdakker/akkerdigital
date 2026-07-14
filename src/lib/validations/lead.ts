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