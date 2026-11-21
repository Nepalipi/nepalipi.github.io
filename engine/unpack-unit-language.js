// Read the lossless count format written by scripts/pack_unit_language.py.
export function unpackUnitLanguage(training, packed) {
  const bytes = atob(packed);
  let offset = 0;

  function readInt() {
    let value = 0;
    for (let shift = 0; shift <= 28 && offset < bytes.length; shift += 7) {
      const byte = bytes.charCodeAt(offset++);
      value += (byte & 127) * 2 ** shift;
      if (byte < 128 && value <= 0xffffffff) return value;
    }
    throw new Error('Invalid packed unit-language count');
  }

  function readCounts() {
    const counts = {};
    const size = readInt();
    let index = 0;
    for (let i = 0; i < size; i++) {
      index += readInt();
      counts[index - 2] = readInt();
    }
    return counts;
  }

  function readContexts(order) {
    const contexts = {};
    const size = readInt();
    for (let i = 0; i < size; i++) {
      const first = readInt() - 2;
      const key = order === 1 ? first : `${first},${readInt() - 2}`;
      contexts[key] = [readInt(), readInt(), readCounts()];
    }
    return contexts;
  }

  const unigrams = readCounts();
  const bigrams = readContexts(1);
  const trigrams = readContexts(2);
  if (offset !== bytes.length) throw new Error('Unexpected packed unit-language data');
  return { training, unigrams, bigrams, trigrams };
}
