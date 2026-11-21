// A deliberately bounded grammar over authored verb stems. It generates
// spellings, not sentence-level grammatical judgments. Irregular vowel stems
// have explicit present/perfect/derivative bases instead of guessed endings.
import { decodeSegments } from './transducer.js';
import { decodeRoman } from './rules.js';
import { nativeCandidates } from './native-lexicon.js';
import config from './decoder-config.js';

const regular = `गर्|gar
बस्|bas
बोल्|bol
लेख्|lekh
पढ्|padh
हाँस्|has,haas,hans
हेर्|her
खेल्|khel
पर्ख्|parkh
सोध्|sodh
चल्|chal
राख्|rakh
खोज्|khoj
बुझ्|bujh
सक्|sak
भेट्|bhet
पुग्|pug
पर्|par
देख्|dekh
उठ्|uth
सिक्|sik
सुन्|sun
नाच्|nach,naach
रोज्|roj
रोक्|rok
थप्|thap
छान्|chhan,chhaan
टाल्|tal,taal
काट्|kat,kaat
समात्|samat,samaat
निचोर्|nichor
बोक्|bok
बिर्स्|birs
सिलाउ|silau
फर्काउ|pharkau,farkau
सम्झाउ|samjhau
बोलाउ|bolau
सिकाउ|sikau
पठाउ|pathau,pathaau
बनाउ|banau,banaau
समाउ|samau,samaau
सताउ|satau,sataau
हल्लाउ|hallau,hallaau
ल्याउ|lyau,lyaau
पकाउ|pakau,pakaau
बताउ|batau,bataau`;
const records=regular.split('\n').map(line=>{
  const [base,aliases]=line.split('|');
  const causative=base.endsWith('ाउ');
  return {base,aliases:aliases.split(','),...(causative?{present:base+'ँ',negative:base+'ँ',perfect:base.slice(0,-1),derivative:base.slice(0,-1)}:{})};
});
records.push(
  {base:'खा',aliases:['kha','khaa'],present:'खान्',negative:'खाँ',volitional:'खाऔँ'},
  {base:'धो',aliases:['dho'],present:'धुन्',negative:'धुँ',presentAliases:['dhu','dhun']},
  {base:'जा',aliases:['ja','jaa'],present:'जान्',negative:'जाँ',perfect:'ग',derivative:'ग',perfectAliases:['ga','gay'],pastAliases:['ga']},
  {base:'आउ',aliases:['au','aau'],present:'आउँ',negative:'आउँ',perfect:'आ',derivative:'आ',perfectAliases:['a','aa','ay','aay'],pastAliases:['a','aa']},
  {base:'पिउ',aliases:['piu'],present:'पिउँ',negative:'पिउँ',perfect:'पि',derivative:'पि',perfectAliases:['pi','piy'],pastAliases:['pi']},
  {base:'लि',aliases:['li'],present:'लिन्',negative:'लिँ'},
  {base:'दि',aliases:['di'],present:'दिन्',negative:'दिँ'},
  {base:'हु',aliases:['hu'],present:'हुन्',negative:'हुँ',perfect:'भ',derivative:null,perfectAliases:['bha','bhay'],pastAliases:['bha']},
  {base:'पाउ',aliases:['pau','paau'],present:'पाउँ',negative:'पाउँ',perfect:'पा',derivative:'पा',perfectAliases:['pa','paa','pay','paay'],pastAliases:['pa','paa']},
  {base:'गाउ',aliases:['gau','gaau'],present:'गाउँ',negative:'गाउँ',perfect:'गा',derivative:'गा'}
);
// Native vowel attachment differs for consonant-final and vowel-final stems.
const vowel=(base,independent,sign,rest)=>base.endsWith('्')?base.slice(0,-1)+sign+rest:base+independent+rest;
const cache=new Map();
function verbs(normalize) {
  if(cache.has(normalize))return cache.get(normalize);
  const index=new Map();
  const exact=new Map();
  const invitations=new Map();
  const invite=(roman,text)=>{if(text)invitations.set(roman,text);};
  const add=(roman,text,preferred=false)=>{
    const key=normalize(roman), list=index.get(key)||[];
    if(!list.includes(text))list.push(text);index.set(key,list);
    const direct=exact.get(roman)||[];
    if(preferred) { const i=direct.indexOf(text);if(i>=0)direct.splice(i,1);direct.unshift(text); }
    else if(!direct.includes(text))direct.push(text);
    exact.set(roman,direct);
  };
  for(const record of records) for(const alias of record.aliases) {
    const base=record.base,present=record.present??base,negative=record.negative??base,perfect=record.perfect??base,derived=record.derivative===undefined?base:record.derivative;
    for(const [roman,text] of [['nu','नु'],['ne','ने'],['na','न'],['nus','नुस्'],['nuhunchha','नुहुन्छ'],['nuhuncha','नुहुन्छ'],['nuhunna','नुहुन्न']])add(alias+roman,base+text);
    const presentAliases=record.presentAliases??(base==='लि'?['li','lin']:base==='दि'?['di','din']:base==='खा'?[alias,alias+'n']:base==='जा'?[alias,alias+'n']:base==='हु'?['hu','hun']:base.endsWith('उ')?[alias,alias+'n']:[alias]);
    for(const presentAlias of presentAliases)for(const [roman,text] of [['chhu','छु'],['chu','छु'],['chha','छ'],['cha','छ'],['chhan','छन्'],['chan','छन्'],['chhau','छौ'],['chau','छौ'],['chhau','छौँ'],['chau','छौँ'],['chhaun','छौँ'],['chaun','छौँ']])add(presentAlias+roman,present+text);
    for(const [roman,text] of [['dina','दिन'],['dina','दिनँ'],['din','दिन'],['din','दिनँ'],['daina','दैन'],['dainan','दैनन्']])add(alias+roman,negative+text);
    if(base.endsWith('्'))add(alias+'aula',vowel(base,'औ','ौ','ँला'));
    if(base.endsWith('्'))for(const ending of ['au','aun'])invite(alias+ending,vowel(base,'औ','ौ','ँ'));
    if(record.volitional)for(const ending of ['u','un'])invite(alias+ending,record.volitional);
    add(alias+'dai',(base.endsWith('्')?base:negative)+'दै');
    const vowelAliases=base.endsWith('ाउ')?[alias,alias.slice(0,-1)]:[alias];
    for(const formAlias of vowelAliases) {
      for(const [roman,text] of [['eko','को'],['eki','की'],['eka','का']]) {
        add(formAlias+roman,vowel(perfect,'ए','े',text));
        if(!base.endsWith('्'))add(formAlias+'y'+roman,vowel(perfect,'ए','े',text));
      }
      // Passive इ + ए endings belong to the authored derivative stem. The
      // optional Roman y is a glide, not a written य (बताइए/बनाइएर).
      if(derived)for(const [roman,rest] of [['ie','ए'],['iye','ए'],['ieko','एको'],['ieki','एकी'],['ieka','एका'],['iera','एर'],['iyera','एर'],['idinu','दिनु'],['idinus','दिनुस्'],['iraheko','रहेको'],['iraheki','रहेकी'],['iraheka','रहेका'],['irahanuhunchha','रहनुहुन्छ'],['irahanuhuncha','रहनुहुन्छ'],['iyeko','एको'],['iyeki','एकी'],['iyeka','एका'],['iyo','यो'],['inchha','न्छ'],['incha','न्छ'],['inchhan','न्छन्']])add(formAlias+roman,vowel(derived,'इ','ि',rest));
    }
  }
  // The written past/perfect stem differs from the present stem for VV verbs
  // and irregulars. A Roman y between vowels is a spelling hint here, not an
  // instruction to insert य into every inflected word.
  for(const record of records) {
    const past=record.perfect??record.base;
    const aliases=record.pastAliases??record.aliases.map(alias=>record.base.endsWith('उ')?alias.slice(0,-1):alias);
    for(const alias of record.perfectAliases||[])for(const [ending,rest] of [['eko','को'],['eki','की'],['eka','का']])add(alias+ending,vowel(past,'ए','े',rest),true);
    for(const alias of aliases) {
      for(const form of [alias,...(/[aeiou]$/.test(alias)?[alias+'y']:[])]) {
        // Active connectives share the past stem; retain short Roman -er too.
        for(const ending of ['era','er'])add(form+ending,vowel(past,'ए','े','र'));
        add(form+'e',vowel(past,'ए','े',''));
        add(form+'e',vowel(past,'ए','े','ँ'));
        add(form+'en',vowel(past,'ए','े','ँ'));
        add(form+'enau',vowel(past,'ए','े','नौ'));
        add(form+'ena',vowel(past,'ए','े','न'));
        add(form+'enan',vowel(past,'ए','े','नन्'));
        // Evidential past forms share the written ए stem; the typed y is a
        // glide, as in the other vowel-stem past forms.
        for(const [ending,native] of [['echha','छ'],['echa','छ'],['echhan','छन्'],['echan','छन्'],['echhu','छु'],['echu','छु'],['echhau','छौ'],['echau','छौ'],['echhaun','छौँ'],['echaun','छौँ']])add(form+ending,vowel(past,'ए','े',native));
      }
      add(alias+'yo',past+'यो');
    }
  }
  const result={index,exact,invitations};cache.set(normalize,result);return result;
}
export function verbCandidates(word,normalize) {
  if(word.length<4)return[];
  const {index,exact,invitations}=verbs(normalize);
  const direct=exact.get(word)||[];
  // An exact authored inflection outranks a lossy-normalized lexical match;
  // explicit whole-word aliases (score 0) still retain their priority.
  const result=[...new Set([...direct,...(index.get(normalize(word))||[])])].map((text,index)=>({text,score:(direct.includes(text)?.35:.7)+index*.1,source:'verb-form'}));
  // Interpret informal x only when the entire rewritten token is an authored
  // verb form. Literal ks/ksh words and names keep their original decoding.
  if(word.includes('x'))(exact.get(word.replace(/x/g,'chh'))||[]).forEach((text,index)=>result.push({text,score:.5+index*.1,source:'verb-form'}));
  // A shared invitation needs subject context; do not change bare imperatives.
  const invitation=invitations.get(word);
  if(invitation)result.push({text:invitation,score:4.4,source:'verb-form',volitional:true});
  return result;
}

const nameEndings=[['anshika','ansh'],['anshi','ansh'],['ansh','ansh'],['ika','i'],['priya','priya']];
function nameJoin(prefix,kind,ending) {
  if(kind==='ansh') {
    const rest=ending==='ansh'?'ंश':ending==='anshi'?'ंशी':'ंशिका';
    if(prefix.endsWith('ा'))return prefix+rest;
    if(/[िीुूेैोौंँः्]$/u.test(prefix))return null;
    return prefix+'ा'+rest;
  }
  if(kind==='i') {
    if(!/[क-ह्]$/u.test(prefix))return null;
    return vowel(prefix.endsWith('्')?prefix:prefix+'्','इ','ि','का');
  }
  if(prefix.endsWith('्'))return prefix+'प्रिया';
  return /[क-ह]$/u.test(prefix)?[prefix+'प्रिया',prefix+'्प्रिया']:prefix+'प्रिया';
}
export function nameCandidates(word) {
  const match=nameEndings.find(([ending])=>word.endsWith(ending)&&word.length-ending.length>=3);
  if(!match)return[];
  const [ending,kind]=match,stem=word.slice(0,-ending.length);
  // Literal consonant clusters and the trained decoder provide complementary
  // prefix spellings. No table of complete test names is used.
  const prefixes=[...decodeRoman(stem,{width:32,limit:4}).map(c=>c.text),...decodeSegments(stem,{...config,limit:2}).map(c=>c.text)];
  const unique=[...new Set(prefixes.flatMap(p=>nameJoin(p,kind,ending)||[]).filter(Boolean))];
  return unique.slice(0,4).map((text,index)=>({text,score:3.12+index*.07,source:'name-form',nameForm:true}));
}

const pluralCases=[['harusamma','हरूसम्म'],['harudekhi','हरूदेखि'],['harusanga','हरूसँग'],['harubata','हरूबाट'],['harulai','हरूलाई'],['haruko','हरूको'],['haruma','हरूमा'],['harule','हरूले'],['haru','हरू']];
export function pluralCandidates(word) {
  const match=pluralCases.find(([ending])=>word.endsWith(ending)&&word.length-ending.length>=3);
  if(!match)return[];
  const [ending,native]=match,stem=word.slice(0,-ending.length);
  const known=nativeCandidates(stem).filter(candidate=>candidate.score<3)
    .map(candidate=>({text:candidate.text+native,score:candidate.score+.5,source:'plural-form'}));
  const bases=decodeSegments(stem,{...config,limit:2});
  return [...known,...bases.map((c,index)=>({text:c.text+native,score:3.08+index*.2,source:'plural-form'}))];
}
