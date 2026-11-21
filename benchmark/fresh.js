import run from './fresh-v1/results.js';
import sensitivity from './fresh-v1/sensitivity.js';

const $ = id => document.getElementById(id);
const percent = value => `${(100*value).toFixed(1)}%`;
const score = (s,key) => `${percent(s[key])} (${s[`${key}Count`]}/${s.n})`;
const date = value => new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeZone:'Europe/Stockholm'}).format(new Date(value));
$('capture-date').textContent=date(run.google.completedAt);
for(const [prefix,id] of [['our','writer'],['google','google']]) for(const key of ['top1','top5']) {
  const s=run.summary[id];
  $(`${prefix}-${key}`).textContent=percent(s[key]);
  $(`${prefix}-${key}-count`).textContent=`${s[`${key}Count`]} of ${s.n} intended spellings`;
}
function row(target,values) {
  const tr=document.createElement('tr');
  values.forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td);});
  target.append(tr);
}
for(const [category,s] of Object.entries(run.categories)) row($('category-scores'),[category,s.n,score(s.writer,'top1'),score(s.google,'top1'),score(s.writer,'top5'),score(s.google,'top5')]);
row($('category-scores'),['All inputs',run.summary.n,score(run.summary.writer,'top1'),score(run.summary.google,'top1'),score(run.summary.writer,'top5'),score(run.summary.google,'top5')]);
row($('sensitivity-scores'),['Locked strict match',score(run.summary.writer,'top1'),score(run.summary.google,'top1'),score(run.summary.writer,'top5'),score(run.summary.google,'top5')]);
const folded = sensitivity.summary;
const fscore=(id,key)=>`${percent(folded[id][`${key}Count`]/folded[id].n)} (${folded[id][`${key}Count`]}/${folded[id].n})`;
row($('sensitivity-scores'),['Post-hoc spelling fold',fscore('writer','top1'),fscore('google','top1'),fscore('writer','top5'),fscore('google','top5')]);
$('fresh-intervals').textContent=`Descriptive top-1 95% Wilson intervals: ours ${run.summary.writer.interval.map(percent).join('–')}; Google ${run.summary.google.interval.map(percent).join('–')}. Related inputs may be correlated.`;
$('fresh-cer').textContent=`Strict micro character error: ours ${percent(run.summary.writer.cer)}; Google ${percent(run.summary.google.cer)}. Mean reciprocal rank: ours ${run.summary.writer.mrr.toFixed(3)}; Google ${run.summary.google.mrr.toFixed(3)}.`;
$('fresh-dates').textContent=`Engine v${run.freeze.version} frozen ${run.freeze.frozenAt}; labels locked ${run.lock.lockedAt}; Google captured ${run.google.startedAt} to ${run.google.completedAt}; evaluated ${run.evaluatedAt}.`;

function renderCases() {
  const category=$('fresh-category').value,outcome=$('fresh-outcome').value,query=$('fresh-search').value.toLowerCase().trim();
  const cases=run.cases.filter(c=>(category==='all'||category===c.category)&&(!query||[c.roman,...c.references,...c.writer.candidates,...c.google.candidates].some(s=>s.toLowerCase().includes(query)))&&(outcome==='all'||outcome==='google-only'&&c.google.top1&&!c.writer.top1||outcome==='top5-miss'&&!c.writer.top5||outcome==='rank-miss'&&!c.writer.top1&&c.writer.top5));
  $('fresh-count').textContent=`${cases.length} of ${run.cases.length} inputs shown`;
  const host=$('fresh-cases');host.replaceChildren();
  if(!cases.length){const p=document.createElement('p');p.className='fresh-empty';p.textContent='No cases match these filters.';host.append(p);}
  for(const c of cases) {
    const details=document.createElement('details');details.className='fresh-case';
    const summary=document.createElement('summary');summary.append(document.createTextNode(c.roman));
    const ref=document.createElement('span');ref.className='fresh-ref';ref.lang='ne';ref.textContent=c.references.join(' / ');summary.append(ref);
    const note=document.createElement('small');note.textContent=`${c.category} · ${c.id}`;summary.append(note);details.append(summary);
    const body=document.createElement('div');body.className='fresh-case-body';
    for(const [id,label] of [['writer','Nepali Writer 2.0'],['google','Google Input Tools']]) {
      const section=document.createElement('section'),h=document.createElement('h3'),p=document.createElement('p'),list=document.createElement('ol');
      h.textContent=label;p.className='match-note';p.textContent=c[id].top1?'First suggestion matches':c[id].top5?'Reference present below first':'Reference absent from five';
      list.lang='ne';for(const text of c[id].candidates){const li=document.createElement('li');li.textContent=text;if(c.references.includes(text)){li.className='accepted';li.append(document.createTextNode(' ✓'));}list.append(li);}
      section.append(h,p,list);body.append(section);
    }
    details.append(body);host.append(details);
  }
}
for(const id of ['fresh-category','fresh-outcome']) $(id).addEventListener('change',renderCases);
$('fresh-search').addEventListener('input',renderCases);
renderCases();
