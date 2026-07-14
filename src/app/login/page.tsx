import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-md">
        <p className="text-sm font-medium text-neutral-500">
          AkkerDigital Admin
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Dashboard login
        </h1>

        <p className="mt-4 text-neutral-600">
          Log in om leads en projecten te beheren.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}