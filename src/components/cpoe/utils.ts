// src/components/cpoe/utils.ts
import { v4 as uuidv4 } from 'uuid';
import { TEST_CODE_CONFIG } from './config';

/** Format DOB 'YYYY-MM-DD' => 'YYYYMMDD' */
export function formatDobForCode(dob?: string) {
  if (!dob) return '';
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/** In-memory sequence for demo. Replace with server sequence in production. */
const seqMap: Record<string, number> = {};
export function nextSeq(key = 'global') {
  seqMap[key] = (seqMap[key] ?? 0) + 1;
  return String(seqMap[key]).padStart(3, '0');
}

/**
 * Generate a test code using TEST_CODE_CONFIG templates.
 * Falls back to short uuid-like code if anything fails.
 */
export function generateTestCode(testName: string, dob?: string) {
  try {
    const key = Object.keys(TEST_CODE_CONFIG).find(k => k.toLowerCase() === (testName || '').trim().toLowerCase());
    const template = (key ? TEST_CODE_CONFIG[key] : TEST_CODE_CONFIG['__default__']) || TEST_CODE_CONFIG['__default__'];
    const dobStr = formatDobForCode(dob);
    const seq = nextSeq(testName || 'global');
    return template.replace('{dob:YYYYMMDD}', dobStr).replace('{seq}', seq);
  } catch (err) {
    return `T-${uuidv4().split('-')[0]}`;
  }
}