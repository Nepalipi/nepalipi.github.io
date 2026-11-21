import original from './extended-v1.js';
import updated from './extended-2.4.5.js';
import previousEditor from './editor-2.4.7-v1.js';
import latest from './editor-2.4.8-v1.js';
let data=latest;
const $=id=>document.getElementById(id);
const make=(tag,text,className)=>{
  const el=document.createElement(tag);
  if(text!==undefined)el.textContent=text;
  if(className)el.className=className;
  return el;
};
let tracks=data.tracks;
const params=new URLSearchParams(location.search);
const snapshots={
  '2.4.4':{data:original,stem:'extended-v1',verify:'benchmark:extended:verify'},
  '2.4.5':{data:updated,stem:'extended-2.4.5',verify:'audit:expanded-fixes:verify'},
  '2.4.7':{data:previousEditor,stem:'editor-2.4.7-v1',verify:'audit:editor:verify'},
  '2.4.8':{data:latest,stem:'editor-2.4.8-v1',verify:'audit:editor:verify'}
};
if(Object.hasOwn(snapshots,params.get('snapshot')))$('result-snapshot').value=params.get('snapshot');
let active=['sentences','choices','workflows'].includes(params.get('track'))?params.get('track'):'sentences';
function presentSnapshot(){
  const snapshot=snapshots[$('result-snapshot').value];
  data=snapshot.data;
  tracks=data.tracks;
  const stem=snapshot.stem;
  $('extended-verify-command').textContent='npm run '+snapshot.verify;
  $('scope-caption').textContent='Project-authored reference checks · engine '+data.engineVersion+' · same 108 cases.';
  for(const link of document.querySelectorAll('[data-artifact]'))link.href='/benchmark/'+stem+link.dataset.artifact;
  $('capture-stamp').textContent='RECORDED ENGINE '+data.engineVersion+'\n'+new Date(data.capturedAt).toLocaleDateString('en-GB',{timeZone:'UTC'})+' · captured UTC';
  $('sentence-score').textContent=tracks.sentences.summary.matched+'/'+tracks.sentences.summary.n;
  $('sentence-detail').textContent=(tracks.sentences.summary.n-tracks.sentences.summary.matched)+' reference mismatches';
  $('choice-score').textContent=tracks.choices.summary.matched+'/'+tracks.choices.summary.n;
  $('choice-detail').textContent=tracks.choices.summary.withinFive+'/'+tracks.choices.summary.n+' within five';
  $('detailed-metrics').textContent='Sentence codepoint edit rate: '+(tracks.sentences.summary.codepointCER*100).toFixed(2)+'% (spaces included). Word-choice reciprocal rank: '+tracks.choices.summary.mrr.toFixed(3)+'.';
  $('workflow-score').textContent=tracks.workflows.summary.matched+'/'+tracks.workflows.summary.n;
  selectTrack(active);
}

function trace(title,rows){
  const detail=make('details');detail.append(make('summary',title));
  for(const [left,right] of rows){
    const line=make('div',undefined,'trace-row');
    line.append(make('span',left),make('span',right));detail.append(line);
  }
  return detail;
}
function card(row){
  const c=row.case,o=row.observed,s=row.score,detail=make('details',undefined,'result-case');
  const summary=make('summary'),heading=make('span',undefined,'case-heading');
  heading.append(make('span',c.roman||c.label,'case-label'));
  const actual=active==='choices'?(o.candidates?.[0]||'No suggestions'):(o.actual||'No output');
  const preview=make('span',actual,'case-preview');preview.lang='ne';heading.append(preview);
  summary.append(heading,make('span',s.matched?'Matched':'Mismatch','case-outcome'+(s.matched?'':' miss')));
  detail.append(summary);
  const body=make('div',undefined,'case-body');
  body.append(make('p',c.id+' · '+c.category));
  if(c.before)body.append(make('p','Preceding text: '+c.before));
  const compare=make('div',undefined,'comparison');
  for(const [label,text] of [['Recorded reference',c.references.join('\nOR\n')],[active==='choices'?'First suggestion':'Actual output',active==='choices'?(o.candidates?.[0]||'No suggestions'):(o.actual??'')]]){
    const cell=make('div');cell.append(make('span',label),make('pre',text));compare.append(cell);
  }
  body.append(compare);
  const note=data.reviewNotes?.find(n=>n.ids.includes(c.id));
  if(note)body.append(make('p','Reference review: '+note.note,'review-note'));
  if(o.error)body.append(make('p','Recorded error: '+o.error));
  if(active==='choices'){
    body.append(make('h4','Full-word choices · reference rank '+(s.rank||'not in five')));
    const list=make('ol');for(const v of o.candidates||[])list.append(make('li',v));body.append(list);
    body.append(trace('Inspect every typing prefix',o.prefixes.map(p=>[p.prefix,p.candidates.join(' · ')])));
  }else if(active==='sentences'){
    body.append(trace('Inspect word-boundary suggestion lists',(o.words||[]).map(w=>[w.roman,w.candidates.join(' · ')])));
  }else{
    body.append(make('p','Final reference: '+(s.finalMatches?'matched':'mismatched')+' · Intermediate checkpoints: '+(s.checkpointsMatch?'matched':'mismatched')));
    body.append(trace('Inspect every editor action',(o.events||[]).map((e,i)=>[(i+1)+'. '+e.action+(e.missingChoice?' — missing choice':''),e.actual])));
  }
  detail.append(body);return detail;
}
function categories(){
  $('extended-category-head').replaceChildren();
  const head=make('tr');
  for(const label of active==='choices'?['CATEGORY','CASES','FIRST','WITHIN FIVE']:['CATEGORY','CASES','MATCHED'])head.append(make('th',label));
  $('extended-category-head').append(head);$('extended-category-rows').replaceChildren();
  for(const [category,s] of Object.entries(tracks[active].categories)){
    const tr=make('tr');tr.append(make('td',category),make('td',String(s.n)));
    const matched=make('td',s.matched+'/'+s.n);
    const bar=make('progress');bar.max=s.n;bar.value=s.matched;bar.setAttribute('aria-label',category+': '+s.matched+' of '+s.n+' matched');
    matched.append(bar);tr.append(matched);
    if(active==='choices')tr.append(make('td',s.withinFive+'/'+s.n));
    $('extended-category-rows').append(tr);
  }
}
function render(){
  const search=$('extended-search').value.trim().toLowerCase(),category=$('extended-category').value,status=$('extended-status').value;
  const rows=tracks[active].rows.filter(r=>(!category||r.case.category===category)&&(!status||r.score.matched===(status==='match'))&&(!search||JSON.stringify([r.case,r.observed.actual]).toLowerCase().includes(search)));
  $('extended-cases').replaceChildren(...rows.map(card));
  if(!rows.length)$('extended-cases').append(make('p','No cases match these filters.','empty-results'));
  $('extended-count').textContent='Showing '+rows.length+' of '+tracks[active].summary.n+' '+(active==='choices'?'word probes':active==='workflows'?'editor workflows':'sentences')+'.';
}
function selectTrack(name){
  active=name;
  for(const button of document.querySelectorAll('[data-track]'))button.setAttribute('aria-pressed',String(button.dataset.track===active));
  $('extended-category').replaceChildren(new Option('All categories',''),...Object.keys(tracks[active].categories).map(c=>new Option(c,c)));
  $('track-policy').textContent=data.policies[{sentences:'sentencePolicy',choices:'choicePolicy',workflows:'workflowPolicy'}[active]];
  categories();render();
}
for(const button of document.querySelectorAll('[data-track]'))button.addEventListener('click',()=>selectTrack(button.dataset.track));
document.querySelector('.scope-note a').addEventListener('click',()=>{$('method').open=true;});
for(const id of ['extended-search','extended-category','extended-status'])$(id).addEventListener(id==='extended-search'?'input':'change',render);
$('result-snapshot').addEventListener('change',presentSnapshot);
presentSnapshot();
