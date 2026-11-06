import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const networkPath = path.join(repoRoot, 'community-network.json');
const templatePath = path.join(repoRoot, 'community-feed-template.json');

const network = JSON.parse(fs.readFileSync(networkPath, 'utf8'));
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

const requiredFields = ['title', 'url', 'municipality', 'publishedAt', 'summary', 'category', 'status'];
const errors = [];

for (const entry of network) {
  if (!entry.municipality || !entry.slug || !entry.repo || !entry.website) {
    errors.push(`Invalid municipality entry: missing required values for ${JSON.stringify(entry)}`);
  }
}

if (!Array.isArray(template.items)) {
  errors.push('community-feed-template.json is missing a valid items array.');
}

for (const item of template.items) {
  for (const field of requiredFields) {
    if (!(field in item)) {
      errors.push(`Template item is missing required field: ${field}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated ${network.length} community entries and ${template.items.length} feed template items.`);
