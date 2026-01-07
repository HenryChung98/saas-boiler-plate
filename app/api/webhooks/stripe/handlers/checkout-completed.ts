// app/api/webhooks/stripe/handlers/checkout-completed.ts
import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: SupabaseClient
) {
  const authUserId = session.metadata?.userId;

  if (!authUserId) {
    throw new Error("Missing required metadata: userId");
  }

  // TODO: implement checkout completed logic
}
