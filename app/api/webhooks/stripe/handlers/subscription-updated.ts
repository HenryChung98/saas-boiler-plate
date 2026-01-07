// app/api/webhooks/stripe/handlers/subscription-updated.ts
import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: SupabaseClient
) {
  console.log("🔍 Subscription updated event:", {
    id: subscription.id,
    customer: subscription.customer,
    priceId: subscription.items.data[0].price.id,
  });

  const newPriceId = subscription.items.data[0].price.id;
  const stripeCustomerId = subscription.customer as string;

  // TODO: implement subscription updated logic
}
