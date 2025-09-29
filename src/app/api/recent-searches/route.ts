import { NextResponse } from "next/server";
import { db } from "@/db";
import { searches } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  // Fetch the last 5 searches from the database
  const recentSearches = await db
    .select()
    .from(searches)
    .orderBy(desc(searches.createdAt))
    .limit(5);

  if (recentSearches.length === 0) {
    return NextResponse.json({ searches: [] });
  }

  return NextResponse.json({ searches: recentSearches });
}
