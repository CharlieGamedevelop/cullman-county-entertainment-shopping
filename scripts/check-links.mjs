import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const basePath = path.join(repoRoot, 'index.html');

try {
  const html = fs.readFileSync(basePath, 'utf8');
  const requiredSignals = [
    'Cullman County Entertainment & Shopping',
    'Community',
    'Explore',
    'news.html',
    'events.html'
  ];

  const missing = requiredSignals.filter((signal) => !html.includes(signal));
  if (missing.length > 0) {
    throw new Error(`Home page is missing required content: ${missing.join(', ')}`);
  }

  console.log('Base homepage integrity check passed.');
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
