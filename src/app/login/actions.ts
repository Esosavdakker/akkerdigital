"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginResult = {
  success: boolean;
  message: string;
};

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);

    return {
      success: false,
      message: "E-mailadres of wachtwoord is onjuist.",
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}