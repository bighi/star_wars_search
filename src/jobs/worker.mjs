import { parentPort, workerData } from 'node:worker_threads';
import { spawn } from 'node:child_process';

// Log start for visibility
console.log('[worker] launching tsx for', workerData?.path);

const child = spawn('node', ['--import', 'tsx', workerData.path], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  if (code !== 0) {
    parentPort?.postMessage({ error: `Worker exited with code ${code}` });
    process.exit(code ?? 1);
  } else {
    parentPort?.postMessage({ success: true });
    process.exit(0);
  }
});
