"use client";

import { useState, useTransition } from "react";

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
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const result = await updateLeadStatus({
        leadId,
        status,
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
        Leadstatus
      </h2>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">
          Status
        </span>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as LeadStatus)
          }
          disabled={isPending}
          className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-neutral-950"
        >
          {leadStatuses.map((item) => (
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
        disabled={isPending || status === currentStatus}
        className="mt-4 w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Opslaan..." : "Status opslaan"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-neutral-600">
          {message}
        </p>
      )}
    </form>
  );
}
