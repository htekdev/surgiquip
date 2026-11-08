import { readFileSync, writeFileSync } from 'node:fs';
import { containRetiredAliases } from './retired-partner-routes.mjs';

// Astro's adapter emits the authoritative deployment routing configuration.
// Fail the build on missing/malformed output; never silently ship uncontained aliases.
const path = new URL('../.vercel/output/config.json', import.meta.url);
const output = JSON.parse(readFileSync(path, 'utf8'));
writeFileSync(path, JSON.stringify(containRetiredAliases(output), null, 2));
