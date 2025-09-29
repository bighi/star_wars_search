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

// If run directly, execute the job
if (require.main === module) {
  runStatisticsJob().catch(console.error);
}
