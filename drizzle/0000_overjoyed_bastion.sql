CREATE TABLE `searches` (
	`id` integer PRIMARY KEY NOT NULL,
	`search_type` text,
	`query` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` integer,
	`top_queries` text
);
