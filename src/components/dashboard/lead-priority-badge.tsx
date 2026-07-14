import {
  getLeadPriority,
  type LeadPriority,
} from "@/constants/lead-priority";

type LeadPriorityBadgeProps = {
  priority: LeadPriority | string;
};

export function LeadPriorityBadge({
  priority,
}: LeadPriorityBadgeProps) {
  const config = getLeadPriority(priority);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
}