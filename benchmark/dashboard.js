import './source-comparison.js';
import data from './dashboard-results.js';
import {suggest,ENGINE_VERSION} from '../engine/engine.js';

const $=id=>document.getElementById(id);
const make=(tag,text,className)=>{
  const el=document.createElement(tag);
  if(text!==undefined)el.textContent=text;
  if(className)el.className=className;
  return el;
};
const initial=new URLSearchParams(location.hash.slice(1));
let active=data.sets.some(s=>s.id===initial.get('set'))?initial.get('set'):'development';
const group=()=>data.sets.find(s=>s.id===active);
const date=value=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Europe/Stockholm',timeZoneName:'short'}).format(new Date(value));
const wordChecks=data.sets.filter(s=>s.id!=='editor').flatMap(s=>s.cases.filter(c=>c.kind==='choices'));
const kindLabels={choices:'Word',sentences:'Sentence',workflows:'Editor action'};
const improved=c=>!c.before.score.matched&&c.after.score.matched;
$('loaded-version').textContent=ENGINE_VERSION;
$('recorded-version').textContent=data.engineVersion;
$('compare-label').textContent=data.previousVersion+' → '+data.engineVersion;
$('probe-input').value=initial.get('probe')??'pathauchhu';
$('probe-before').value=initial.get('before')??'';
if($('probe-before').value)document.querySelector('.probe-context').open=true;
for(const [key,id] of [['usage','download-usage'],['notes','download-notes'],['editor','download-editor'],['words','download-words']])$(id).href=data.downloads[key];
const historical=new URLSearchParams(location.search);
if(historical.has('suite')){
  $('old-link-note').hidden=false;
  $('old-link').href='/benchmark-history.html?'+historical;
}

function updateFragment(){
  const params=new URLSearchParams();
  if($('probe-input').value!=='pathauchhu')params.set('probe',$('probe-input').value);
  if($('probe-before').value)params.set('before',$('probe-before').value);
  if(active!=='development')params.set('set',active);
  history.replaceState(null,'',location.pathname+(params.size?'#'+params:''));
}
function metric(scoreId,changeId,after,before,key='matched'){
  $(scoreId).textContent=after[key]+'/'+after.n;
  const percentage=after[key]/after.n*100,prior=before[key]/before.n*100,difference=percentage-prior;
  $(scoreId+'-percentage').textContent=percentage.toFixed(2)+'%';
  $(changeId).textContent=difference?(difference>0?'+':'')+difference.toFixed(2)+' pp · was '+prior.toFixed(2)+'%':'Same as '+data.previousVersion;
  $(changeId).title='pp = percentage points; prior count '+before[key]+'/'+before.n;
  $(scoreId).parentElement.dataset.improved=String(difference>0);
}
function selectSet(id){
  active=id;
  const set=group();
  for(const button of document.querySelectorAll('[data-set]'))button.setAttribute('aria-pressed',String(button.dataset.set===id));
  $('set-description').textContent=set.description;
  $('recorded-at').textContent=date(set.capturedAt);
  $('recorded-at').dateTime=set.capturedAt;
  metric('word-score','word-change',set.after.choices,set.before.choices);
  const topThree=stage=>({n:set[stage].choices.n,withinThree:set.cases.filter(c=>c.kind==='choices'&&c[stage].score.rank>0&&c[stage].score.rank<=3).length});
  metric('three-score','three-change',topThree('after'),topThree('before'),'withinThree');
  metric('sentence-score','sentence-change',set.after.sentences,set.before.sentences);
  metric('available-score','available-change',set.after.choices,set.before.choices,'withinFive');
  $('workflow-summary').hidden=!set.after.workflows.n;
  $('workflow-score').textContent=set.after.workflows.matched+'/'+set.after.workflows.n;
  $('workflow-percentage').textContent=set.after.workflows.n?(set.after.workflows.matched/set.after.workflows.n*100).toFixed(2)+'%':'';
  $('case-search').value='';$('kind-filter').value='all';$('result-filter').value='changes';
  renderCases();updateFragment();
}
for(const set of data.sets){
  const button=make('button',set.label);button.type='button';button.dataset.set=set.id;
  button.setAttribute('aria-label',set.label+' ('+set.cases.length+')');
  button.append(make('span',String(set.cases.length)));
  button.addEventListener('click',()=>selectSet(set.id));$('set-buttons').append(button);
}

function caseCard(c){
  const details=make('details',undefined,'check-case');details.dataset.caseId=c.id;
  const summary=make('summary'),main=make('span',undefined,'case-main');
  main.append(make('span',kindLabels[c.kind]+' / '+c.category,'case-meta'),make('span',c.input,'case-input'));
  const preview=make('span',undefined,'case-preview');preview.lang='ne';
  if(c.kind==='choices'&&improved(c)&&c.before.text!==c.after.text){
    preview.append(make('span',c.before.text,'prior'),make('span','→','preview-arrow'));
  }
  preview.append(document.createTextNode(c.after.text||'No output'));main.append(preview);
  const status=improved(c)?'Improved':c.after.score.matched?'Matched':'Needs attention';
  summary.append(main,make('span',status,'status-badge '+(improved(c)?'improved':c.after.score.matched?'matched':'attention')));
  details.append(summary);
  const body=make('div',undefined,'case-body');
  body.append(make('p',c.id));
  if(c.context)body.append(make('p','Preceding text: '+c.context,'case-context'));
  const comparison=make('div',undefined,'compare-grid');
  for(const [label,value,className] of [['Expected spelling',c.references.join('\nOR\n'),'expected-value'],['Before · '+data.previousVersion,c.before.text,'before-value'],['Now · '+data.engineVersion,c.after.text,'after-value']]){
    const cell=make('div',undefined,'compare-cell'),native=make('pre',value,className);native.lang='ne';
    cell.append(make('span',label),native);comparison.append(cell);
  }
  body.append(comparison);
  if(c.review)body.append(make('p',c.review,'review-note'));
  if(c.previouslyObserved)body.append(make('p','Previously observed: this word also occurs in an older regression set.'));
  if(c.kind==='choices'){
    body.append(make('h4','Recorded suggestions · '+(c.after.score.rank?'expected spelling at choice '+c.after.score.rank:'expected spelling not in the first five')));
    const list=make('ol',undefined,'case-alternatives');list.lang='ne';
    for(const text of c.after.candidates)list.append(make('li',text));body.append(list);
    const button=make('button','Try this word','try-case');button.type='button';
    button.addEventListener('click',()=>{
      $('probe-input').value=c.input;$('probe-before').value=c.context;
      document.querySelector('.probe-context').open=Boolean(c.context);
      renderProbe();updateFragment();$('try-word').scrollIntoView({block:'center'});$('probe-input').focus({preventScroll:true});
    });body.append(button);
  }
  details.append(body);return details;
}
function renderCases(){
  const set=group(),search=$('case-search').value.trim().toLowerCase(),kind=$('kind-filter').value,result=$('result-filter').value;
  const rows=set.cases.filter(c=>(kind==='all'||c.kind===kind)&&
    (result==='all'||result==='changes'&&(improved(c)||!c.after.score.matched)||result==='improved'&&improved(c)||result==='attention'&&!c.after.score.matched||result==='matched'&&c.after.score.matched)&&
    (!search||JSON.stringify([c.id,c.input,c.context,c.references,c.after.text]).toLowerCase().includes(search)));
  $('case-list').replaceChildren(...rows.map(caseCard));$('empty-results').hidden=Boolean(rows.length);
  $('case-count').textContent='Showing '+rows.length+' of '+set.cases.length+' checks';
}
for(const id of ['case-search','result-filter','kind-filter'])$(id).addEventListener(id==='case-search'?'input':'change',renderCases);
for(const card of document.querySelectorAll('.score-card'))card.addEventListener('click',()=>{
  $('kind-filter').value=card.dataset.kind;$('result-filter').value='all';$('case-search').value='';renderCases();
  $('cases-title').scrollIntoView({block:'start'});
});
$('workflow-summary').addEventListener('click',()=>{
  $('kind-filter').value='workflows';$('result-filter').value='all';$('case-search').value='';renderCases();$('cases-title').scrollIntoView({block:'start'});
});

function renderProbe(){
  const word=$('probe-input').value,prefix=$('probe-before').value;
  const before=prefix&&!/\s$/.test(prefix)?prefix+' ':prefix;
  const valid=/^[a-zA-Z]{1,64}$/.test(word),values=valid?suggest(word,{before}):[];
  $('probe-results').replaceChildren(...values.map(value=>make('li',value)));
  const recorded=wordChecks.find(c=>c.input===word&&c.context===before);
  $('probe-note').textContent=!valid?'Enter one word using Latin letters (up to 64).':!recorded?'Live suggestions · no saved usage case for this exact input and context.':
    JSON.stringify(values)===JSON.stringify(recorded.after.candidates)?'Live suggestions match the recorded word list.':'This word list has changed since the recorded run.';
}
for(const id of ['probe-input','probe-before'])$(id).addEventListener('input',()=>{renderProbe();updateFragment();});
for(const button of document.querySelectorAll('[data-probe]'))button.addEventListener('click',()=>{
  $('probe-input').value=button.dataset.probe;$('probe-before').value='';renderProbe();updateFragment();$('probe-input').focus();
});

async function checkLoadedEngine(){
  if(checkLoadedEngine.running)return;
  checkLoadedEngine.running=true;$('check-engine').disabled=true;$('freshness').dataset.state='checking';
  try{
    if(ENGINE_VERSION!==data.engineVersion){
      $('freshness-result').textContent='Engine versions differ — recorded scores need a new run.';
      $('freshness-detail').textContent='Loaded '+ENGINE_VERSION+'; recorded '+data.engineVersion+'. The scores below belong to the recorded version.';
      $('freshness').dataset.state='stale';return;
    }
    let changed=0;
    for(const [index,c] of wordChecks.entries()){
      if(JSON.stringify(suggest(c.input,{before:c.context}))!==JSON.stringify(c.after.candidates))changed++;
      if(index%4===3){
        $('freshness-result').textContent='Checking '+(index+1)+'/'+wordChecks.length+' word lists…';
        await new Promise(resolve=>requestAnimationFrame(resolve));
      }
    }
    $('freshness').dataset.state=changed?'stale':'matched';
    $('freshness-result').textContent=changed?changed+' word list'+(changed===1?'':'s')+' changed — recorded scores need a new run.':wordChecks.length+' saved word lists match the loaded engine.';
    $('freshness-detail').textContent='Live word check completed '+date(new Date())+'. Sentence and editor scores are from the recorded browser run.';
  }catch{
    $('freshness').dataset.state='stale';$('freshness-result').textContent='Live check could not finish. Recorded results are still shown.';
  }finally{checkLoadedEngine.running=false;$('check-engine').disabled=false;}
}
$('check-engine').addEventListener('click',checkLoadedEngine);
$('reload-files').addEventListener('click',event=>{event.preventDefault();location.reload();});
selectSet(active);renderProbe();
setTimeout(checkLoadedEngine,0);
