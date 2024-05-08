#!/usr/bin/env node

const { spawn } = require('child_process');

// Start the supabase process
const supabase = spawn('npx', ['supabase', 'start']);

// Handle the output
supabase.stdout.on('data', (data) => {
  process.stdout.write(`${data}`);
});

supabase.stderr.on('data', (data) => {
  process.stdout.write(`${data}`);
});

// Keep this process running
process.stdin.resume();

// Handle the SIGINT once
(async () => {
  await new Promise((resolve) => process.on('SIGINT', resolve));

  process.stdout.write('Stopping supabase...');

  const stop = spawn('npx', ['supabase', 'stop']);

  stop.on('close', (code) => {
    process.stdout.write(`Supabase stopped.`);
    process.exit(0);
  });
})();
