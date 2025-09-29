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

  console.log("Raw createdAt value:", latestStats[0].createdAt); // Debug log
  const result = {
    id: latestStats[0].id,
    test: "ok",
    createdAt: new Date(Number(latestStats[0].createdAt)).toLocaleString(), // Ensure readable date
    topQueries: JSON.parse(latestStats[0].topQueries || "[]"),
  };

  return NextResponse.json(result);
}
