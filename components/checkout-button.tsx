"use client";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/auth-context";

export function CheckoutButton() {
  const { user } = useAuth();

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
        // TODO: implement checkout logic
        // priceId: STRIPE_PRICES[plan as keyof typeof STRIPE_PRICES],
      }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return <Button onClick={handleCheckout}>Checkout</Button>;
}
