import { validNepaliSequence } from '../engine/syllables.js';

// Explicit per-field vocabulary; never write these hints into engine/model data.
export function compileHints(hints = {}) {
  if (!hints || typeof hints !== 'object' || Array.isArray(hints)) throw new TypeError('hints must be a Roman-to-Nepali object.');
  const prototype = Object.getPrototypeOf(hints);
  if (prototype !== Object.prototype && prototype !== null) throw new TypeError('hints must be a plain Roman-to-Nepali object.');
  const entries = Object.entries(hints);
  if (entries.length > 1000) throw new RangeError('At most 1000 Roman hint keys are supported per field.');
  const result = new Map();
  for (const [roman, value] of entries) {
    if (!/^[A-Za-z]{1,64}$/.test(roman)) throw new TypeError('Hint keys must contain 1–64 Roman letters.');
    const values = Array.isArray(value) ? value : [value];
    if (!values.length || values.length > 5) throw new RangeError('Each hint key needs 1–5 Nepali values.');
    const words = [];
    for (const item of values) {
      if (typeof item !== 'string') throw new TypeError('Hint values must be Nepali strings.');
      const text = item.normalize('NFC').trim();
      if (!text.length || text.length > 128 || !text.split(/ +/).every(validNepaliSequence)) {
        throw new TypeError('Hint values must be valid Nepali words/space-separated phrases of at most 128 UTF-16 units.');
      }
      if (!words.includes(text)) words.push(text);
    }
    result.set(roman, Object.freeze(words));
  }
  return result;
}

export function withHints(roman, ranked, hints) {
  const custom = (hints.get(roman) ?? hints.get(roman.toLowerCase()) ?? [])
    .map(text => ({ text, source: 'custom', custom: true }));
  const seen = new Set(), result = [];
  for (const candidate of [...custom, ...ranked]) {
    const key = candidate.text.normalize('NFC');
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ ...candidate });
    if (result.length === 5) break;
  }
  return result;
}
