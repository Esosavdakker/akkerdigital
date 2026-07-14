export const leadStatuses = [
  {
    value: "new",
    label: "Nieuw",
  },
  {
    value: "contacted",
    label: "Contact opgenomen",
  },
  {
    value: "qualified",
    label: "Gekwalificeerd",
  },
  {
    value: "proposal_sent",
    label: "Offerte gestuurd",
  },
  {
    value: "won",
    label: "Gewonnen",
  },
  {
    value: "lost",
    label: "Verloren",
  },
] as const;

export type LeadStatus = (typeof leadStatuses)[number]["value"];

export function getLeadStatusLabel(status: string) {
  return (
    leadStatuses.find((item) => item.value === status)?.label ?? status
  );
}
