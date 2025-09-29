import Bree from "bree";
import path from "path";

const bree = new Bree({
  root: path.join(__dirname),
  jobs: [
    {
      name: "statistics",
      interval: "5m",
      // Provide the full path to the .ts file
      path: path.join(__dirname, "statistics.ts"),
    },
  ],
});

bree.start();