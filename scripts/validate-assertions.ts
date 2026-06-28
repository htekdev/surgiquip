/**
 * E2E Test Quality Gate — Surgiquip
 *
 * Validates that all test spec files:
 * 1. Import from visual-assert.ts (enforces visual assertion pattern)
 * 2. Have a minimum number of assertions per test (prevents empty tests)
 *
 * Run: npx tsx scripts/validate-assertions.ts
 */

import { readFileSync, readdirSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TESTS_DIR = join(__dirname, '..', 'e2e', 'tests');
const MIN_ASSERTIONS_PER_FILE = 2;

const VISUAL_ASSERT_FUNCTIONS = [
  'expectVisible',
  'expectHidden',
  'expectText',
  'expectAttribute',
  'expectURL',
  'expectClass',
  'expectCount',
  'expectTitle',
  'showPhaseLabel',
];

interface ValidationError {
  file: string;
  message: string;
}

function validateFile(filePath: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const content = readFileSync(filePath, 'utf-8');
  const fileName = filePath.split(/[\\/]/).pop()!;

  // Skip non-spec files (helpers, visual-assert itself)
  if (!fileName.endsWith('.spec.ts')) return [];

  // 1. Must import from visual-assert
  const hasVisualImport = content.includes('./visual-assert') || content.includes('../visual-assert');
  if (!hasVisualImport) {
    errors.push({
      file: fileName,
      message: 'Missing import from visual-assert.ts — all tests must use visual assertions',
    });
  }

  // 2. Count assertion calls
  let assertionCount = 0;
  for (const fn of VISUAL_ASSERT_FUNCTIONS) {
    const regex = new RegExp(`\\b${fn}\\(`, 'g');
    const matches = content.match(regex);
    if (matches) assertionCount += matches.length;
  }

  if (assertionCount < MIN_ASSERTIONS_PER_FILE) {
    errors.push({
      file: fileName,
      message: `Only ${assertionCount} visual assertions found (minimum: ${MIN_ASSERTIONS_PER_FILE}). Add more expectVisible/expectText/showPhaseLabel calls.`,
    });
  }

  return errors;
}

function main() {
  console.log('🔍 Validating E2E test quality...\n');

  const files = readdirSync(TESTS_DIR).filter(f => extname(f) === '.ts');
  const specFiles = files.filter(f => f.endsWith('.spec.ts'));

  console.log(`   Found ${specFiles.length} spec files in e2e/tests/\n`);

  const allErrors: ValidationError[] = [];

  for (const file of specFiles) {
    const filePath = join(TESTS_DIR, file);
    const errors = validateFile(filePath);
    allErrors.push(...errors);

    if (errors.length === 0) {
      console.log(`   ✅ ${file}`);
    } else {
      for (const err of errors) {
        console.log(`   ❌ ${err.file}: ${err.message}`);
      }
    }
  }

  console.log('');

  if (allErrors.length > 0) {
    console.error(`\n❌ Quality gate FAILED — ${allErrors.length} issue(s) found.`);
    process.exit(1);
  }

  console.log(`✅ Quality gate PASSED — all ${specFiles.length} spec files meet standards.`);
}

main();
