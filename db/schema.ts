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
  index,
} from 'drizzle-orm/pg-core';

export const subscriptionTierEnum = pgEnum('subscription_tier_type', [
  'Basic',
  'Pro',
  'Max',
]);

export const colorSystemMode = pgEnum('colorSystem_mode', ['light', 'dark']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  currentSubscriptionTierId: integer('current_subscription_tier_id')
    .notNull()
    .references(() => subscriptionTiers.id),

  totalColorSystemGenerations: integer('total_color_system_generations')
    .notNull()
    .default(0),
  currMonthColorSystemGenerations: integer(
    'curr_month_color_system_generations'
  )
    .notNull()
    .default(0),
  totalStoredColorSystems: integer('total_stored_color_systems')
    .notNull()
    .default(0),
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
  monthlyColorSystemGenerationLimit: integer(
    'monthly_color_system_generation_limit'
  ).notNull(),
  maxStoredColorSystems: integer('max_stored_color_systems').notNull(),
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
  startDate: timestamp('start_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const colorSystems = pgTable(
  'color_systems',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    name: text('name').notNull(),
    description: text('description'),
    mode: colorSystemMode('mode').notNull(),
    baseColors: text('base_colors')
      .array()
      .notNull()
      .$type<[string, string, string, string, string]>(),
    backgroundColor: text('background_color').notNull(),
    isFavorite: boolean('is_favorite').notNull().default(false),
    isPrivate: boolean('is_private').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index('user_id_idx').on(table.userId),
    };
  }
);
