import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const adminUsers = sqliteTable(
  "admin_users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    role: text("role", { enum: ["owner", "editor"] }).notNull().default("owner"),
    active: integer("active", { mode: "boolean" }).notNull().default(true),
    ...timestamps,
  },
  (table) => [uniqueIndex("admin_users_email_unique").on(table.email)],
);

export const adminSessions = sqliteTable(
  "admin_sessions",
  {
    id: text("id").primaryKey(),
    tokenHash: text("token_hash").notNull(),
    adminId: integer("admin_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("admin_sessions_token_unique").on(table.tokenHash),
    index("admin_sessions_admin_idx").on(table.adminId),
    index("admin_sessions_expiry_idx").on(table.expiresAt),
  ],
);

export const loginAttempts = sqliteTable(
  "login_attempts",
  {
    identifierHash: text("identifier_hash").primaryKey(),
    failures: integer("failures").notNull().default(0),
    windowStartedAt: integer("window_started_at", { mode: "timestamp_ms" }).notNull(),
    lockedUntil: integer("locked_until", { mode: "timestamp_ms" }),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("login_attempts_lock_idx").on(table.lockedUntil)],
);

export const organizations = sqliteTable(
  "organizations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    shortName: text("short_name").notNull(),
    logo: text("logo").notNull(),
    category: text("category").notNull(),
    website: text("website").notNull(),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("organizations_short_name_unique").on(table.shortName),
    index("organizations_published_order_idx").on(table.published, table.sortOrder),
  ],
);

export const projects = sqliteTable(
  "projects",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    organizationId: integer("organization_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    category: text("category", {
      enum: ["web", "software", "branding", "app"],
    }).notNull(),
    categoryLabel: text("category_label").notNull(),
    summary: text("summary").notNull(),
    challenge: text("challenge").notNull(),
    solution: text("solution").notNull(),
    outcome: text("outcome").notNull(),
    image: text("image").notNull(),
    imageFit: text("image_fit", { enum: ["cover", "contain"] })
      .notNull()
      .default("cover"),
    services: text("services", { mode: "json" }).$type<string[]>().notNull(),
    year: text("year").notNull(),
    website: text("website"),
    clientLogo: text("client_logo"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("projects_slug_unique").on(table.slug),
    index("projects_published_order_idx").on(table.published, table.sortOrder),
    index("projects_category_idx").on(table.category),
  ],
);

export const services = sqliteTable(
  "services",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    details: text("details").notNull(),
    includes: text("includes", { mode: "json" }).$type<string[]>().notNull(),
    icon: text("icon").notNull(),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("services_slug_unique").on(table.slug),
    index("services_published_order_idx").on(table.published, table.sortOrder),
  ],
);

export const products = sqliteTable(
  "products",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    code: text("code").notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    description: text("description").notNull(),
    features: text("features", { mode: "json" }).$type<string[]>().notNull(),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("products_code_unique").on(table.code),
    index("products_published_order_idx").on(table.published, table.sortOrder),
  ],
);

export const faqs = sqliteTable(
  "faqs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [index("faqs_published_order_idx").on(table.published, table.sortOrder)],
);

export const newsItems = sqliteTable(
  "news_items",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    dateLabel: text("date_label").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    publishedAt: integer("published_at", { mode: "timestamp_ms" }),
    published: integer("published", { mode: "boolean" }).notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("news_items_slug_unique").on(table.slug),
    index("news_published_order_idx").on(table.published, table.sortOrder),
  ],
);

export const contactMessages = sqliteTable(
  "contact_messages",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    status: text("status", { enum: ["new", "read", "replied", "archived"] })
      .notNull()
      .default("new"),
    adminNotes: text("admin_notes").notNull().default(""),
    ipHash: text("ip_hash"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    index("contact_messages_status_idx").on(table.status),
    index("contact_messages_created_idx").on(table.createdAt),
    index("contact_messages_ip_idx").on(table.ipHash, table.createdAt),
  ],
);

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    adminId: integer("admin_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id"),
    details: text("details", { mode: "json" }).$type<Record<string, unknown>>(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("audit_logs_created_idx").on(table.createdAt)],
);

export const schema = {
  adminUsers,
  adminSessions,
  loginAttempts,
  organizations,
  projects,
  services,
  products,
  faqs,
  newsItems,
  contactMessages,
  auditLogs,
};
