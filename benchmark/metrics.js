export const normalizeText = text => text.trim().normalize('NFC');

export function prepareDataset(records) {
  const groups = new Map();
  const excluded = { missing: 0, roman: 0, native: 0 };
  let acceptedRows = 0;
  for (const record of records) {
    if (typeof record.roman !== 'string' || typeof record.native !== 'string') { excluded.missing++; continue; }
    const roman = record.roman.trim();
    const native = normalizeText(record.native);
    if (!/^[a-zA-Z]{1,64}$/.test(roman)) { excluded.roman++; continue; }
    if (!/^[\u0900-\u097f\u200c\u200d]+$/u.test(native)) { excluded.native++; continue; }
    acceptedRows++;
    const group = groups.get(roman) || { id: record.id, roman, references: [], sources: [] };
    if (!group.references.includes(native)) group.references.push(native);
    if (!group.sources.includes(record.source)) group.sources.push(record.source);
    groups.set(roman, group);
  }
  const cases = [...groups.values()].map(row => ({ ...row, category: row.sources.length === 1 ? row.sources[0] : 'Multiple sources' }));
  return { cases, population: { rawRows: records.length, acceptedRows, excluded, uniqueInputs: cases.length, mergedRows: acceptedRows - cases.length, multipleReferences: cases.filter(row => row.references.length > 1).length } };
}

export function levenshtein(left, right) {
  const a = [...left], b = [...right];
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + Number(a[i - 1] !== b[j - 1]));
    row = next;
  }
  return row[b.length];
}

export function scoreCase(candidates, references) {
  const cleaned = [...new Set(candidates.filter(value => typeof value === 'string' && value.trim()).map(normalizeText))].slice(0, 5);
  const rank = cleaned.findIndex(text => references.includes(text)) + 1;
  const best = references.map(reference => ({ edits: levenshtein(cleaned[0] || '', reference), length: [...reference].length })).sort((a, b) => a.edits / a.length - b.edits / b.length)[0];
  return { candidates: cleaned, top1: rank === 1, top5: rank > 0, reciprocalRank: rank > 0 ? 1 / rank : 0, edits: best.edits, referenceLength: best.length };
}

export function wilson(correct, count) {
  if (!count) return null;
  const z = 1.959963984540054, p = correct / count;
  const middle = (p + z * z / (2 * count)) / (1 + z * z / count);
  const half = z * Math.sqrt(p * (1 - p) / count + z * z / (4 * count * count)) / (1 + z * z / count);
  return [Math.max(0, middle - half), Math.min(1, middle + half)];
}

export function summarize(rows) {
  const n = rows.length;
  if (!n) return { n: 0, top1: null, top5: null, mrr: null, cer: null, p50: null, p95: null, errors: 0, interval: null };
  const top1Count = rows.filter(row => row.top1).length;
  const top5Count = rows.filter(row => row.top5).length;
  const milliseconds = rows.map(row => row.ms).sort((a, b) => a - b);
  return { n, top1Count, top5Count, top1: top1Count / n, top5: top5Count / n, mrr: rows.reduce((sum, row) => sum + row.reciprocalRank, 0) / n, cer: rows.reduce((sum, row) => sum + row.edits, 0) / rows.reduce((sum, row) => sum + row.referenceLength, 0), p50: milliseconds[Math.ceil(n * .5) - 1], p95: milliseconds[Math.ceil(n * .95) - 1], errors: rows.filter(row => row.error).length, interval: wilson(top1Count, n) };
}
