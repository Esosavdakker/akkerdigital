import Link from "next/link";

export default function LeadNotFound() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8">
      <p className="text-sm font-medium text-neutral-500">
        Lead niet gevonden
      </p>

      <h1 className="mt-2 text-2xl font-semibold">
        Deze lead bestaat niet of is verwijderd.
      </h1>

      <Link
        href="/dashboard/leads"
        className="mt-6 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white"
      >
        Terug naar leads
      </Link>
    </div>
  );
}
