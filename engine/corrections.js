// Strong autocorrection may repair vowels or an adjacent transposition; it must
// not silently replace consonants or change a word's final vowel into a suffix.
const soundForm = word => word.toLowerCase().replace(/ee/g, 'i').replace(/oo/g, 'u').replace(/([aeiou])\1+/g, '$1').replace(/[vw]/g, 'b');
export function sameConsonants(input, spelling) { return soundForm(input).replace(/[aeiou]/g, '') === soundForm(spelling).replace(/[aeiou]/g, ''); }
export function canPromoteCorrection(input, spelling) {
  const a = soundForm(input), b = soundForm(spelling);
  // Repeated e/o can be either long-vowel notation or an accidental repeated
  // key. A direct dictionary match for the long vowel still ranks ahead of
  // repairs; permit a one-key repetition repair to an otherwise exact alias.
  const unrepeated=input.toLowerCase().replace(/([eo])\1+/g,'$1');
  if(unrepeated!==input.toLowerCase()&&soundForm(unrepeated)===b)return true;
  // Schwa omissions and transpositions are useful repairs. Changing an
  // explicitly typed vowel or adding/removing an initial vowel can change
  // meaning (e.g. negative a- prefixes) and must remain an alternative.
  if (/^[aeiou]/.test(a) !== /^[aeiou]/.test(b)) return false;
  if ((a.match(/[eiou]/g)||[]).join('') !== (b.match(/[eiou]/g)||[]).join('')) return false;
  if (sameConsonants(input, spelling) && (a.match(/[aeiou]+$/)?.[0] || '') === (b.match(/[aeiou]+$/)?.[0] || '')) return true;
  if (a.length !== b.length) return false;
  const different = [...a].flatMap((letter, index) => letter === b[index] ? [] : [index]);
  return different.length === 2 && different[1] === different[0] + 1 && a[different[0]] === b[different[1]] && a[different[1]] === b[different[0]];
}
