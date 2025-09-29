import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const searches = sqliteTable("searches", {
  id: integer("id").primaryKey(),
  searchType: text("search_type"),
  query: text("query"),
  createdAt: integer("created_at"), // Unix timestamp
});

export const statistics = sqliteTable("statistics", {
  id: integer("id").primaryKey(),
  createdAt: integer("created_at"), // Unix timestamp
  topQueries: text("top_queries"), // JSON stringified array of top 5 queries
});
