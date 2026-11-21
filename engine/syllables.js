// Validate logical Devanagari order, not a font's visual glyph order. The
// inherent vowel is live until a vowel sign replaces it or virama removes it.
// This checks the Nepali word repertoire; it does not judge a word's meaning.
export function validNepaliSequence(text) {
  if (typeof text !== 'string' || !text.length) return false;
  let consonant = false, live = false, dead = false, marked = false, nukta = false;
  const chars = [...text.normalize('NFC')];
  for (let i=0; i<chars.length; i++) {
    const char = chars[i];
    if (/^[क-हक़-य़]$/u.test(char)) {
      consonant=true; live=true; dead=false; marked=false; nukta=false;
    } else if (/^[अ-औॠॡॐ]$/u.test(char)) {
      if (dead) return false;
      consonant=false; live=true; marked=false; nukta=false;
    } else if (char==='़') {
      if (!consonant || !live || marked || nukta) return false;
      nukta=true;
    } else if (/^[ािीुूृॄॅॆेैॉॊोौॢॣ]$/u.test(char)) {
      if (!consonant || !live || marked) return false;
      consonant=false;
    } else if (char==='्') {
      if (!consonant || !live || marked) return false;
      consonant=false; live=false; dead=true;
    } else if (/^[ँंः]$/u.test(char)) {
      if (!live || marked) return false;
      consonant=false; marked=true;
    } else if (char==='\u200c' || char==='\u200d') {
      if (!dead && !(chars[i-1]==='र' && chars[i+1]==='्')) return false;
    } else return false;
  }
  return true;
}
