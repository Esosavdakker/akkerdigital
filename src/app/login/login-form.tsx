"use client";

import { useState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await login(email, password);

    if (result && !result.success) {
      setErrorMessage(result.message);
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <label className="block">
        <span className="mb-2 block text-sm font-medium">E-mailadres</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Wachtwoord</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-950"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {isSubmitting ? "Inloggen..." : "Inloggen"}
      </button>
    </form>
  );
}