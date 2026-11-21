import rows from './native-lexicon-data.js';

// This folds phonetic notation for retrieval only, never for personal choices.
export const phoneticKey = word => word.toLowerCase().replace(/ee|ii/g, 'i').replace(/oo|uu/g, 'u')
  .replace(/([aiueo])\1+/g, '$1').replace(/jny|gny/g,'gy').replace(/chh/g, 'ch').replace(/sh/g, 's').replace(/[vw]/g, 'b').replace(/x/g, 'ks');
// Older dictionary conventions vary in i/u length and nasal mark. Retain the
// displayed spellings, but recognize those variants as lexical evidence too.
export const nativeKey = text => text.replace(/[ीई]/g, c=>c==='ी'?'ि':'इ').replace(/[ूऊ]/g,c=>c==='ू'?'ु':'उ').replace(/ँ/g,'ं');
const words = new Set(rows.map(([text]) => nativeKey(text)));
const consonants = roman => phoneticKey(roman.replace(/c(?=[eiy])/g,'s').replace(/c/g,'k').replace(/ph/g,'f').replace(/z/g,'j').replace(/q/g,'k'))
  .replace(/[aeiou]/g,'').replace(/(.)\1+/g,'$1');
const pronunciations = new Map();
const index = new Map();
for (const [text, spellings] of rows) for (const [i, spelling] of spellings.entries()) {
  const native = nativeKey(text);
  if (!pronunciations.has(native)) pronunciations.set(native,new Set());
  pronunciations.get(native).add(consonants(spelling));
  const key = phoneticKey(spelling);
  if (!index.has(key)) index.set(key, new Map());
  const matches = index.get(key);
  if (!matches.has(text)) matches.set(text, []);
  matches.get(text).push({spelling, penalty: i === 0 ? 0 : .15});
}
export const isNativeWord = text => words.has(nativeKey(text));
export const nativeConsonantsMatch = (roman,text) => pronunciations.get(nativeKey(text))?.has(consonants(roman)) ?? false;
export const NATIVE_LEXICON_SIZE = rows.length;
function distance(a, b) {
  let row = Array.from({length:b.length+1}, (_,i) => i*.2);
  for (let i=0;i<a.length;i++) {
    const next = [row[0]+.2];
    for(let j=0;j<b.length;j++) next.push(Math.min(row[j+1]+.2,next[j]+.2,row[j]+(a[i]===b[j]?0:.4)));
    row=next;
  }
  return row[b.length];
}
function vowelHintPenalty(word, spelling) {
  const typed = word.match(/[aeiou]+/g) || [], native = spelling.match(/[aeiou]+/g) || [];
  return typed.some((run,i) => /aa/.test(run) && !/aa/.test(native[i]||'') ||
    /ee|ii/.test(run) && !/ee|ii/.test(native[i]||'') ||
    /oo|uu/.test(run) && !/oo|uu/.test(native[i]||'')) ? 3 : 0;
}
export function nativeCandidates(word) {
  // Informal x can mean छ, क्ष or क्स. Keep all interpretations available;
  // retrieve actual spellings rather than globally rewriting the user's input.
  const variants=[{roman:word,cost:0}];
  if(word.includes('x'))for(const value of ['chh','ksh','ks'])variants.push({roman:word.replace(/x/g,value),cost:.15});
  // A doubled h after ksh is a common key repeat. Restrict repair to words
  // that have a dictionary spelling after removing the extra h.
  if(word.includes('kshh'))variants.push({roman:word.replace(/kshh/g,'ksh'),cost:.15});
  const candidates=new Map();
  for(const {roman,cost} of variants)for(const [text,spellings] of index.get(phoneticKey(roman))||[]) {
    const score=1.1+cost+Math.min(...spellings.map(({spelling,penalty})=>penalty+distance(roman,spelling)+vowelHintPenalty(word,spelling)));
    const aliasOnly=spellings.every(({penalty})=>penalty>0);
    const previous=candidates.get(text);
    if(!previous||score<previous.score)candidates.set(text,{text,score,aliasOnly,source:'native-lexicon'});
  }
  return [...candidates.values()];
}
