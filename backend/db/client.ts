import "server-only";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { schema } from "@/backend/db/schema";

const rawDatabaseUrl = process.env.DATABASE_URL ?? "./data/optizaworks.db";
const databasePath = resolve(process.cwd(), rawDatabaseUrl.replace(/^file:/, ""));

mkdirSync(dirname(databasePath), { recursive: true });

const globalDatabase = globalThis as typeof globalThis & {
  optizaworksSqlite?: Database.Database;
};

const sqlite = globalDatabase.optizaworksSqlite ?? new Database(databasePath);

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("busy_timeout = 5000");
sqlite.pragma("synchronous = NORMAL");

if (process.env.NODE_ENV !== "production") {
  globalDatabase.optizaworksSqlite = sqlite;
}

export const db = drizzle(sqlite, { schema });
