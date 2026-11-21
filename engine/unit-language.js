import model from './unit-language-data.js';

const total = Object.values(model.unigrams).reduce((sum, count) => sum + count, 0);
const vocabulary = Object.keys(model.unigrams).length;
const prepare = record => {
  const [count, types, values] = record;
  const denominator = count + 3 * types;
  return { denominator, values, backoffWeight: 1 - Object.values(values).reduce((sum, value) => sum + value, 0) / denominator };
};
const bigrams = Object.fromEntries(Object.entries(model.bigrams).map(([key, value]) => [key, prepare(value)]));
const trigrams = Object.fromEntries(Object.entries(model.trigrams).map(([key, value]) => [key, prepare(value)]));

export function unitLanguagePenalty(before, previous, current) {
  let probability = ((model.unigrams[current] || 0) + .1) / (total + .1 * vocabulary);
  const bigram = bigrams[previous];
  if (bigram) probability = (bigram.values[current] || 0) / bigram.denominator + bigram.backoffWeight * probability;
  const trigram = trigrams[`${before},${previous}`];
  if (trigram) probability = (trigram.values[current] || 0) / trigram.denominator + trigram.backoffWeight * probability;
  return -Math.log(probability);
}
