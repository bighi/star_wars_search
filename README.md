## Star Wars Search – Docker Guide

This app is a Next.js + TypeScript project with a SQLite database (via Drizzle ORM) and a background job (via Bree) that periodically computes search statistics.

The recommended way to run it is via Docker Compose, which starts two services:
- web: The Next.js server (port 3000)
- jobs: The statistics scheduler (runs immediately and every 5 minutes)

Both services share a single SQLite file using a named Docker volume.

### Prerequisites
- Docker Desktop 4.x+
- Docker Compose v2

### One-time setup and run

#### 1) Build images

```bash
docker compose build
```

#### 2) Start the app and the background jobs

```bash
docker compose up
```

Now open http://localhost:3000.

### Useful endpoints

#### Recent Searches

URL: http://localhost:3000/api/recent-searches

Returns the last 5 searches (for testing purposes).

#### Statistics

URL: http://localhost:3000/api/statistics

Returns the latest saved statistics, including the top 5 search queries.

### Logs and troubleshooting
- Web logs and job logs are shown in the same `docker compose up` terminal.
- You should see messages like:
	- `[migrate] Using DB path: /data/sqlite.db`
	- `[migrate] Migrations applied successfully.`
	- `[worker] launching tsx for /app/src/jobs/statistics.ts`
	- `Statistics job started at: …`
	- `Statistics job completed at: …`

If you see `no such table: searches`:
1. Ensure migrations ran against the shared volume (see logs).
2. Re-run the migration step against the named volume:
	 ```bash
	 docker compose run -v star_wars_search_db_data:/data web npm run db:migrate
	 ```
3. Restart the stack:
	 ```bash
	 docker compose up
	 ```

### Cleaning everything
```bash
docker compose down --rmi all --volumes --remove-orphans
```

This removes containers, images, and the named volume (wipes DB data).
