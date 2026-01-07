export interface Plan {
  id: string;
  name: string;
  description: string;
  max_members: number;
  max_contacts: number;
  price_monthly: number;
  price_yearly: number;
  created_at: string;
  updated_at?: string;
}

export interface SubscribedPlan {
  id: string;
  ends_at: string;
  plan: PlanType;
  plan_id?: string;
  status?: SubscriptionStatus;
  starts_at?: string;
  payment_status?: PaymentStatus;
}

export interface PlanType {
  name: PlanName;
  max_members?: number;
  max_contacts?: number;
  email_sender?: number;
  track_visit?: number;
  max_deals?: number;
}

export type PlanName = "free" | "basic" | "standard" | "premium";
export type SubscriptionStatus = "free" | "active" | "inactive" | "canceled" | "expired";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "not_required";

export const PLAN_HIERARCHY = {
  free: { level: 0, name: "free" },
  basic: { level: 1, name: "basic" },
  standard: { level: 2, name: "standard" },
  premium: { level: 3, name: "premium" },
} as const;
