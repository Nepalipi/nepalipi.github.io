export { suggest as localSuggestions, transliterate } from './engine/engine.js';

export function wordAtCaret(text, caret) {
  if (caret < 0 || caret > text.length) return null;
  const before = text.slice(0, caret).match(/[a-zA-Z]+$/)?.[0] || '';
  if (!before) return null;
  const after = text.slice(caret).match(/^[a-zA-Z]+/)?.[0] || '';
  const word = before + after;
  if (word.length > 64) return null;
  return { word, start: caret - before.length, end: caret + after.length };
}
