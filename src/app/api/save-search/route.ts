import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { searches } from "@/db/schema";

export async function POST(req: NextRequest) {
  const { searchType, query } = await req.json();
  await db.insert(searches).values({
    searchType,
    query,
    createdAt: Date.now(),
  });
  return NextResponse.json({ success: true });
}
