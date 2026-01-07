// app/api/webhooks/stripe/handlers/payment-succeeded.ts
import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";

export async function handlePaymentSucceeded(invoice: Stripe.Invoice, supabase: SupabaseClient) {
  const subscriptionId = (invoice as any).subscription;

  if (!subscriptionId || typeof subscriptionId !== "string") {
    console.log("Invoice has no valid subscription");
    return;
  }

  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);

  // TODO: implement payment succeeded logic
}
