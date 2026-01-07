import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// before deploy, run db:generate + db:migrate
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  phone: text("phone"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const stripeEvents = pgTable("stripe_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: text("event_id").notNull().unique(),
  eventType: text("event_type").notNull(),
  processedAt: timestamp("processed_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// TODO: create subscription table based on your stripe prices
// export const subscriptions = pgTable('subscriptions', {
// ...
// });
