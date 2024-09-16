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

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'past_due',
  'canceled',
  'unpaid',
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
  stripePriceIdMonthly: text('stripe_price_id_monthly'),
  stripePriceIdYearly: text('stripe_price_id_yearly'),
  priceMonthly: decimal('price_monthly', { precision: 10, scale: 2 }).notNull(),
  priceYearly: decimal('price_yearly', { precision: 10, scale: 2 }).notNull(),
});

export const userSubscriptions = pgTable('user_subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  subscriptionTierId: integer('subscription_tier_id')
    .notNull()
    .references(() => subscriptionTiers.id),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripePriceId: text('stripe_price_id'),
  status: subscriptionStatusEnum('status').notNull().default('active'),
  currentPeriodStart: timestamp('current_period_start', {
    withTimezone: true,
  }).notNull(),
  currentPeriodEnd: timestamp('current_period_end', {
    withTimezone: true,
  }).notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
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
    description: text('description').notNull(),
    mode: colorSystemMode('mode').notNull(),
    baseColors: uuid('base_colors')
      .array()
      .notNull()
      .$type<[string, string, string, string, string]>(),
    backgroundColor: uuid('background_color').notNull(),
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

export const colors = pgTable(
  'colors',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    okhsl: text('okhsl').notNull().unique(),
    hex: text('hex').notNull().unique(),
    rgb: text('rgb').notNull(),
    hsl: text('hsl').notNull(),
    oklch: text('oklch').notNull(),
    cmyk: text('cmyk').notNull(),
    hsb: text('hsb').notNull(),
    lab: text('lab').notNull(),
    lch: text('lch').notNull(),
    displayp3: text('displayp3').notNull(),
    a98: text('a98').notNull(),
    prophoto: text('prophoto').notNull(),
    xyz: text('xyz').notNull(),
  },
  (table) => {
    return {
      okhslIdx: index('okhsl_idx').on(table.okhsl),
      hexIdx: index('hex_idx').on(table.hex),
    };
  }
);

export const contactMsgs = pgTable('contact_msgs', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
