const { parentPort, workerData } = require('worker_threads');
const { spawn } = require('child_process');

// Spawn a child process to run the TypeScript file with tsx
const child = spawn('npx', ['tsx', workerData.path], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  if (code !== 0) {
    parentPort.postMessage({ error: `Worker exited with code ${code}` });
  } else {
    parentPort.postMessage({ success: true });
  }
});