import model from './orthography-data.js';

const total = Object.values(model.unigrams).reduce((sum, count) => sum + count, 0);
const vocabulary = Object.keys(model.unigrams).length;

export function advanceOrthography(context, text) {
  let penalty = 0;
  for (const character of text) {
    const counts = model.contexts[context];
    const backoff = ((model.unigrams[character] || 0) + .5) / (total + .5 * vocabulary);
    const probability = counts ? ((counts[1][character] || 0) + 4 * backoff) / (counts[0] + 4) : backoff;
    penalty -= Math.log(probability);
    context = (context + character).slice(-2);
  }
  return { context, penalty };
}

// A smoothed character trigram prior, not a word lookup or a neural model.
export function orthographyPenalty(text) {
  const letters = [...`^^${text.normalize('NFC')}$`];
  let penalty = 0;
  for (let i = 2; i < letters.length; i++) {
    const character = letters[i];
    const context = model.contexts[letters[i - 2] + letters[i - 1]];
    const backoff = ((model.unigrams[character] || 0) + .5) / (total + .5 * vocabulary);
    const probability = context ? ((context[1][character] || 0) + 4 * backoff) / (context[0] + 4) : backoff;
    penalty -= Math.log(probability);
  }
  return penalty / (letters.length - 2);
}
