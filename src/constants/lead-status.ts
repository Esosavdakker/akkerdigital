export const leadStatuses = [
  {
    value: "new",
    label: "Nieuw",
    color:
      "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    value: "contacted",
    label: "Contact opgenomen",
    color:
      "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  {
    value: "qualified",
    label: "Gekwalificeerd",
    color:
      "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    value: "proposal_sent",
    label: "Offerte gestuurd",
    color:
      "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    value: "won",
    label: "Gewonnen",
    color:
      "bg-green-100 text-green-700 border-green-200",
  },
  {
    value: "lost",
    label: "Verloren",
    color:
      "bg-red-100 text-red-700 border-red-200",
  },
] as const;

export type LeadStatus =
  (typeof leadStatuses)[number]["value"];

export function getLeadStatus(status: string) {
  return (
    leadStatuses.find((item) => item.value === status) ??
    {
      value: status,
      label: status,
      color:
        "bg-neutral-100 text-neutral-700 border-neutral-200",
    }
  );
}

export function getLeadStatusLabel(status: string) {
  return getLeadStatus(status).label;
}

