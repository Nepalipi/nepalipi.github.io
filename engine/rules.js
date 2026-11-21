// Weighted Roman -> Devanagari decoding. Costs are hand-tuned, not probabilities.
import { validNepaliSequence } from './syllables.js';
const consonants = {
  ksh: [['क्ष', 0]], chh: [['छ', 0]], gy: [['ज्ञ', 0], ['ग्य', .4]], jny: [['ज्ञ', 0]],
  kh: [['ख', 0]], gh: [['घ', 0]], ch: [['च', 0], ['छ', .5]], jh: [['झ', 0]],
  Th: [['ठ', 0]], Dh: [['ढ', 0]], th: [['थ', 0], ['ठ', .35]], dh: [['ध', 0], ['ढ', .35]],
  ph: [['फ', 0]], bh: [['भ', 0]], sh: [['श', 0], ['ष', .35], ['स', .6]], Sh: [['ष', 0]],
  ng: [['ङ', 0], ['ं', .2]], ny: [['ञ', 0], ['न्य', .3]],
  k: [['क', 0]], g: [['ग', 0]], c: [['क', 0], ['च', .4]], j: [['ज', 0]],
  T: [['ट', 0]], D: [['ड', 0]], N: [['ण', 0]], t: [['त', 0], ['ट', .4]], d: [['द', 0], ['ड', .4]], n: [['न', 0], ['ण', .7]],
  p: [['प', 0]], b: [['ब', 0], ['व', .5]], m: [['म', 0]], y: [['य', 0]], r: [['र', 0]], l: [['ल', 0]],
  v: [['व', 0], ['ब', .4]], w: [['व', 0], ['ब', .4]], s: [['स', 0], ['श', .45], ['ष', .8]],
  h: [['ह', 0]], f: [['फ', 0]], q: [['क', 0]], z: [['ज', 0]], x: [['क्स', 0], ['क्ष', .3], ['छ', .35]],
};
const vowels = {
  aa: [['आ', 'ा', 0]], ai: [['ऐ', 'ै', 0]], au: [['औ', 'ौ', 0]], ee: [['ई', 'ी', 0]], oo: [['ऊ', 'ू', 0]],
  a: [['अ', '', 0], ['आ', 'ा', .35]], A: [['आ', 'ा', 0]],
  i: [['इ', 'ि', 0], ['ई', 'ी', .3]], I: [['ई', 'ी', 0]],
  u: [['उ', 'ु', 0], ['ऊ', 'ू', .3]], U: [['ऊ', 'ू', 0]],
  e: [['ए', 'े', 0]], o: [['ओ', 'ो', 0]],
};
const tokens = [...Object.keys(consonants), ...Object.keys(vowels)].sort((a, b) => b.length - a.length);

export function prepareRoman(word) {
  // Ordinary title/all-capital words are case-insensitive. Mixed-case hints remain.
  if (/^(?:[A-Z][a-z]+|[A-Z]{2,})$/.test(word)) return word.toLowerCase();
  return word.replace(/[A-Z]/g, (letter, index) => 'TDNAIU'.includes(letter) || (letter === 'S' && word[index + 1] === 'h') ? letter : letter.toLowerCase());
}

function prune(states, width) {
  const best = new Map();
  for (const state of states) {
    const key = `${state.output}:${state.join}`;
    if (!best.has(key) || state.cost < best.get(key).cost) best.set(key, state);
  }
  return [...best.values()].sort((a, b) => a.cost - b.cost).slice(0, width);
}

export function decodeRoman(input, { width = 24, limit = 12 } = {}) {
  if (!/^[a-zA-Z]{1,64}$/.test(input)) return [];
  const word = prepareRoman(input);
  const positions = Array.from({ length: word.length + 1 }, () => []);
  positions[0].push({ output: '', join: false, cost: 0 });
  for (let index = 0; index < word.length; index++) {
    const matches = tokens.filter(token => word.startsWith(token, index));
    const longest = matches[0]?.length || 1;
    for (const state of prune(positions[index], width)) {
      for (const token of matches) {
        const end = index + token.length;
        const splitCost = token.length < longest ? .9 : 0;
        if (vowels[token]) {
          for (const [independent, sign, cost] of vowels[token]) {
            positions[end].push({ output: state.output + (state.join ? sign : independent), join: false, cost: state.cost + cost + splitCost });
          }
        } else {
          for (const [letter, cost] of consonants[token]) {
            if (letter === 'ं') {
              positions[end].push({ output: state.output + letter, join: false, cost: state.cost + cost + splitCost });
              continue;
            }
            positions[end].push({ output: state.output + (state.join ? '्' : '') + letter, join: true, cost: state.cost + cost + splitCost });
            if (state.join) positions[end].push({ output: state.output + letter, join: true, cost: state.cost + cost + splitCost + .6 });
          }
        }
      }
    }
  }
  const result = new Map();
  for (const state of prune(positions[word.length], width)) {
    const text = state.output.normalize('NFC');
    if (!validNepaliSequence(text)) continue;
    if (!result.has(text)) result.set(text, { text, cost: state.cost });
  }
  return [...result.values()].slice(0, limit);
}
