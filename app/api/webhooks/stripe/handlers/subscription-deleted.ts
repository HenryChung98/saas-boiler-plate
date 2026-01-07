import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: SupabaseClient
) {
  // TODO: implement subscription deleted logic
}
