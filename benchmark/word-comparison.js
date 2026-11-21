// Display the existing recorded candidates; no engine calls or new measurements.
const $=id=>document.getElementById(id);
const make=(tag,text,className)=>{
  const el=document.createElement(tag);
  if(text!==undefined)el.textContent=text;
  if(className)el.className=className;
  return el;
};
const sentencePageSize=10;
let source,tools=[],rows=[],page=0,scope='',caseScope='';

function outputCell(c,index,tool){
  const cell=make('td');cell.dataset.source=tool.id;
  const observation=source.observations[tool.id];
  if(!observation.available){cell.append(make('span','Not captured','word-unavailable'));return cell;}
  const values=observation.outputs[index],error=observation.errors[c.id];
  if(!values.length){cell.append(make('span',error?'Recorded error':'No output','word-unavailable'));}
  else{
    const first=make('span',values[0],'word-output');first.lang='ne';cell.append(first);
    const rank=values.findIndex(v=>c.references.includes(v))+1;
    cell.dataset.match=rank===1?'first':rank?'alternative':'none';
    if(rank===1){const check=make('span','✓','word-match');check.setAttribute('aria-label','First suggestion matches an expected spelling');cell.append(check);}
    if(values.length>1){
      const details=make('details',undefined,'word-alternatives');
      details.append(make('summary',(values.length-1)+' more'+(rank>1?' · expected #'+rank:'')));
      const list=make('ol');list.start=2;list.lang='ne';
      for(const value of values.slice(1))list.append(make('li',value,c.references.includes(value)?'reference-match':undefined));
      details.append(list);cell.append(details);
    }
  }
  if(error){const details=make('details',undefined,'word-error');details.append(make('summary','Error details'),make('p',error));cell.append(details);}
  return cell;
}
function render(){
  if(!source)return;
  const query=$('word-search').value.trim().normalize('NFC').toLowerCase();
  const filtered=query?rows.filter(row=>row.search.includes(query)):rows;
  const paginated=source.kind==='sentence';
  const pages=paginated?Math.max(1,Math.ceil(filtered.length/sentencePageSize)):1;
  page=Math.min(page,pages-1);
  const start=paginated?page*sentencePageSize:0;
  const visible=paginated?filtered.slice(start,start+sentencePageSize):filtered;
  $('word-grid-body').replaceChildren(...visible.map(({c,index})=>{
    const tr=make('tr');tr.dataset.caseId=c.id;
    const word=make('th',undefined,'word-input');word.scope='row';
    const roman=make('strong',c.roman,'word-roman');roman.lang='en';
    const expected=make('span',c.references.join(' / '),'word-reference');expected.lang='ne';
    word.append(roman,expected,make('small',c.id,'word-case-id'));
    tr.append(word,...tools.map(tool=>outputCell(c,index,tool)));return tr;
  }));
  $('word-count').textContent=paginated
    ? filtered.length?(start+1)+'–'+(start+visible.length)+' of '+filtered.length+' sentences'+(query?' · '+rows.length+' in selected category':''):'0 of '+rows.length+' sentences'
    : (query?filtered.length+' of '+rows.length:filtered.length)+' words';
  $('word-empty').hidden=Boolean(filtered.length);
  $('word-pagination').hidden=!paginated;
  $('word-page').textContent='Page '+(page+1)+' of '+pages;
  $('word-previous').disabled=page===0;$('word-next').disabled=page===pages-1;
}
export function setWordComparison(suite,providers,cases){
  if(!$('words-panel'))return;
  const caseKey=suite.id+'|'+cases.map(c=>c.id).join(',');
  const key=caseKey+'|'+providers.map(p=>p.id).join(',');
  if(key===scope)return;
  const firstLoad=!source;
  if(caseKey!==caseScope)page=0;
  caseScope=caseKey;scope=key;source=suite;tools=providers;
  const indices=new Map(suite.cases.map((c,i)=>[c.id,i]));
  rows=cases.map(c=>{
    const index=indices.get(c.id);
    const search=JSON.stringify([c.id,c.roman,c.references,...tools.map(p=>suite.observations[p.id].outputs[index]||[])]).normalize('NFC').toLowerCase();
    return {c,index,search};
  });
  const header=make('tr');header.append(make('th',suite.kind==='sentence'?'Expected sentence':'Expected spelling'));
  for(const tool of tools){const th=make('th');th.dataset.source=tool.id;th.append(make('strong',tool.label),make('small',tool.version));header.append(th);}
  for(const th of header.children)th.scope='col';
  $('word-grid-head').replaceChildren(header);render();
  if(firstLoad&&location.hash==='#words')requestAnimationFrame(()=>$('words').scrollIntoView({block:'start'}));
}
if($('words-panel')){
  $('word-search').addEventListener('input',()=>{page=0;render();});
  for(const [id,step] of [['word-previous',-1],['word-next',1]])$(id).addEventListener('click',()=>{
    page+=step;render();$('words').scrollIntoView({block:'start'});
  });
}
