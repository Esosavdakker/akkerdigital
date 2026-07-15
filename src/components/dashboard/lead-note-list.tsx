import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LeadNote } from "@/server/queries/lead-notes";

type LeadNoteListProps = {
  notes: LeadNote[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function LeadNoteList({
  notes,
}: LeadNoteListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interne notities</CardTitle>

        <CardDescription>
          Contactmomenten, afspraken en interne informatie bij deze lead.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {notes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-600">
            Er zijn nog geen notities voor deze lead.
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <article
                key={note.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <p className="whitespace-pre-wrap leading-7 text-neutral-700">
                  {note.content}
                </p>

                <p className="mt-3 text-xs text-neutral-500">
                  {formatDate(note.created_at)}
                </p>
              </article>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

