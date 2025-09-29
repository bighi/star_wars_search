import { db } from "../db/index";
import { statistics } from "../db/schema";
import { sql } from "drizzle-orm";

export default async function runStatisticsJob() {
  console.log("Statistics job started at:", new Date().toISOString());

  // Get top 5 queries using SQL aggregation
  const topQueries = await db.all(
    sql`SELECT query, COUNT(*) as count FROM searches GROUP BY query ORDER BY count DESC LIMIT 5`
  );

  console.log("Top queries fetched:", topQueries);

  // Save statistics
  await db.insert(statistics).values({
    createdAt: Date.now(),
    topQueries: JSON.stringify(topQueries),
  });

  console.log("Statistics job completed at:", new Date().toISOString());
}

// Always execute when this file is run (Bree worker spawns a separate process)
runStatisticsJob()
  .then(() => {
    // Explicitly exit to signal completion to the worker
    process.exit(0);
  })
  .catch((err) => {
    console.error("Statistics job failed:", err);
    process.exit(1);
  });
