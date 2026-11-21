import run from './results.js';
import current from './current-results.js';
import { summarize } from './metrics.js';
import { suggest, ENGINE_VERSION } from '../engine/engine.js';

const $ = id => document.getElementById(id);
const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};
const percent = value => value === null ? '—' : `${(value * 100).toFixed(2)}%`;
const decimal = value => value === null ? '—' : value.toFixed(3);
const number = value => value.toLocaleString('en-US');
const date=value=>new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value));
$('current-version').textContent=`Engine ${current.engineVersion} · recorded ${date(current.capturedAt)} UTC`;
for(const [track,s] of Object.entries(current.tracks))$('current-'+track).textContent=`${s.matched}/${s.n}`;
$('current-choice-detail').textContent=`${current.tracks.choices.withinFive}/${current.tracks.choices.n} within five`;
$('current-word-date').textContent=`Word replay recorded ${date(current.wordRecordedAt)} UTC.`;
const wordLabels={'google-comparison':'Google-comparison inputs','typing-check':'Everyday typing regression','public-test':'Full public test',development:'Development',confirmation:'Former confirmation','fresh-regression':'Former fresh regression',categories:'Category probes'};
for(const suite of current.words){
  const row=node('tr');row.dataset.currentSuite=suite.id;
  for(const text of [wordLabels[suite.id]||suite.id,String(suite.n),`${suite.first}/${suite.n}`,`${suite.withinFive}/${suite.n}`])row.append(node('td','',text));
  $('current-word-rows').append(row);
}
for(const [split,stages] of Object.entries(current.usage.splits)){
  const row=node('tr');row.dataset.usageSplit=split;
  row.append(node('td','',split==='development'?'Development':'Reserved confirmation'));
  for(const track of ['choices','sentences']){
    const old=stages.before[track].summary,now=stages.after[track].summary;
    row.append(node('td','',`${old.matched}/${old.n} → ${now.matched}/${now.n}`));
  }
  $('current-usage-rows').append(row);
}
const labels = { 'AK-Freq': 'Frequent words', 'AK-NEI': 'Indian entities', 'AK-NEF': 'Foreign entities', common: 'Common words', variants: 'Spelling variations', suffixes: 'Suffix combinations', typos: 'Typos', names: 'Unfamiliar names' };
const metrics = { top1: { label: 'top-1 accuracy', direction: -1 }, top5: { label: 'top-5 recall', direction: -1 }, cer: { label: 'character error', direction: 1 }, p50: { label: 'median latency', direction: 1 } };
const params = new URLSearchParams(location.search);
let suiteId = run.suites.some(suite => suite.id === params.get('suite')) ? params.get('suite') : 'google-comparison';
let category = params.get('category') || 'all';
let metric = metrics[params.get('metric')] ? params.get('metric') : 'top1';
let page = 0;
let toastTimer;
const pageSize = 25;
const captures = new Map();
for (const suite of run.suites.filter(suite=>suite.outputs.google)) {
  const date = run.googleSnapshots[suite.snapshotKey]?.completedAt;
  for (const [index, item] of suite.cases.entries()) {
    const previous = captures.get(item.roman);
    if (!previous || date > previous.date) captures.set(item.roman, {date, label:suite.label, output:suite.outputs.google[index]});
  }
}
$('live-version').textContent = `Engine ${ENGINE_VERSION} · on-device`;
$('live-input').value = new URLSearchParams(location.hash.slice(1)).get('probe') ?? 'naam';
$('live-before').value = new URLSearchParams(location.hash.slice(1)).get('before') ?? '';

function renderLiveProbe() {
  const word = $('live-input').value;
  const valid = /^[a-zA-Z]{1,64}$/.test(word);
  const prefix=$('live-before').value;
  const before=prefix&&!/\s$/.test(prefix)?prefix+' ':prefix;
  const ours = valid ? suggest(word,{before}) : [];
  const capture = valid ? captures.get(word) : undefined;
  const google = capture?.output.candidates || [];
  for (const [id, values] of [['live-ours',ours],['live-google',google]]) {
    $(id).replaceChildren(...values.map(text=>node('li','',text)));
  }
  $('live-ours-count').textContent = ours.length ? `${ours.length} ${ours.length===1?'suggestion':'suggestions'}` : '';
  $('live-google-count').textContent = google.length ? `${google.length} captured` : '';
  $('live-ours-state').textContent = !valid ? 'Enter one word using Latin letters (up to 64).' : prefix ? 'Uses the preceding text. Joined forms require explicit selection in the writer.' : 'The same default ranking used by the writer.';
  $('live-google-state').textContent = !valid ? 'A saved response requires an exact input match.' : !capture ? 'No saved Google response for this exact input.' : capture.output.error ? `Capture error: ${capture.output.error}` : `Captured ${new Date(capture.date).toISOString().slice(0,10)} UTC · ${capture.label}. This is not a live request.${prefix?' This capture has no preceding context.':''}`;
}

$('run-date').textContent = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: run.displayTimezone }).format(new Date(run.generatedAt));
$('run-date').dateTime = run.generatedAt;
$('run-environment').textContent = `${run.machine.node} · ${run.machine.arch} · ${run.machine.platform}`;
$('dataset').replaceChildren(...run.suites.map(suite=>{
  const option=document.createElement('option');option.value=suite.id;option.textContent=suite.label;return option;
}));
$('dataset').value = suiteId;
$('case-search').value = params.get('q') || '';
if ([...$('outcome').options].some(option => option.value === params.get('outcome'))) $('outcome').value = params.get('outcome');

function currentSuite() { return run.suites.find(suite => suite.id === suiteId); }
function activeEngines() { return run.engines.filter(engine => currentSuite().engineIds.includes(engine.id)); }
function chosenIndices() { return currentSuite().cases.flatMap((item, index) => category === 'all' || item.category === category ? [index] : []); }
function updateURL() {
  const query = new URLSearchParams();
  if (suiteId !== 'google-comparison') query.set('suite', suiteId);
  if (category !== 'all') query.set('category', category);
  if (metric !== 'top1') query.set('metric', metric);
  if ($('case-search').value) query.set('q', $('case-search').value);
  if ($('outcome').value !== 'all') query.set('outcome', $('outcome').value);
  // Fragments preserve a shareable probe without sending its input to the
  // static server in a request URL on reload.
  const probeParams=new URLSearchParams();
  if($('live-input').value!=='naam')probeParams.set('probe',$('live-input').value);
  if($('live-before').value)probeParams.set('before',$('live-before').value);
  const fragment=probeParams.size?`#${probeParams}`:'';
  history.replaceState(null, '', location.pathname + (query.size ? `?${query}` : '') + fragment);
}
function populateCategories() {
  const counts = new Map();
  for (const item of currentSuite().cases) counts.set(item.category, (counts.get(item.category) || 0) + 1);
  if (category !== 'all' && !counts.has(category)) category = 'all';
  $('category').replaceChildren();
  for (const [value, text] of [['all', `All categories · ${number(currentSuite().cases.length)}`], ...[...counts].map(([value, count]) => [value, `${labels[value] || value} · ${number(count)}`])]) {
    const option = node('option', '', text);
    option.value = value;
    $('category').append(option);
  }
  $('category').value = category;
}

function renderScorecard() {
  const suite = currentSuite();
  const indices = chosenIndices();
  const summaries = activeEngines().map(engine => ({ ...engine, stats: summarize(indices.map(index => suite.outputs[engine.id][index])) }));
  const ours = summaries.find(engine => engine.id === 'writer').stats;
  const previous = (summaries.find(engine => engine.id === 'writer-v2')||summaries.find(engine => engine.id === 'writer-v1')).stats;
  $('suite-description').textContent = suite.description + (category === 'all' ? '' : ` · ${labels[category] || category}`);
  const regression = ['development', 'typing-check', 'fresh-regression', 'confirmation'].includes(suiteId);
  $('dataset-caveat').classList.toggle('development', regression);
  $('dataset-caveat').textContent = ['categories','confirmation','fresh-regression'].includes(suiteId) ? suite.independence : regression ? 'Project-authored regression check · used for development/debugging · references are not independently annotated.' : suiteId === 'google-comparison' ? 'Proportional source-stratified sample · fixed before Google collection · frozen per-word responses' : 'Complete eligible public population · previously observed test split · local engines only';
  $('scope-note').textContent = ['categories','confirmation','fresh-regression','google-comparison','typing-check'].includes(suiteId) ? 'The Google baseline is a captured per-word Input Tools endpoint response, with the same five-candidate limit. Strict reference agreement does not establish parity with the complete contextual or personalized Google Translate experience. Project-authored references have not been independently annotated.' : 'This suite compares the listed local engines; the corpus is not a distribution of everyday typing traffic.';
  $('stat-count').textContent = number(indices.length);
  $('stat-denominator').textContent = category === 'all' ? 'Unique Roman inputs · same for every engine' : `${labels[category] || category} only`;
  $('stat-top1').textContent = percent(ours.top1);
  $('stat-correct').textContent = `${number(ours.top1Count)} of ${number(ours.n)} inputs matched exactly`;
  $('stat-top5').textContent = percent(ours.top5);
  const delta = (ours.top1 - previous.top1) * 100;
  $('stat-change').textContent = `${delta >= 0 ? '+' : ''}${delta.toFixed(2)} pp`;
  const eligible = summaries.filter(engine => metric !== 'p50' || engine.timingClass !== 'network');
  const order = [...eligible].sort((a, b) => metrics[metric].direction * (a.stats[metric] - b.stats[metric]));
  if (metric === 'p50') order.push(...summaries.filter(engine => engine.timingClass === 'network'));
  $('leaderboard-rows').replaceChildren();
  for (const engine of order) {
    const row = node('tr', engine.id === 'writer' ? 'current-engine' : '');
    row.dataset.engine = engine.id;
    const rank = metric === 'p50' && engine.timingClass === 'network' ? null : 1 + eligible.filter(other => metrics[metric].direction * (other.stats[metric] - engine.stats[metric]) < 0).length;
    const rankCell = node('td');
    rankCell.append(node('span', `rank-number${rank === 1 ? ' first' : ''}`, rank === null ? '—' : String(rank)));
    const nameCell = node('td');
    const name = node('div', 'engine-name');
    name.append(document.createTextNode(engine.label), node('span', 'engine-version', engine.id === 'google' ? `captured ${engine.version}` : `v${engine.version}`));
    if (engine.id === 'writer') name.append(node('span', 'engine-tag', 'CAPTURED'));
    nameCell.append(name, node('span', 'engine-kind', `${engine.id==='writer'?'Captured on-device engine':engine.kind} · ${engine.candidates} ${engine.candidates === 1 ? 'output' : 'suggestions'}`));
    const accuracyCell = node('td', 'accuracy-cell');
    accuracyCell.append(node('span', 'accuracy-value', percent(engine.stats.top1)));
    const meter = node('meter');
    meter.min = 0; meter.max = 1; meter.value = engine.stats.top1;
    meter.setAttribute('aria-label', `${engine.label} top-1 accuracy ${percent(engine.stats.top1)}`);
    accuracyCell.append(meter, node('span', 'confidence', `${percent(engine.stats.interval[0])}–${percent(engine.stats.interval[1])} CI`));
    const top5 = node('td', 'metric-main', percent(engine.stats.top5));
    const cer = node('td', 'metric-main', percent(engine.stats.cer));
    const p50 = node('td', 'metric-main', decimal(engine.stats.p50)); p50.append(node('span', 'metric-unit', engine.timingClass === 'network' ? 'ms network' : 'ms local'));
    const p95 = node('td', 'metric-main', decimal(engine.stats.p95)); p95.append(node('span', 'metric-unit', engine.timingClass === 'network' ? 'ms network' : 'ms local'));
    row.append(rankCell, nameCell, accuracyCell, top5, cer, p50, p95);
    $('leaderboard-rows').append(row);
  }
  const leaders = eligible.filter(engine => engine.stats[metric] === order[0].stats[metric]);
  $('ranking-winner').textContent = `#1 by ${metrics[metric].label} · ${leaders.map(engine => `${engine.label} ${engine.version}`).join(' / ')}`;
  for (const button of document.querySelectorAll('[data-metric]')) button.setAttribute('aria-pressed', String(button.dataset.metric === metric));
  const column = { top1: 2, top5: 3, cer: 4, p50: 5 }[metric];
  document.querySelectorAll('.leaderboard th').forEach((heading, index) => {
    heading.removeAttribute('aria-sort');
    if (index === column) heading.setAttribute('aria-sort', metrics[metric].direction === -1 ? 'descending' : 'ascending');
  });
  renderCategoryOverview();
}

function renderCategoryOverview() {
  const suite=currentSuite(),engines=activeEngines();
  const previous=engines.find(e=>e.id==='writer-v2')||engines.find(e=>e.id==='writer-v1');
  const selected=[engines.find(e=>e.id==='writer'),previous,engines.find(e=>e.id==='google')];
  const versions=selected.map(e=>e?.id==='google'?'Google':e?`Writer ${e.version}`:'Google');
  $('category-overview-head').replaceChildren(...['CATEGORY','INPUTS',...versions.map(v=>`${v} · FIRST`),...versions.map(v=>`${v} · WITHIN 5`)].map(text=>node('th','',text)));
  $('category-overview-rows').replaceChildren();
  for(const category of new Set(suite.cases.map(c=>c.category))) {
    const indices=suite.cases.flatMap((c,i)=>c.category===category?[i]:[]);
    const stats=selected.map(e=>e?summarize(indices.map(i=>suite.outputs[e.id][i])):null);
    const values=[labels[category]||category,number(indices.length),...stats.map(s=>s?`${percent(s.top1)} (${s.top1Count})`:'—'),...stats.map(s=>s?`${percent(s.top5)} (${s.top5Count})`:'—')];
    const row=node('tr');values.forEach(text=>row.append(node('td','',text)));$('category-overview-rows').append(row);
  }
}

function renderCases() {
  const suite = currentSuite();
  const query = $('case-search').value.toLowerCase().trim();
  const outcome = $('outcome').value;
  const indices = chosenIndices().filter(index => {
    const item = suite.cases[index];
    if (query && ![item.roman, ...item.references].some(text => text.toLowerCase().includes(query))) return false;
    const output = suite.outputs.writer[index];
    if (outcome === 'misses' && output.top1) return false;
    if (outcome === 'correct' && !output.top1) return false;
    if (outcome === 'disagree' && new Set(activeEngines().map(engine => suite.outputs[engine.id][index].candidates[0] || '')).size === 1) return false;
    return true;
  });
  const pages = Math.max(1, Math.ceil(indices.length / pageSize));
  page = Math.min(page, pages - 1);
  $('case-count').textContent = `${number(indices.length)} ${indices.length === 1 ? 'case' : 'cases'}`;
  $('case-head').replaceChildren(node('th', '', 'ROMAN INPUT'), node('th', '', 'ACCEPTED SPELLING'), ...activeEngines().map(engine => node('th', '', engine.id === 'google' ? 'GOOGLE SNAPSHOT' : `${engine.label.toUpperCase()} ${engine.version}`)));
  const detailsHeading = node('th'); detailsHeading.append(node('span', 'sr-only', 'Details')); $('case-head').append(detailsHeading);
  $('case-rows').replaceChildren();
  for (const index of indices.slice(page * pageSize, (page + 1) * pageSize)) {
    const item = suite.cases[index];
    const row = node('tr');
    const roman = node('td', '', item.roman);
    roman.append(node('small', '', labels[item.category] || item.category));
    const reference = node('td', '', item.references.join(' / ')); reference.lang = 'ne';
    row.append(roman, reference);
    for (const engine of activeEngines()) {
      const result = suite.outputs[engine.id][index];
      const cell = node('td');
      cell.lang = 'ne';
      cell.append(node('span', `case-result ${result.top1 ? 'correct' : 'miss'}`, result.candidates[0] || 'No output'));
      row.append(cell);
    }
    const details = node('td');
    const button = node('button', 'inspect-case', 'Inspect ↗');
    button.setAttribute('aria-label', `Inspect ${item.roman}`);
    button.addEventListener('click', () => showCase(index));
    details.append(button); row.append(details);
    $('case-rows').append(row);
  }
  if (!indices.length) {
    const row = node('tr'), cell = node('td', 'cases-empty', 'No cases match these filters. Try another word or outcome.');
    cell.colSpan = activeEngines().length + 3; row.append(cell); $('case-rows').append(row);
  }
  $('page-description').textContent = indices.length ? `${number(page * pageSize + 1)}–${number(Math.min((page + 1) * pageSize, indices.length))} of ${number(indices.length)} · Page ${page + 1} of ${pages}` : '0 cases';
  $('previous-page').disabled = page === 0;
  $('next-page').disabled = page >= pages - 1;
}

function showCase(index) {
  const suite = currentSuite(), item = suite.cases[index];
  $('case-dialog-title').textContent = item.roman;
  $('case-dialog-body').replaceChildren();
  const references = node('div', 'case-dialog-references', item.references.join(' / ')); references.lang = 'ne';
  $('case-dialog-body').append(node('div', 'case-dialog-source', `Accepted ${item.references.length === 1 ? 'spelling' : 'spellings'} · ${labels[item.category] || item.category} · ${item.id}`), references);
  const tryLive = node('button','button button-secondary','Try current suggestions');
  tryLive.type = 'button';
  tryLive.addEventListener('click',()=>{
    $('live-input').value=item.roman;
    $('live-before').value='';
    $('case-dialog').close();
    renderLiveProbe();updateURL();
    $('live-input').focus();
    $('live-input').scrollIntoView({block:'center'});
  });
  $('case-dialog-body').append(tryLive);
  for (const engine of activeEngines()) {
    const result = suite.outputs[engine.id][index];
    const block = node('section', 'case-dialog-engine');
    block.append(node('h3', '', `${engine.label} ${engine.version}`), node('p', '', `${result.top1 ? 'Exact match at rank 1' : result.top5 ? 'Accepted spelling among five suggestions' : 'No exact match in returned suggestions'} · ${decimal(result.ms)} ms ${engine.timingClass === 'network' ? 'network' : 'in-process'} · MRR ${result.reciprocalRank.toFixed(2)}`));
    const list = node('ol');
    list.lang = 'ne';
    for (const text of result.candidates) list.append(node('li', item.references.includes(text) ? 'accepted' : '', text));
    block.append(list);
    if (result.error) block.append(node('p', '', `Engine error: ${result.error}`));
    $('case-dialog-body').append(block);
  }
  $('case-dialog').showModal();
}

function renderMethods() {
  const publicSuite = run.suites.find(suite => suite.id === 'public-test');
  const population = publicSuite.population;
  $('population-description').textContent = `Public source: ${number(population.rawRows)} records grouped into ${number(population.uniqueInputs)} unique inputs. The Google track takes a proportional 512-input source-stratified sample, selected by SHA-256 ordering before collection. The 148-input typing check is separate and project-authored.`;
  $('training-description').textContent = `Version 2.2 adds curated vocabulary, verb/name forms, and guarded suffix repairs. Learned counts still use ${number(run.segmentTraining.acceptedRows)} TRAIN pairs. Observed examples informed curation and regression gates. The 97 input probes were locked before outputs; their words may be known, so this is not word-disjoint generalization or blind independent annotation.`;
  $('dataset-source').href = run.provenance.url;
  $('source-attribution').textContent = `${run.provenance.attribution} ${run.provenance.license}`;
  $('dataset-hash').textContent = `Test SHA-256: ${publicSuite.sha256}`;
  const paired = run.suites.find(suite => suite.id === 'google-comparison');
  const sampleHash = node('p', 'hash-line', `Google comparison manifest SHA-256: ${paired.sha256}`);
  $('dataset-hash').after(sampleHash);
  for (const engine of run.engines) {
    const paragraph = node('p');
    paragraph.append(node('strong', '', `${engine.label} ${engine.version} · `), document.createTextNode(engine.source), node('br'), node('code', 'hash-line', `Source SHA-256: ${engine.sha256}`));
    if (engine.id === 'nepscript' || engine.id === 'google') {
      const link = node('a', '', ' · Original package ↗'); link.href = engine.source; link.target = '_blank'; link.rel = 'noreferrer'; paragraph.append(link);
    }
    $('engine-sources').append(paragraph);
  }
  for (const [key, label] of [['ranking', 'Ranking'], ['normalization', 'Text matching'], ['references', 'Multiple references'], ['errors', 'Failures'], ['top5', 'Top-5 recall'], ['cer', 'Character error rate'], ['timing', 'Timing'], ['uncertainty', 'Uncertainty'], ['limitations', 'Comparison scope']]) {
    $('protocol-definitions').append(node('dt', '', label), node('dd', '', run.protocol[key]));
  }
  $('machine-description').textContent = `Recorded machine: ${run.machine.cpu}, ${run.machine.logicalCores} logical cores; ${run.machine.platform} ${run.machine.arch}; Node ${run.machine.node}. Measurements are not isolated from other machine activity.`;
}

function render() { renderScorecard(); renderCases(); updateURL(); }
$('dataset').addEventListener('change', () => { suiteId = $('dataset').value; page = 0; populateCategories(); render(); });
$('category').addEventListener('change', () => { category = $('category').value; page = 0; render(); });
document.querySelectorAll('[data-metric]').forEach(button => button.addEventListener('click', () => { metric = button.dataset.metric; renderScorecard(); updateURL(); }));
$('case-search').addEventListener('input', () => { page = 0; renderCases(); updateURL(); });
$('outcome').addEventListener('change', () => { page = 0; renderCases(); updateURL(); });
$('previous-page').addEventListener('click', () => { page--; renderCases(); });
$('next-page').addEventListener('click', () => { page++; renderCases(); });
$('close-case').addEventListener('click', () => $('case-dialog').close());
$('copy-command').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('npm run benchmark'); $('benchmark-toast').textContent = 'Benchmark command copied.'; }
  catch { $('benchmark-toast').textContent = 'Run npm run benchmark from the project folder.'; }
  $('benchmark-toast').hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('benchmark-toast').hidden = true; }, 2500);
});
populateCategories();
renderMethods();
render();
renderLiveProbe();
$('live-input').addEventListener('input',()=>{renderLiveProbe();updateURL();});
$('live-before').addEventListener('input',()=>{renderLiveProbe();updateURL();});
document.querySelectorAll('[data-probe]').forEach(button=>button.addEventListener('click',()=>{
  $('live-input').value=button.dataset.probe;
  $('live-before').value='';
  renderLiveProbe();updateURL();
}));
