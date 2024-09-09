import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  decimal,
  serial,
} from 'drizzle-orm/pg-core';

export const subscriptionTierEnum = pgEnum('subscription_tier_type', [
  'Basic',
  'Pro',
  'Max',
]);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  currentSubscriptionTierId: integer('current_subscription_tier_id')
    .notNull()
    .references(() => subscriptionTiers.id),
  totalGenerations: integer('total_generations').notNull().default(0),
  currentMonthGenerations: integer('current_month_generations')
    .notNull()
    .default(0),
  totalStoredPalettes: integer('total_stored_palettes').notNull().default(0),
  lastGenerationReset: timestamp('last_generation_reset', {
    withTimezone: true,
  }).defaultNow(),
  lastLoginDate: timestamp('last_login_date', {
    withTimezone: true,
  }).defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const subscriptionTiers = pgTable('subscription_tiers', {
  id: serial('id').primaryKey(),
  name: subscriptionTierEnum('name').notNull().unique().default('Basic'),
  monthlyGenerationLimit: integer('monthly_generation_limit').notNull(),
  maxStoredPalettes: integer('max_stored_palettes').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

export const userSubscriptions = pgTable('user_subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  subscriptionTierId: integer('subscription_tier_id')
    .notNull()
    .references(() => subscriptionTiers.id),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const colorPalettes = pgTable('color_palettes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  baseColors: text('base_colors').array().notNull(),
  backgroundColor: text('background_color').notNull(),
  isFavorite: boolean('is_favorite').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
