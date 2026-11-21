import model from './transducer-data.js';
import positionModel from './position-data.js';
import { advanceOrthography } from './orthography.js';
import { unitLanguagePenalty } from './unit-language.js';

const transitions = new Map();
const validUnit = /^(?:[अ-औॠॡॐ]|[क-हक़-य़]़?(?:[ािीुूृॄेैोौॅॉ]|्)?)[ंँः]?$/u;
const segments = Object.fromEntries(Object.entries(model.segments).map(([segment, choices]) => [segment, choices.filter(([id]) => validUnit.test(model.units[id])).map(([id, cost]) => ({ id, cost, text: model.units[id], consonant: /^[क-हक़-य़]/u.test(model.units[id]), virama: model.units[id].endsWith('्') })).sort((a, b) => a.cost - b.cost)]));
const positionTables = new Map();
function tablesFor(weight, phoneticWeight) {
  const key = `${weight}:${phoneticWeight}`;
  if (positionTables.has(key)) return positionTables.get(key);
  const compiled = Array.from({length:weight===0?1:4}, (_,boundary) => Object.fromEntries(Object.entries(segments).map(([segment,choices])=>{
    const costs = new Map(positionModel.tables[boundary][segment]);
    const phonetics = new Map(positionModel.phonetic[segment]);
    return [segment, choices.map(choice=>({...choice,phoneticCost:phonetics.get(choice.id)??Infinity,cost:choice.cost+weight*((costs.get(choice.id)??choice.cost)-choice.cost)+phoneticWeight*(phonetics.get(choice.id)||0)})).sort((a,b)=>a.cost-b.cost).slice(0,12)];
  })));
  const tables = weight===0 ? Array(4).fill(compiled[0]) : compiled;
  positionTables.set(key,tables);
  return tables;
}
function advance(context, unitId) {
  const key = `${context}:${unitId}`;
  if (transitions.has(key)) return transitions.get(key);
  const result = advanceOrthography(context, model.units[unitId]);
  if (transitions.size >= 20000) transitions.delete(transitions.keys().next().value);
  transitions.set(key, result);
  return result;
}

export function decodeSegments(word, { width = 32, languageWeight = .5, unitPenalty = 0, positionWeight = 0, phoneticWeight = 0, limit = 32, languageModel = 'units' } = {}) {
  if (!/^[a-z]{1,64}$/.test(word)) return [];
  const tables = tablesFor(positionWeight, phoneticWeight);
  const tokenCuts = new Set();
  for(let i=0;i<word.length;i++) {
    // ai/au can also be successive vowels (लाई/आउन), so do not force a
    // diphthong. Repeated-vowel notation and consonant hints are less ambiguous.
    // Conjuncts such as ksh/gy legitimately span two native model units.
    const token = /^(?:chh|aa|ee|ii|oo|uu|kh|gh|ch|jh|th|dh|ph|bh|sh)/.exec(word.slice(i))?.[0];
    if (!token) continue;
    for(let j=1;j<token.length;j++)tokenCuts.add(i+j);
    i+=token.length-1;
  }
  const positions = Array.from({ length: word.length + 1 }, () => new Map());
  positions[0].set('', { text: '', context: '^^', cost: 0, phoneticCost: 0, splitCost: 0, virama: false, before: -1, previous: -1 });
  for (let offset = 0; offset < word.length; offset++) {
    const states = [...positions[offset].values()].sort((a, b) => a.cost - b.cost).slice(0, width);
    for (let length = 1; length <= 6 && offset + length <= word.length; length++) {
      const boundary = offset===0 ? offset+length===word.length ? 3 : 1 : offset+length===word.length ? 2 : 0;
      const choices = tables[boundary][word.slice(offset, offset + length)];
      if (!choices) continue;
      const target = positions[offset + length];
      for (const state of states) for (const choice of choices) {
        if (state.virama && !choice.consonant) continue;
        const step = languageModel === 'units' ? { context: '', penalty: unitLanguagePenalty(state.before, state.previous, choice.id) } : advance(state.context, choice.id);
        const cost = state.cost + choice.cost + languageWeight * step.penalty + unitPenalty;
        const text = state.text + choice.text;
        // A long vowel typed as aa/ii/etc. is evidence for one vowel unit.
        // Track split syllables separately even if each emission matches a seed.
        const extraVowel = state.previous >= 0 && /^[क-ह]/u.test(model.units[state.previous]) && /^[अ-औ]/u.test(choice.text) && !/[aeiou]/.test(word[offset-1]);
        const split = (tokenCuts.has(offset) ? .9 : 0) + (extraVowel ? .45 : 0);
        const phoneticCost = state.phoneticCost + choice.phoneticCost + split;
        const splitCost = state.splitCost + split;
        if (!target.has(text) || target.get(text).cost > cost) target.set(text, { text, cost, phoneticCost, splitCost, context: step.context, virama: choice.virama, before: state.previous, previous: choice.id });
      }
      if (target.size > width * 8) positions[offset + length] = new Map([...target.entries()].sort((a, b) => a[1].cost - b[1].cost).slice(0, width * 3));
    }
  }
  return [...positions[word.length].values()].map(state => ({ text: state.text, phoneticCost: state.phoneticCost, splitCost: state.splitCost, cost: state.cost + languageWeight * (languageModel === 'units' ? unitLanguagePenalty(state.before, state.previous, -2) : advanceOrthography(state.context, '$').penalty) })).sort((a, b) => a.cost - b.cost).slice(0, limit);
}
