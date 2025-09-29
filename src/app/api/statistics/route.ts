import { NextResponse } from "next/server";
import { db } from "@/db";
import { statistics } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  // Fetch the most recent statistics entry
  const latestStats = await db
    .select()
    .from(statistics)
    .orderBy(desc(statistics.createdAt))
    .limit(1);

  if (latestStats.length === 0) {
    return NextResponse.json({ error: "No statistics found" }, { status: 404 });
  }

  // The topQueries are stored as a JSON string, so we need to parse it
  const result = {
    ...latestStats[0],
    topQueries: JSON.parse(latestStats[0].topQueries || "[]"),
  };

  return NextResponse.json(result);
}
