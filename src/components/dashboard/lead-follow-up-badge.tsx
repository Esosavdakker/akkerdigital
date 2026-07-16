import {
  CalendarClock,
  CalendarDays,
  CircleAlert,
} from "lucide-react";

type LeadFollowUpBadgeProps = {
  followUpAt: string | null;
};

type FollowUpState =
  | "none"
  | "overdue"
  | "today"
  | "upcoming";

function getDateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatFollowUp(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getFollowUpState(
  followUpAt: string | null
): FollowUpState {
  if (!followUpAt) {
    return "none";
  }

  const followUpDate = new Date(followUpAt);

  if (Number.isNaN(followUpDate.getTime())) {
    return "none";
  }

  const now = new Date();

  if (followUpDate.getTime() < now.getTime()) {
    return "overdue";
  }

  if (getDateKey(followUpDate) === getDateKey(now)) {
    return "today";
  }

  return "upcoming";
}

export function LeadFollowUpBadge({
  followUpAt,
}: LeadFollowUpBadgeProps) {
  const state = getFollowUpState(followUpAt);

  if (state === "none" || !followUpAt) {
    return (
      <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
        Niet gepland
      </span>
    );
  }

  if (state === "overdue") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
        <CircleAlert className="size-3.5" />
        Achterstallig
      </span>
    );
  }

  if (state === "today") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
        <CalendarClock className="size-3.5" />
        Vandaag {formatFollowUp(followUpAt)}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
      <CalendarDays className="size-3.5" />
      {formatFollowUp(followUpAt)}
    </span>
  );
}