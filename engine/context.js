import {lexicon} from './lexicon.js';
import {prepareRoman} from './rules.js';

// Deliberately small, explainable context rules. These resolve supported input
// ambiguities; they do not parse arbitrary sentences or revise committed text.
const nominals=new Set(lexicon.filter(entry=>entry.nominal).map(entry=>entry.text));
const nominal=word=>nominals.has(word)||(word.endsWith('हरू')&&nominals.has(word.slice(0,-3)));
const cases=new Map([['ma','मा'],['maa','मा'],['ko','को'],['ka','का'],['kaa','का'],['ki','की'],['le','ले'],['lai','लाई'],['laai','लाई'],['bata','बाट'],['sanga','सँग'],['haru','हरू']]);
const pronouns=new Map([
  ['म',{stem:'म',genitive:['मेरो','मेरा','मेरी'],agent:'मैले'}],
  ['हामी',{stem:'हामी',genitive:['हाम्रो','हाम्रा','हाम्री']}],
  ['तिमी',{stem:'तिमी',genitive:['तिम्रो','तिम्रा','तिम्री'],plural:'तिमीहरू'}],
  ['ऊ',{stem:'उस',genitive:['उसको','उसका','उसकी']}],
  ['उनी',{stem:'उन',genitive:['उनको','उनका','उनकी'],plural:'उनीहरू'}],
  ['यो',{stem:'यस',genitive:['यसको','यसका','यसकी']}],
  ['त्यो',{stem:'त्यस',genitive:['त्यसको','त्यसका','त्यसकी']}],
  ['तपाईं',{stem:'तपाईं',genitive:['तपाईंको','तपाईंका','तपाईंकी']}],
  ['उहाँ',{stem:'उहाँ',genitive:['उहाँको','उहाँका','उहाँकी']}],
]);
const subjectForms=new Map([['म','first-singular'],['मैले','first-singular'],['हामी','first-plural'],['हामीले','first-plural'],['तिमी','second'],['तिमीले','second'],['तपाईं','honorific'],['उहाँ','honorific'],['उनीहरू','third-plural']]);
const adverbs=new Set(['आज','भोलि','हिजो','अहिले','यहाँ','त्यहाँ','त्यसैले','सायद','के']);

// Compose from written pronouns, not their unnasalized decoder approximations.
const joinedPronouns=new Map();
for(const [text,form] of pronouns)for(const alias of lexicon.find(entry=>entry.text===text)?.spellings||[]) {
  for(const [ending,native] of cases) {
    if(form.plural)joinedPronouns.set(alias+'haru'+(native==='हरू'?'':ending),form.plural+(native==='हरू'?'':native));
    if(native==='हरू')continue;
    const genitive=['को','का','की'].indexOf(native);
    joinedPronouns.set(alias+ending,genitive>=0?form.genitive[genitive]:native==='ले'&&form.agent?form.agent:form.stem+native);
  }
}
const spatialForms=new Map();
for(const text of ['यहाँ','त्यहाँ','कहाँ'])for(const alias of lexicon.find(entry=>entry.text===text)?.spellings||[]) {
  for(const [ending,native] of [['bata','बाट'],['dekhi','देखि'],['samma','सम्म'],['tira','तिर']])spatialForms.set(alias+ending,text+native);
}
export function spatialCandidates(word) {
  const text=spatialForms.get(word);
  return text?[{text,score:.35,source:'spatial-form'}]:[];
}
export function pronounCandidates(word) {
  const text=joinedPronouns.get(word);
  return text?[{text,score:.35,source:'pronoun-form'}]:[];
}

// Local preferences, not semantic certainty. All other meanings remain choices.
function previousInlineWord(before) {
  const match=before.match(/(?:^|[ \t])([\u0900-\u097f\u200c\u200d]{1,128})([ \t]+)$/u);
  if(!match)return null;
  const range=match[1]+match[2];
  return {word:match[1],range,start:before.length-range.length};
}
function neighboringPreference(word,before) {
  const adjacent=previousInlineWord(before),previous=adjacent?.word;
  if(word==='pani'&&['गिलास','बोतल','तातो','चिसो','पिउने'].includes(previous))return {text:'पानी',scope:'water',reason:'Water after a container or temperature word'};
  const closureWord=['बिस्तारै','तुरुन्त','राम्ररी','अहिले'].includes(previous)?previousInlineWord(before.slice(0,adjacent.start))?.word:previous;
  if(word==='banda'&&['ढोका','झ्याल','पसल','कार्यालय'].includes(closureWord))return {text:'बन्द',scope:'closure',reason:'Closing a door, window or premises'};
  if(word==='baje'&&(previous==='कति'||/(?:^|\s)[0-9०-९]+(?::[0-9०-९]+)?[ \t]+$/u.test(before)))return {text:'बजे',scope:'clock',reason:'Clock-time expression'};
  return null;
}

function subject(before) {
  const clause=before.slice(-256).split(/[।.!?\n\r,;:"“”‘’]/u).at(-1);
  let words=clause.trim().split(/\s+/u).filter(Boolean);
  if(words.length>24)return null;
  // Start after an explicit clause marker. A trailing पछि phrase resets only
  // when followed by a new explicit subject, preserving हामी कामपछि ... .
  let boundary=-1;
  for(let i=0;i<words.length;i++) {
    if(['तर','कि','भने','किनभने'].includes(words[i]))boundary=i;
    else if(/पछि$/u.test(words[i])&&words.slice(i+1).some(word=>subjectForms.has(word)))boundary=i;
  }
  if(boundary>=0)words=words.slice(boundary+1);
  const positions=words.flatMap((word,index)=>subjectForms.has(word)?[index]:[]);
  if(positions.length!==1)return null;
  const index=positions[0];
  if(index>3 || words.slice(0,index).some(word=>!adverbs.has(word)&&!nominal(word.replace(/(?:मा|बाट)$/u,''))))return null;
  // An intervening finite verb or conjunction can start another clause. Do not
  // carry person across it, quoted speech, or ambiguous coordinated subjects.
  if(words.slice(index+1).some(word=>['र','तर','कि','भने','किनभने','हुँ','हो','हुन्'].includes(word)||(!['यो','त्यो'].includes(word)&&/(?:छु|छ|छन्|छौ|छौँ|छौं|एँ|ेँ|यो|यौँ)$/u.test(word))))return null;
  return subjectForms.get(words[index]);
}

export function contextScope(input,before='') {
  if(typeof before!=='string'||!before.length)return '';
  const word=prepareRoman(input);
  if(/[A-Z]/.test(word))return '';
  const neighbor=neighboringPreference(word,before);
  if(neighbor)return neighbor.scope;
  const previous=previousInlineWord(before)?.word;
  if(word==='ma'&&previous&&nominal(previous))return 'locative';
  const person=subject(before);
  if(person==='first-singular'&&(word==='hu'||/din(?:a)?$|e$/.test(word)))return person;
  if(person==='first-plural'&&/(?:au|aun)$/.test(word))return person;
  if(['first-plural','second'].includes(person)&&/(?:chhau|chau|xau)$/.test(word))return person;
  return '';
}

export function contextualCandidates(input,candidates,before='') {
  if(typeof before!=='string'||!before.length)return candidates;
  const word=prepareRoman(input);
  if(/[A-Z]/.test(word))return candidates;
  const promote=(text,reason)=>{
    const existing=candidates.find(candidate=>candidate.text===text);
    if(existing){existing.originalSource=existing.source;existing.source='context';existing.reason=reason;existing.score=-1;}
  };
  const neighbor=neighboringPreference(word,before);
  if(neighbor)promote(neighbor.text,neighbor.reason);
  const adjacent=previousInlineWord(before),previous=adjacent?.word;
  if(word==='ma'&&previous&&nominal(previous))promote('मा','Locative ending after a known noun');
  const person=subject(before);
  if(person==='first-singular') {
    if(word==='hu')promote('हुँ','First-person copula');
    if(/din(?:a)?$/.test(word)) {
      const form=candidates.find(candidate=>candidate.source==='verb-form'&&candidate.text.endsWith('दिनँ'));
      if(form)promote(form.text,'First-person negative ending');
    }
    if(/e$/.test(word)) {
      const form=candidates.find(candidate=>candidate.source==='verb-form'&&/[ेए]ँ$/u.test(candidate.text));
      if(form)promote(form.text,'First-person past ending');
    }
  }
  if(person==='first-plural'&&/(?:au|aun)$/.test(word)) {
    const invitation=candidates.find(candidate=>candidate.volitional);
    if(invitation)promote(invitation.text,'Shared invitation for the preceding plural subject');
  }
  if(['first-plural','second'].includes(person)&&/(?:chhau|chau|xau)$/.test(word)) {
    const ending=person==='first-plural'?'छौँ':'छौ';
    if(['chhau','chau'].includes(word))promote(ending,'Verb ending for the preceding subject');
    else {
      const form=candidates.find(candidate=>candidate.source==='verb-form'&&candidate.text.endsWith(ending));
      if(form)promote(form.text,'Verb ending for the preceding subject');
    }
  }
  const ending=cases.get(word);
  if(previous&&ending) {
    let text;
    if(nominal(previous))text=previous+ending;
    else if(pronouns.has(previous)&&!['मा','हरू'].includes(ending)) {
      const form=pronouns.get(previous),genitive=['को','का','की'].indexOf(ending);
      text=genitive>=0?form.genitive[genitive]:ending==='ले'&&form.agent?form.agent:form.stem+ending;
    }
    if(text&&!candidates.some(candidate=>candidate.text===text))candidates.push({text,source:'word-join',
      score:Math.max(...candidates.map(candidate=>candidate.score))+1,replaceBefore:adjacent.range,reason:'Join with the previous word'});
  }
  return candidates;
}
