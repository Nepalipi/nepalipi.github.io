import { lexicon } from './lexicon.js';
import { decodeRoman, prepareRoman } from './rules.js';
import { orthographyPenalty } from './orthography.js';
import { decodeSegments } from './transducer.js';
import decoderConfig from './decoder-config.js';
import { canPromoteCorrection, sameConsonants } from './corrections.js';
import { verbCandidates, pluralCandidates, nameCandidates } from './morphology.js';
import { nativeCandidates, isNativeWord, nativeConsonantsMatch, nativeKey } from './native-lexicon.js';
import { validNepaliSequence } from './syllables.js';
import { contextualCandidates, contextScope, pronounCandidates, spatialCandidates } from './context.js';

export const ENGINE_VERSION = '2.4.11';
export const LEXICON_SIZE = new Set(lexicon.map(entry => entry.text)).size;

export function normalizeRoman(word) {
  return word.toLowerCase().replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/([aiueo])\1+/g, '$1')
    .replace(/chh/g, 'ch').replace(/sh/g, 's').replace(/[vw]/g, 'b');
}

const index = new Map();
for (const entry of lexicon) {
  for (const spelling of entry.spellings) {
    const key = normalizeRoman(spelling);
    if (!index.has(key)) index.set(key, []);
    index.get(key).push({ entry, spelling });
  }
}
const suffixes = [
  ['harusamma', 'हरूसम्म'], ['harudekhi', 'हरूदेखि'],
  ['harulai', 'हरूलाई'], ['haruko', 'हरूको'], ['haruma', 'हरूमा'], ['harule', 'हरूले'],
  ['harubata', 'हरूबाट'], ['harusanga', 'हरूसँग'], ['haru', 'हरू'],
  ['sanga', 'सँग'], ['samma', 'सम्म'], ['bata', 'बाट'], ['laai', 'लाई'], ['lai', 'लाई'],
  ['maa', 'मा'], ['ma', 'मा'], ['ko', 'को'], ['kaa', 'का'], ['ka', 'का'], ['ki', 'की'], ['le', 'ले'],
];
const cache = new Map();

function editDistance(a, b, maximum) {
  const deletionCost = letter => /[aeiou]/.test(letter) ? .7 : 1;
  if (Math.abs(a.length - b.length) * .7 > maximum) return maximum + 1;
  let row = [0], previous;
  for (let j = 1; j <= b.length; j++) row[j] = row[j - 1] + deletionCost(b[j - 1]);
  for (let i = 1; i <= a.length; i++) {
    const next = [row[0] + deletionCost(a[i - 1])];
    for (let j = 1; j <= b.length; j++) {
      next[j] = Math.min(next[j - 1] + deletionCost(b[j - 1]), row[j] + deletionCost(a[i - 1]), row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) next[j] = Math.min(next[j], previous[j - 2] + .8);
    }
    if (Math.min(...next) > maximum) return maximum + 1;
    previous = row;
    row = next;
  }
  return row[b.length];
}

function lexical(word, nominalOnly = false) {
  return (index.get(normalizeRoman(word)) || []).filter(({ entry }) => !nominalOnly || entry.nominal)
    .map(({ entry, spelling }) => ({ text: entry.text, score: spelling === word.toLowerCase() ? 0 : .45 + .05 * editDistance(word.toLowerCase(), spelling, 64), source: 'lexicon', vetted:entry.vettedAlternatives&&spelling===word.toLowerCase() }));
}

function suffixRepairs(word) {
  if(word.length<8)return[];
  const input=normalizeRoman(word),plural=suffixes.filter(([suffix])=>suffix.startsWith('haru'));
  if(!/h(?:a?r|ra)/.test(input))return[];
  const repairs=[];
  // A known noun followed by a slightly mistyped case ending is much less
  // ambiguous than correcting the entire token against an unrelated word.
  for(const [key,records] of index) {
    if(key.length<3||!input.startsWith(key))continue;
    const tail=input.slice(key.length);
    if(tail.length<4)continue;
    for(const [suffix,native] of plural) {
      const distance=editDistance(tail,suffix,1.8);
      if(!distance||distance>1.8)continue;
      if(!tail.startsWith('haru')&&!canPromoteCorrection(tail,suffix))continue;
      for(const {entry} of records.filter(r=>r.entry.nominal))repairs.push({text:entry.text+native,score:canPromoteCorrection(tail,suffix)&&distance<=1?2.75:3.5+distance*.1,source:'suffix-repair'});
    }
  }
  // Conversely, a correctly typed productive ending can support a small
  // schwa/transposition repair in its noun stem. Keep vowel evidence intact.
  for(const [suffix,native] of plural) {
    if(!input.endsWith(suffix))continue;
    const stem=input.slice(0,-suffix.length);
    if(stem.length<4||index.get(stem)?.some(r=>r.entry.nominal))continue;
    for(const [key,records] of index) {
      if(!canPromoteCorrection(stem,key))continue;
      const distance=editDistance(stem,key,1);
      if(!distance||distance>1)continue;
      let position=0;
      for(const letter of key)if(stem[position]===letter)position++;
      const onlyOmittedSchwa=position===stem.length;
      for(const {entry} of records.filter(r=>r.entry.nominal))repairs.push({text:entry.text+native,score:onlyOmittedSchwa?2.75:3.55,source:'suffix-repair'});
    }
  }
  return repairs.sort((a,b)=>a.score-b.score).slice(0,3);
}

function baseCandidates(input, ruleBias, legacyBias) {
  const cacheKey = `${ruleBias}:${legacyBias}:${input}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const word = prepareRoman(input);
  // This is a word-suggestion policy, distinct from literal script decoding.
  if(word==='ye')return [{text:'ए',score:0,source:'orthographic-letter'},{text:'य',score:.1,source:'orthographic-letter'}];
  const normalized = normalizeRoman(word);
  const names = /[A-Z]/.test(word) ? [] : nameCandidates(word);
  const native = /[A-Z]/.test(word) ? [] : nativeCandidates(word).map(candidate =>
    names.length && candidate.aliasOnly ? {...candidate,score:candidate.score+2} : candidate);
  const nativeMatches = new Set(native.filter(candidate=>candidate.score<3).map(candidate=>nativeKey(candidate.text)));
  const results = new Map();
  const add = candidate => {
    if (!validNepaliSequence(candidate.text)) return;
    const existing=results.get(candidate.text);
    const nameForm=Boolean(candidate.nameForm||existing?.nameForm);
    if (!existing || candidate.score < existing.score) results.set(candidate.text, {...candidate,nameForm});
    else if(nameForm)existing.nameForm=true;
  };
  // Informal -iye for a known -iya adjective denotes written -ीय, not -िये.
  // Resolve supported words; never globally rewrite Sanskrit-derived ye forms.
  const adjectiveEndings=new Set();
  if(!/[A-Z]/.test(word)&&/(?:i|ee|ii)ye$/.test(word)) {
    for(const candidate of baseCandidates(word.slice(0,-1)+'a',ruleBias,legacyBias)) {
      if(!candidate.text.endsWith('ीय')||!(isNativeWord(candidate.text)||candidate.source==='lexicon'))continue;
      adjectiveEndings.add(candidate.text);
      add({...candidate,score:candidate.score+.15,source:'orthographic-ending'});
    }
  }
  // Explicit mixed-case hints take precedence over case-insensitive lexicon entries.
  if (!/[A-Z]/.test(word)) {
    lexical(word).forEach(add);
    pronounCandidates(word).forEach(add);
    spatialCandidates(word).forEach(add);
    native.forEach(add);
    verbCandidates(word,normalizeRoman).forEach(add);
    suffixRepairs(word).forEach(add);
    for (const [suffix, native] of suffixes) {
      if (word.length <= suffix.length + 1 || !word.endsWith(suffix)) continue;
      for (const candidate of lexical(word.slice(0, -suffix.length), true)) add({ text: candidate.text + native, score: candidate.score + .25, source: 'suffix', vetted:candidate.vetted });
    }
    // Short fragments are too ambiguous for typo correction.
    if (normalized.length >= 4 && word.length >= 5) {
      const maximum = normalized.length >= 9 ? 2 : 1;
      for (const [key, records] of index) {
        const distance = editDistance(normalized, key, maximum);
        if (!distance || distance > maximum) continue;
        for (const { entry, spelling } of records) {
          const promote = canPromoteCorrection(word,spelling), recallHint = sameConsonants(word,spelling);
          if (!promote && !recallHint) continue;
          add({ text: entry.text, score: 1.3 + distance + (promote ? 0 : 2.5), source: 'spelling', recallHint });
        }
      }
    }
  }
  // Only reviewed exact aliases constrain generic alternatives. Applying this
  // to every normalized noun/verb match would erase valid names and inflections.
  const canonical=new Set([...results.values()].filter(candidate=>['lexicon','suffix'].includes(candidate.source)&&candidate.vetted).map(candidate=>candidate.text));
  const inflected=new Set([...results.values()].filter(candidate=>candidate.source==='verb-form').map(candidate=>candidate.text));
  // Segment model and configuration were learned/selected from TRAIN/validation only.
  if (!/[A-Z]/.test(word)) {
    const recognized = native.length > 0 || [...results.values()].some(candidate=>['lexicon','suffix','verb-form'].includes(candidate.source));
    const plausible = candidate => (!/^[aeiou]/.test(word) || /^[अ-औ]/u.test(candidate.text)) &&
      (candidate.phoneticCost === 0 ||
      (word.length >= 4 && isNativeWord(candidate.text) && nativeConsonantsMatch(word,candidate.text)) ||
      (!recognized && candidate.splitCost === 0));
    const learned = decodeSegments(word, { ...decoderConfig, limit: 24 }).filter(plausible);
    const best = learned[0]?.cost || 0;
    for (const candidate of learned) add({ text: candidate.text, score: (nativeMatches.has(nativeKey(candidate.text))?1:3) + (candidate.cost - best) / word.length, source: 'transducer' });
    if (legacyBias !== null) {
      // The global emission path shares the same model data. Keep its useful
      // alternatives rather than discarding them when boundaries are added.
      const global = decodeSegments(word, {width:32,languageWeight:.75,limit:16}).filter(plausible);
      const first = global[0]?.cost || 0;
      for (const candidate of global) add({text:candidate.text,score:(nativeMatches.has(nativeKey(candidate.text))?1:3)+legacyBias+(candidate.cost-first)/word.length,source:'transducer-global'});
    }
    pluralCandidates(word).forEach(add);
    names.forEach(add);
  }
  // Weight 3 was selected on the original validation run; keep as a final fallback.
  // Explicit mixed-case hints keep their original literal ordering.
  const literal = decodeRoman(word, { width: 48, limit: 32 });
  const minimum = literal[0]?.cost ?? 0;
  const attested = [...results.values()].some(candidate=>isNativeWord(candidate.text) || ['lexicon','suffix','verb-form'].includes(candidate.source));
  const rulePool = literal.filter(candidate => candidate.cost <= minimum + .8 && (!attested || isNativeWord(candidate.text))).map(candidate => {
    const prior = /[A-Z]/.test(word) ? 0 : 3 * orthographyPenalty(candidate.text);
    return {text:candidate.text,cost:candidate.cost+prior};
  });
  const bestRule = Math.min(...rulePool.map(candidate=>candidate.cost));
  for (const candidate of rulePool) {
    // Both pools now express within-model cost differences per input letter.
    // A validation-selected positive offset retains the learned first choice
    // while letting useful literal alternatives compete below it.
    const cost = ruleBias === null || /[A-Z]/.test(word) ? candidate.cost : ruleBias+(candidate.cost-bestRule)/word.length;
    add({ text: candidate.text, score: 3 + cost, source: 'rules' });
  }
  const generative=new Set(['transducer','transducer-global','rules','plural-form','name-form']);
  const ranked = [...results.values()].filter(candidate=>{
    if(adjectiveEndings.size&&!adjectiveEndings.has(candidate.text))return false;
    if(canonical.size&&['spelling','suffix-repair'].includes(candidate.source)&&!canonical.has(candidate.text))return false;
    if(!generative.has(candidate.source))return true;
    if(inflected.size&&candidate.text.includes('ये')&&!inflected.has(candidate.text))return false;
    return !canonical.size||canonical.has(candidate.text)||isNativeWord(candidate.text);
  })
    .sort((a, b) => a.score - b.score).slice(0, 40);
  if (cache.size >= 256) cache.delete(cache.keys().next().value);
  cache.set(cacheKey, ranked);
  return ranked;
}

export function rankSuggestions(word, { limit = 5, preferences, before = '', ruleBias = decoderConfig.ruleBias ?? null, legacyBias = decoderConfig.legacyBias ?? null } = {}) {
  if (typeof word !== 'string') return [];
  if (!/^[a-zA-Z]{1,64}$/.test(word)) return [{ text: word, score: 0, source: 'literal' }];
  const candidates = contextualCandidates(word,baseCandidates(word, ruleBias, legacyBias).map(candidate => ({ ...candidate })),before);
  const grammatical=candidates.find(candidate=>candidate.source==='context'&&candidate.score===-1);
  const hasYeCorrection=candidates.some(candidate=>candidate.source==='orthographic-ending'||candidate.source==='orthographic-letter'||candidate.source==='verb-form'||candidate.vetted);
  const scope=contextScope(word,before);
  const personalize=(text,count,offset=-2)=>{
    if(hasYeCorrection&&text.includes('ये')&&!candidates.some(candidate=>candidate.text===text))return;
    const known = candidates.find(candidate => candidate.text === text);
    if (known) { known.score = offset - Math.log1p(count); known.source = 'personal'; }
    else candidates.push({ text, score: offset - Math.log1p(count), source: 'personal' });
  };
  for (const [text, count] of preferences?.forWord(word) || []) {
    if(grammatical&&text.replace(/ं/g,'ँ')!==grammatical.text.replace(/ं/g,'ँ'))continue;
    personalize(text,count);
  }
  for(const [text,count] of preferences?.forContext?.(word,scope)||[])personalize(text,count,-10);
  const ranked = candidates.sort((a, b) => a.score - b.score);
  const size = Math.max(1, Math.min(10, limit));
  const result = ranked.slice(0, size);
  // A productive name ending is useful evidence even when the full word is
  // absent from the learned vocabulary. Retain one transparent alternative.
  const composed=!result.some(candidate=>candidate.nameForm) && ranked.find(candidate=>candidate.nameForm);
  const suffixRepair=ranked.find(candidate=>candidate.source==='suffix-repair'&&!result.some(item=>item.text===candidate.text));
  // Keep one consonant-preserving lexical repair available without letting it
  // replace the first literal spelling (e.g. an omitted final vowel).
  const repair = ranked.find(candidate => candidate.source === 'spelling' && candidate.recallHint && !result.some(item => item.text === candidate.text));
  const reserved=composed||suffixRepair||repair;
  if(size>=5&&result.length===size&&reserved)result[size-1]=reserved;
  else if(size>=3&&size<5&&result.length===size&&repair)result[size-1]=repair;
  const join=ranked.find(candidate=>candidate.source==='word-join');
  if(size>=3&&join&&!result.includes(join))result[Math.min(size-1,result.length)]=join;
  return result;
}

export function suggest(word, options) { return rankSuggestions(word, options).map(candidate => candidate.text); }
export function transliterate(word) { return decodeRoman(word, { limit: 1 })[0]?.text ?? word; }
