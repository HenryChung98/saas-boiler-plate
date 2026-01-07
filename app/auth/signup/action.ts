"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidPassword } from "@/utils/validations";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  const confirmPassword = formData.get("confirmPassword")?.toString().trim();

  // check all fields
  if (!email || !password || !name) {
    return { error: "Email, password, and name are required." };
  }

  // validate password
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (!isValidPassword(password)) {
    return {
      error: "Password must be at least 8 characters long and contain letters and numbers.",
    };
  }

  // insert user to auth.users
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        name: name, // Also store as 'name' for consistency
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback/confirmed`,
    },
  });

  if (signUpError) {
    const msg = signUpError.message;

    if (msg.includes("duplicate")) {
      return { error: "Email already exist." };
    }
    return { error: msg };
  }
  if (!authData.user?.id) {
    return { error: "Signup failed: missing user ID." };
  }

  redirect("/auth/verify");
}
