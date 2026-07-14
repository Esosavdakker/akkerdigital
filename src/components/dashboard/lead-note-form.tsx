"use client";

import { useState, useTransition } from "react";

import { createLeadNote } from "@/server/actions/lead-notes";

type LeadNoteFormProps = {
  leadId: string;
};

export function LeadNoteForm({
  leadId,
}: LeadNoteFormProps) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const result = await createLeadNote({
        leadId,
        content,
      });

      setMessage(result.message);

      if (result.success) {
        setContent("");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <h2 className="text-lg font-semibold">
        Nieuwe notitie
      </h2>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">
          Interne notitie
        </span>

        <textarea
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          rows={5}
          disabled={isPending}
          placeholder="Schrijf hier een interne notitie..."
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
        />
      </label>

      <button
        type="submit"
        disabled={
          isPending || content.trim().length < 2
        }
        className="mt-4 w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? "Opslaan..."
          : "Notitie toevoegen"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-neutral-600">
          {message}
        </p>
      )}
    </form>
  );
}