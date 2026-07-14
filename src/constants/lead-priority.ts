export const leadPriorities = [
  {
    value: "low",
    label: "Laag",
    color: "border-green-200 bg-green-100 text-green-700",
  },
  {
    value: "medium",
    label: "Gemiddeld",
    color: "border-yellow-200 bg-yellow-100 text-yellow-800",
  },
  {
    value: "high",
    label: "Hoog",
    color: "border-red-200 bg-red-100 text-red-700",
  },
] as const;

export type LeadPriority =
  (typeof leadPriorities)[number]["value"];

export function getLeadPriority(priority: string) {
  return (
    leadPriorities.find((item) => item.value === priority) ?? {
      value: priority,
      label: priority,
      color: "border-neutral-200 bg-neutral-100 text-neutral-700",
    }
  );
}
