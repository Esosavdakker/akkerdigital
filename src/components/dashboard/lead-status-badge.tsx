import {
  getLeadStatus,
  type LeadStatus,
} from "@/constants/lead-status";

type LeadStatusBadgeProps = {
  status: LeadStatus | string;
};

export function LeadStatusBadge({
  status,
}: LeadStatusBadgeProps) {
  const statusConfig = getLeadStatus(status);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusConfig.color}`}
    >
      {statusConfig.label}
    </span>
  );
}
