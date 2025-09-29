import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from ".";

async function run() {
  try {
    console.log("[migrate] Using DB path:", process.env.SQLITE_PATH || "sqlite.db");
    console.log("[migrate] Applying migrations from ./drizzle ...");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("[migrate] Migrations applied successfully.");
  } catch (err) {
    console.error("[migrate] Migration failed:", err);
    process.exit(1);
  }
}

run();
