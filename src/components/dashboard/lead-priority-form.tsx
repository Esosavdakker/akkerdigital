 "use client";

import { useState, useTransition } from "react";
import { Flag } from "lucide-react";

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
  leadPriorities,
  type LeadPriority,
} from "@/constants/lead-priority";
import { updateLeadPriority } from "@/server/actions/lead-priority";

type LeadPriorityFormProps = {
  leadId: string;
  currentPriority: LeadPriority;
};

export function LeadPriorityForm({
  leadId,
  currentPriority,
}: LeadPriorityFormProps) {
  const [priority, setPriority] =
    useState<LeadPriority>(currentPriority);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const hasChanges = priority !== currentPriority;

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await updateLeadPriority({
        leadId,
        priority,
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
            <Flag className="size-5 text-muted-foreground" />
          </div>

          <div>
            <CardTitle>Prioriteit</CardTitle>

            <CardDescription className="mt-1">
              Bepaal hoeveel aandacht deze lead momenteel nodig heeft.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="lead-priority">
              Prioriteit
            </Label>

            <Select
              value={priority}
              onValueChange={(value) => {
                setPriority(value as LeadPriority);
                setMessage(null);
              }}
              disabled={isPending}
            >
              <SelectTrigger
                id="lead-priority"
                className="w-full"
              >
                <SelectValue placeholder="Kies een prioriteit" />
              </SelectTrigger>

              <SelectContent>
                {leadPriorities.map((item) => (
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
              ? "Prioriteit opslaan..."
              : "Prioriteit opslaan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}