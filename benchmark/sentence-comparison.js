// Adapt the separately scored sentence evidence for the shared comparison view.
// Sentence exact/WER/CER remain distinct from isolated-word choice ranks.
export function sentenceSuite(data){
  const cases=data.cases.map(c=>{
    const references=c.references??(typeof c.native==='string'?[c.native]:null);
    if(!references?.length||typeof c.roman!=='string')throw new Error('Missing frozen sentence target: '+c.id);
    return {...c,references};
  });
  const observations=Object.fromEntries(data.providers.map(p=>{
    const o=data.observations[p.id];
    return [p.id,{...o,available:o.available!==false,outputs:o.outputs.map(text=>text?[text]:[]),errors:o.errors??{}}];
  }));
  return {id:'long-sentences',kind:'sentence',label:data.label??'Long everyday sentences',description:data.description??'Long sentence typing and explicitly isolated-word source composition',independence:data.independence,wordCount:data.wordCount??cases.reduce((n,c)=>n+(c.roman.match(/[A-Za-z]+/g)?.length??0),0),providers:data.providers,cases,categories:[...new Set(cases.map(c=>c.category))],observations};
}
