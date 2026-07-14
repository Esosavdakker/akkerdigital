"use client";

import { useState, useTransition } from "react";

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

  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const result = await updateLeadPriority({
        leadId,
        priority,
      });

      setMessage(result.message);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <h2 className="text-lg font-semibold">
        Prioriteit
      </h2>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">
          Leadprioriteit
        </span>

        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as LeadPriority)
          }
          disabled={isPending}
          className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-neutral-950"
        >
          {leadPriorities.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={
          isPending || priority === currentPriority
        }
        className="mt-4 w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? "Opslaan..."
          : "Prioriteit opslaan"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-neutral-600">
          {message}
        </p>
      )}
    </form>
  );
}
