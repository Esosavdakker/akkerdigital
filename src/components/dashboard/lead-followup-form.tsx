"use client";

import { useState, useTransition } from "react";
import { CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateLeadFollowUp } from "@/server/actions/lead-followup";

type LeadFollowUpFormProps = {
  leadId: string;
  currentFollowUpAt: string | null;
  currentReason: string | null;
};

function toInputValue(value: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

export function LeadFollowUpForm({
  leadId,
  currentFollowUpAt,
  currentReason,
}: LeadFollowUpFormProps) {
  const initialFollowUpAt = toInputValue(currentFollowUpAt);
  const initialReason = currentReason ?? "";

  const [followUpAt, setFollowUpAt] = useState(initialFollowUpAt);
  const [reason, setReason] = useState(initialReason);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const hasChanges =
    followUpAt !== initialFollowUpAt || reason !== initialReason;

  const canSubmit =
    followUpAt.length > 0 &&
    reason.trim().length >= 2 &&
    hasChanges &&
    !isPending;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await updateLeadFollowUp({
        leadId,
        followUpAt,
        reason,
      });

      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      });
    });
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <CalendarClock className="size-5 text-muted-foreground" />
          </div>

          <div>
            <CardTitle>Follow-up</CardTitle>

            <CardDescription className="mt-1">
              Plan wanneer en waarom je deze lead opnieuw wilt benaderen.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="follow-up-at">Datum en tijd</Label>

            <Input
              id="follow-up-at"
              type="datetime-local"
              value={followUpAt}
              onChange={(event) => {
                setFollowUpAt(event.target.value);
                setMessage(null);
              }}
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="follow-up-reason">Reden</Label>

            <Textarea
              id="follow-up-reason"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                setMessage(null);
              }}
              rows={4}
              disabled={isPending}
              required
              placeholder="Bijvoorbeeld: bel voor akkoord op de offerte."
            />
          </div>

          {message && (
            <div
              role="status"
              className={
                message.type === "success"
                  ? "rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                  : "rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              }
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-full"
          >
            {isPending ? "Follow-up opslaan..." : "Follow-up opslaan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}