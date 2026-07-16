"use client";

import {
  ArrowDownAZ,
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarClock,
  Flag,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LeadSortOption =
  | "newest"
  | "oldest"
  | "name"
  | "priority"
  | "follow_up";

type LeadSortSelectProps = {
  value: LeadSortOption;
  onValueChange: (value: LeadSortOption) => void;
};

export function LeadSortSelect({
  value,
  onValueChange,
}: LeadSortSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(newValue) =>
        onValueChange(newValue as LeadSortOption)
      }
    >
      <SelectTrigger className="w-full sm:w-56">
        <SelectValue placeholder="Sorteer leads" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="newest">
          <span className="flex items-center gap-2">
            <CalendarArrowDown className="size-4" />
            Nieuwste eerst
          </span>
        </SelectItem>

        <SelectItem value="oldest">
          <span className="flex items-center gap-2">
            <CalendarArrowUp className="size-4" />
            Oudste eerst
          </span>
        </SelectItem>

        <SelectItem value="name">
          <span className="flex items-center gap-2">
            <ArrowDownAZ className="size-4" />
            Naam A–Z
          </span>
        </SelectItem>

        <SelectItem value="priority">
          <span className="flex items-center gap-2">
            <Flag className="size-4" />
            Hoogste prioriteit
          </span>
        </SelectItem>

        <SelectItem value="follow_up">
          <span className="flex items-center gap-2">
            <CalendarClock className="size-4" />
            Eerstvolgende follow-up
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
