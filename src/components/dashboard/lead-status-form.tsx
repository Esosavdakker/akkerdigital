"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  leadStatuses,
  type LeadStatus,
} from "@/constants/lead-status";
import { updateLeadStatus } from "@/server/actions/leads";

type LeadStatusFormProps = {
  leadId: string;
  currentStatus: LeadStatus;
};

export function LeadStatusForm({
  leadId,
  currentStatus,
}: LeadStatusFormProps) {
  const [status, setStatus] = useState<LeadStatus>(currentStatus);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const hasChanges = status !== currentStatus;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await updateLeadStatus({
        leadId,
        status,
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
            <RefreshCw className="size-5 text-muted-foreground" />
          </div>

          <div>
            <CardTitle>Leadstatus</CardTitle>

            <CardDescription className="mt-1">
              Houd bij waar deze lead zich in het verkoopproces bevindt.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="lead-status">
              Status
            </Label>

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value as LeadStatus);
                setMessage(null);
              }}
              disabled={isPending}
            >
              <SelectTrigger
                id="lead-status"
                className="w-full"
              >
                <SelectValue placeholder="Kies een status" />
              </SelectTrigger>

              <SelectContent>
                {leadStatuses.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            disabled={!hasChanges || isPending}
            className="w-full rounded-full"
          >
            {isPending
              ? "Status opslaan..."
              : "Status opslaan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}