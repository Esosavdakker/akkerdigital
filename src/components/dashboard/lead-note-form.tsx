"use client";

import { useState, useTransition } from "react";
import { NotebookPen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createLeadNote } from "@/server/actions/lead-notes";

type LeadNoteFormProps = {
  leadId: string;
};

export function LeadNoteForm({
  leadId,
}: LeadNoteFormProps) {
  const [content, setContent] = useState("");

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const canSubmit =
    content.trim().length >= 2 && !isPending;

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await createLeadNote({
        leadId,
        content,
      });

      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      });

      if (result.success) {
        setContent("");
      }
    });
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <NotebookPen className="size-5 text-muted-foreground" />
          </div>

          <div>
            <CardTitle>Nieuwe notitie</CardTitle>

            <CardDescription className="mt-1">
              Leg een gesprek, afspraak of intern aandachtspunt vast.
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
            <Label htmlFor="lead-note">
              Interne notitie
            </Label>

            <Textarea
              id="lead-note"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
                setMessage(null);
              }}
              rows={6}
              maxLength={5000}
              disabled={isPending}
              placeholder="Bijvoorbeeld: klant gebeld en offerte besproken."
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Alleen zichtbaar binnen AkkerDigital.
              </span>

              <span>
                {content.length}/5000
              </span>
            </div>
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
            {isPending
              ? "Notitie toevoegen..."
              : "Notitie toevoegen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}