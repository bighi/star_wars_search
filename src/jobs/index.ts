import Bree from "bree";
import path from "path";

const bree = new Bree({
  root: path.join(__dirname),
  jobs: [
    {
      name: "statistics",
      interval: "5m",
    },
  ],
});

bree.start();