import Bree from "bree";
import path from "path";

const bree = new Bree({
  root: path.join(__dirname),
  jobs: [
    {
      name: "statistics",
      interval: "5m",
      timeout: 0, // Run immediately on startup
      path: path.join(__dirname, "worker.mjs"),
      worker: {
        workerData: { path: path.join(__dirname, "statistics.ts") },
      },
    },
  ],
});

bree.start();