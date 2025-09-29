import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import fs from "fs";
import path from "path";

const dbPath = process.env.SQLITE_PATH || "sqlite.db";

// Ensure directory exists when using a path like /data/sqlite.db
const dir = path.dirname(dbPath);
if (dir && dir !== "." && dir !== "..") {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    // ignore if cannot create; better-sqlite3 will error if truly inaccessible
  }
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
