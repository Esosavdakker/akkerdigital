"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      projectType: "website",
      budgetRange: "not_sure",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    console.log("Contact form submission:", data);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setSubmitted(true);
    reset({
      name: "",
      email: "",
      company: "",
      website: "",
      projectType: "website",
      budgetRange: "not_sure",
      message: "",
    });
  }

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      {submitted && (
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Je aanvraag is gevalideerd. In de volgende fase slaan we deze op in de database.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Naam" error={errors.name?.message}>
            <input
              {...register("name")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
              placeholder="Je naam"
            />
          </Field>

          <Field label="E-mail" error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
              placeholder="jij@bedrijf.nl"
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Bedrijf" error={errors.company?.message}>
            <input
              {...register("company")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
              placeholder="Bedrijfsnaam"
            />
          </Field>

          <Field label="Website" error={errors.website?.message}>
            <input
              {...register("website")}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
              placeholder="https://voorbeeld.nl"
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Type project" error={errors.projectType?.message}>
            <select
              {...register("projectType")}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-neutral-950"
            >
              <option value="website">Website</option>
              <option value="backend">Backend systeem</option>
              <option value="automation">Automatisering</option>
              <option value="dashboard">Dashboard</option>
              <option value="not_sure">Ik weet het nog niet</option>
            </select>
          </Field>

          <Field label="Budgetindicatie" error={errors.budgetRange?.message}>
            <select
              {...register("budgetRange")}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-neutral-950"
            >
              <option value="under_1000">Onder €1.000</option>
              <option value="1000_2500">€1.000 - €2.500</option>
              <option value="2500_5000">€2.500 - €5.000</option>
              <option value="5000_plus">€5.000+</option>
              <option value="not_sure">Nog niet zeker</option>
            </select>
          </Field>
        </div>

        <Field label="Bericht" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={6}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
            placeholder="Vertel kort wat je wilt bouwen..."
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Versturen..." : "Aanvraag testen"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-red-600">{error}</span>}
    </label>
  );
}