// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";
import { handleCheckoutCompleted } from "./handlers/checkout-completed";
import { handleSubscriptionUpdated } from "./handlers/subscription-updated";
import { handlePaymentSucceeded } from "./handlers/payment-succeeded";
import { handlePaymentFailed } from "./handlers/payment-failed";
import { handleSubscriptionDeleted } from "./handlers/subscription-deleted";

// ngrok http 3000 : test command
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("✓ Webhook received:", event.type, "ID:", event.id);

  const supabase = await createAdminClient();

  // Check if the event has already been processed
  const { data: existingEvent } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("event_id", event.id)
    .maybeSingle();

  if (existingEvent) {
    console.log("⚠️ Duplicate event, skipping:", event.id);
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object, supabase);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object, supabase);
        break;
      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object, supabase);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object, supabase);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object, supabase);
        break;
      default:
        console.log(`ℹ️ Unhandled event: ${event.type}`);
    }

    // Record the event as processed
    await supabase.from("stripe_events").insert({
      event_id: event.id,
      event_type: event.type,
      processed_at: new Date().toISOString(),
    });

    console.log(`✓ Successfully processed: ${event.type}`);
    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error(`❌ Error processing ${event.type}:`, errorMessage, errorStack);
    // ⚠️ when return 500, stripe will automatically retry
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
