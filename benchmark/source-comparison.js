// Use fixed paired populations; rank the observed metric without ownership boosts.
import {setWordComparison} from './word-comparison.js';
import {sentenceSuite} from './sentence-comparison.js';

const $=id=>document.getElementById(id);
const compact=document.body.dataset.comparison==='compact';
const [{default:data},{default:sentences}]=await Promise.all([
  import(compact?'./large-comparison-2.4.8-v2.js':'./source-comparison-2.4.8-v2.js'),
  compact?import('./long-sentences-2.4.8-v2.js'):Promise.resolve({default:null})
]).catch(error=>{
  const status=$('benchmark-status');
  if(status){
    document.body.dataset.results='error';
    status.textContent='Benchmark results couldn’t load. Refresh the page to try again.';
  }
  throw error;
});
const suites=sentences?[...data.suites,sentenceSuite(sentences)]:data.suites;
const withinThree=compact?null:(await import('./within-three-2.4.8-v1.js')).default;
const providers=()=>(suite().providers??data.providers).filter(p=>!compact||$('comparison-history').checked||!['previous','writer-2.2'].includes(p.id)).map(p=>p.id==='current'?{...p,label:'Nepalipi'}:p);
const make=(tag,text,className)=>{
  const el=document.createElement(tag);
  if(text!==undefined)el.textContent=text;
  if(className)el.className=className;
  return el;
};
const percent=value=>(value*100).toFixed(2)+'%';
const timestamp=value=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Stockholm',timeZoneName:'short'}).format(new Date(value));
const observedRange=o=>o.observedAt?timestamp(o.observedAt)+(o.observedUntil&&o.observedUntil!==o.observedAt?' – '+timestamp(o.observedUntil):''):'Not captured';
const suite=()=>suites.find(s=>s.id===$('comparison-set').value);
const selectedCases=()=>suite().cases.filter(c=>$('comparison-category').value==='all'||c.category===$('comparison-category').value);
const categoryLabels={
  'AK-Freq':'Frequent words',
  'AK-NEI':'Indian named entities',
  'AK-NEF':'Foreign named entities',
  'Multiple sources':'Entries from multiple sources',
  'Wikidata':'Names from Wikidata',
};
const categoryLabel=category=>categoryLabels[category]??(category.charAt(0).toUpperCase()+category.slice(1));
const title=p=>p.label+' · '+p.version;
function options(id,values){
  const select=$(id),button=select.querySelector(':scope > button');
  select.replaceChildren(...(button?[button]:[]),...values.map(([value,label])=>{
    const o=make('option',label);o.value=value;return o;
  }));
}
function renderWord(){
  if(!$('comparison-word'))return;
  const s=suite(),c=s.cases.find(c=>c.id===$('comparison-word').value),index=s.cases.indexOf(c);
  $('comparison-expected').textContent='Expected spelling: '+c.references.join(' / ')+' · '+c.id;
  $('comparison-expected').lang='ne';
  $('comparison-outcomes').replaceChildren(...providers().map(p=>{
    const o=s.observations[p.id],values=o.outputs[index],row=make('div',undefined,'source-outcome');
    row.dataset.source=p.id;
    const heading=make('div',undefined,'outcome-heading');
    heading.append(make('strong',title(p)));
    if(!o.available){heading.append(make('span','Not captured'));row.append(heading);return row;}
    const rank=values.findIndex(t=>c.references.includes(t))+1;
    heading.append(make('span',rank===1?'First match':rank?'Reference at choice '+rank:'No reference match',rank?'outcome-match':'outcome-miss'));
    row.append(heading);
    const list=make('ol',undefined,'source-candidates');list.lang='ne';
    for(const t of values)list.append(make('li',t,c.references.includes(t)?'reference-match':undefined));
    row.append(list);
    if(o.errors[c.id])row.append(make('p','Recorded error: '+o.errors[c.id]));
    else if(!values.length)row.append(make('p','No candidates returned.'));
    return row;
  }));
}
function renderTable(){
  const s=suite(),category=$('comparison-category').value,metric=$('comparison-metric').value,cases=selectedCases();
  if(compact){document.body.dataset.metric=metric;document.body.dataset.kind=s.kind??'word';}
  const added=withinThree?.suites.find(set=>set.id===s.id);
  const rows=providers().map(p=>{
    const o=s.observations[p.id],three=added?.observations[p.id];
    const score=category==='all'?o.summary:o.categories[category];
    return {p,o,score:score?{...score,...(three?(category==='all'?three.summary:three.categories[category]):{})}:null};
  });
  rows.sort((a,b)=>(!a.score||!b.score)?Number(!a.score)-Number(!b.score):['cer','wer'].includes(metric)?a.score[metric]-b.score[metric]:b.score[metric]-a.score[metric]);
  let last=null,rank=0;
  $('comparison-rows').replaceChildren(...rows.map(({p,o,score},i)=>{
    const tr=make('tr');tr.dataset.source=p.id;
    if(score&&score[metric]!==last){rank=i+1;last=score[metric];}
    tr.append(make('td',score?String(rank):'—','source-rank'));
    const name=make('th');name.scope='row';
    name.append(make('strong',p.label),make('span',compact?(s.kind==='sentence'?(p.mode==='editor'?'Editor typing':'Word composition'):(p.kind==='External cloud snapshot'?'Saved snapshot':p.version)):p.version+' · '+(p.id==='current'?'Latest recorded engine':p.kind)));
    const observed=make('small',o.observedAt?'Observed '+observedRange(o):'No capture for this set');
    if(o.observedAt){const time=make('time',observed.textContent);time.dateTime=o.observedAt;observed.replaceChildren(time);}
    name.append(observed);tr.append(name);
    if(!score){const td=make('td','Not captured','source-unavailable');td.colSpan=s.kind==='sentence'?3:compact&&metric!=='cer'?3:4;tr.append(td);return tr;}
    for(const [key,count] of s.kind==='sentence'?[['exact','exactCount'],['wer',null],['cer',null]]:[['first','firstCount'],['withinThree','withinThreeCount'],['withinFive','withinFiveCount'],['cer',null]]){
      const td=make('td');td.dataset.metric=key;
      td.append(make('strong',percent(score[key])));
      td.append(make('small',count?score[count]+'/'+score.n+(s.kind==='sentence'?' sentences':' words'):key==='wer'?'Word edits / reference words':s.kind==='sentence'?'Character edits / reference characters':'First-output edits / characters'));
      if(key===metric)td.className='ranked-metric';
      tr.append(td);
    }
    if(score.errors)name.append(make('small',score.errors+' recorded errors'));
    return tr;
  }));
  const available=rows.filter(r=>r.score).length;
  const missing=rows.filter(r=>!r.score).map(r=>r.p.label);
  const missingNote=missing.length?missing.join(' / ')+' not captured for this test set.':'';
  $('comparison-caption').textContent=compact?cases.length+(s.kind==='sentence'?' sentences · ':' words · ')+(category==='all'?'same inputs and references':categoryLabel(category)):s.label+' · '+(category==='all'?'All categories':category)+' · '+cases.length+' shared inputs';
  $('comparison-scope').textContent=s.description+' · '+(category==='all'?'all categories':category)+'.';
  $('comparison-summary').textContent=compact?missingNote:cases.length+' identical inputs · '+available+' available sources · equal scores share ranks. '+missingNote;
  if($('source-dates'))$('source-dates').replaceChildren(...providers().map(p=>{
    const item=make('li'),link=make(p.source?'a':'span',title(p));
    if(p.source){link.href=p.source;link.target='_blank';link.rel='noopener noreferrer';}
    item.append(link,document.createTextNode(' · '+(observedRange(s.observations[p.id]))+' · '+(s.kind==='sentence'?'first-choice sentence output':p.candidates+' maximum '+(p.candidates===1?'output':'choices'))));
    if(p.configuration)item.append(make('p',p.configuration));
    const captures=s.observations[p.id].captureCounts;
    if(captures)item.append(make('p',captures.new+' new requests · '+captures.reused+' reused exact-input captures with original dates.'));
    return item;
  }));
  $('comparison-independence').textContent=s.independence;
  if($('comparison-word')){
    const selectedWord=$('comparison-word').value;
    options('comparison-word',cases.map(c=>[c.id,c.roman+' → '+c.references.join(' / ')]));
    if(cases.some(c=>c.id===selectedWord))$('comparison-word').value=selectedWord;
    renderWord();
  }
  if(compact)renderContext(s);
  setWordComparison(s,rows.map(({p})=>p),cases);
}
function renderContext(s){
  const sentence=s.kind==='sentence',headers=document.querySelectorAll('.source-table thead th');
  $('public-word-sources').hidden=s.id!=='public-full';
  const metric=$('comparison-metric').value;
  $('score-direction').textContent=['cer','wer'].includes(metric)?'Lower error rates are better':'Higher match rates are better';
  const keys=sentence?['exact','wer','cer']:['first','withinThree','withinFive','cer'];
  headers.forEach((header,i)=>{
    header.removeAttribute('aria-sort');
    if(i>=2&&keys[i-2]===metric)header.setAttribute('aria-sort',['cer','wer'].includes(metric)?'ascending':'descending');
  });
  for(const [i,text] of (sentence?['Exact sentence','Word error ↓','Character error ↓']:['First match','Within three','Within five']).entries())headers[i+2].textContent=text;
  headers[5].hidden=sentence;
  $('words').textContent=sentence?'Sentence by sentence':'Word by word';
  $('word-search-label').textContent=sentence?'Find a sentence':'Find a word';
  $('word-empty').textContent=sentence?'No sentences match this search.':'No words match this search.';
  $('word-note').textContent=sentence?'Recorded full outputs. ✓ matches a target sentence. Columns follow the score ranking. Scroll → for more tools. Search filters rows; scores stay unchanged.':'Recorded first suggestions. ✓ matches an expected spelling. Expand a cell for alternatives. Columns follow the score ranking. Scroll → for more tools. Search filters these rows; scores stay unchanged.';
  $('source-note').textContent=sentence?'Nepalipi is measured by typing in the editor. Other tools combine isolated-word first choices; sentence context is not tested for them.':'All tools cover every word. Google & Quillpad use saved per-word responses; dates and capture counts are below.';
  $('metric-explanation').textContent=sentence?'Exact sentence: the complete output equals a frozen target. Higher is better. Word error: word edits divided by reference words. Character error: character edits divided by reference characters. Lower errors are better; insertion errors can exceed 100%.':'First match: the first suggestion equals an expected spelling. Within three: an expected spelling appears in the first three suggestions. Within five: an expected spelling appears in the first five suggestions. Higher is better. Counts show matches / tested words.';
  $('comparison-method').textContent=sentence?'Every source uses the same fixed Roman sentences. Nepalipi is captured through the actual editor with preferences off. Other sources compose their first isolated-word outputs using the recorded boundary protocol. No top-three/top-five sentence ranking is claimed. Errors remain in the denominator.':'Every engine receives the same Roman input, with personal preferences off; outputs are scored against frozen corpus references. nepscript, Lekhika and Nepali Unicoder return one spelling each. Errors remain in the denominator. First/within-three/within-five use original unique candidate order. Character error uses the first output.';
  $('population-note').textContent=sentence?s.cases.length+' authored long scenarios · '+s.wordCount.toLocaleString('en-GB')+' Roman word tokens. These are diagnostics, not independently annotated traffic or a Google Translate interface comparison.':'Each word set has at least 2,000 unique inputs. The four views overlap; source splits and any added public-validation names are identified in the protocol. Scores must not be pooled. Smaller authored checks remain in the detailed diagnostics.';
  const stem=sentence?'long-sentences-2.4.8-v2':'large-comparison-2.4.8-v2';
  $('results-json').href='/benchmark/'+stem+'.json';$('scores-csv').href='/benchmark/'+stem+'.csv';
  document.querySelector('.source-table').setAttribute('aria-label',sentence?'Long sentence comparison':'Word suggestion comparison');
  $('word-grid-scroll').setAttribute('aria-label',sentence?'Sentence comparison, scroll horizontally for more tools':'Word comparison, scroll horizontally for more tools');
}
function selectSet(){
  if(compact){
    const previous=$('comparison-metric').value;
    const metrics=suite().kind==='sentence'?[['exact','Exact sentence'],['wer','Word error'],['cer','Character error']]:[['first','First match'],['withinThree','Within three'],['withinFive','Within five'],['cer','Character error']];
    options('comparison-metric',metrics);
    if(metrics.some(([key])=>key===previous))$('comparison-metric').value=previous;
  }
  options('comparison-category',[['all',compact?'Full test set':'All categories'],...suite().categories.map(c=>[c,compact?categoryLabel(c):c])]);
  renderTable();
}
options('comparison-set',suites.map(s=>[s.id,s.label+' · '+s.cases.length+(s.kind==='sentence'?' sentences':' words')]));
if(compact){
  const requested=new URLSearchParams(location.search).get('suite');
  if(suites.some(s=>s.id===requested))$('comparison-set').value=requested;
  $('comparison-history').addEventListener('change',renderTable);
}
$('comparison-set').addEventListener('change',selectSet);
for(const id of ['comparison-category','comparison-metric'])$(id).addEventListener('change',renderTable);
$('comparison-word')?.addEventListener('change',renderWord);
selectSet();
if(compact){
  document.body.dataset.results='ready';
  document.querySelector('.comparison-toolbar').inert=false;
  $('benchmark-status').hidden=true;
}
