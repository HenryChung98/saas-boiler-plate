import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";

export async function handlePaymentFailed(invoice: Stripe.Invoice, supabase: SupabaseClient) {
  const subscriptionId = (invoice as any).subscription;

  if (!subscriptionId || typeof subscriptionId !== "string") {
    console.log("Invoice has no valid subscription");
    return;
  }

  // TODO: implement payment failed logic
}
