import { wordAtCaret } from './transliterate.js';
import { rankSuggestions, ENGINE_VERSION } from './engine/engine.js';
import { SpellingPreferences } from './engine/preferences.js';
import { contextScope } from './engine/context.js';

const $ = id => document.getElementById(id);
const editor = $('editor');
const storageKey = 'nepali-writer.draft.v1';
const settingsKey = 'nepali-writer.settings.v1';
let mode = 'nepali';
let rememberChoices = true;
let preferences = new SpellingPreferences();
let selectionTouched = false;
let storageAvailable = true;
let active = null;
let candidates = [];
let selected = 0;
let ignored = null;
let composing = false;
let punctuation = null;
let lastValue = '';
let lastSelection = 0;
let toastTimer;
let saveTimer;
const undoStack = [];
const redoStack = [];
const wordSeparators = new Set([' ', '.', ',', '!', '?', ';', ':', '।', '"', "'", '“', '”', '‘', '’', '(', ')', '[', ']', '{', '}', '—', '–']);
const preferencesKey = 'nepali-writer.spellings.v1';

try {
  editor.value = localStorage.getItem(storageKey) || '';
  const settings = JSON.parse(localStorage.getItem(settingsKey) || '{}');
  rememberChoices = settings.rememberChoices !== false;
  mode = settings.mode === 'english' ? 'english' : 'nepali';
} catch { storageAvailable = false; }
try { preferences = new SpellingPreferences(JSON.parse(localStorage.getItem(preferencesKey) || '{}')); } catch { /* Use an empty profile if stored JSON is unavailable. */ }
lastValue = editor.value;
editor.setSelectionRange(editor.value.length, editor.value.length);
lastSelection = editor.value.length;

function toast(message) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').hidden = false;
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 2800);
}

function save() {
  try {
    localStorage.setItem(storageKey, editor.value);
    localStorage.setItem(settingsKey, JSON.stringify({ rememberChoices, mode }));
    localStorage.setItem(preferencesKey, JSON.stringify(preferences));
    storageAvailable = true;
  } catch { storageAvailable = false; }
  $('save-status').replaceChildren();
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.classList.add('icon');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', storageAvailable ? '#i-check' : '#i-shield');
  icon.append(use);
  $('save-status').append(icon, document.createTextNode(storageAvailable ? 'Draft saved on this device' : 'Draft saving unavailable'));
  updateLearningStatus();
}

function updateStats() {
  const value = editor.value;
  const count = value.trim() ? value.trim().split(/\s+/u).length : 0;
  const chars = [...value].length;
  $('word-count').textContent = `${count} ${count === 1 ? 'word' : 'words'} · ${chars} ${chars === 1 ? 'character' : 'characters'}`;
  $('empty-state').hidden = Boolean(value);
  $('empty-decoration').hidden = Boolean(value);
  for (const id of ['copy', 'download', 'clear']) $(id).disabled = !value;
  $('undo').disabled = !undoStack.length;
  $('redo').disabled = !redoStack.length;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(save, 180);
}

function remember() {
  undoStack.push({ value: lastValue, caret: lastSelection });
  if (undoStack.length > 250) undoStack.shift();
  redoStack.length = 0;
}

function replace(start, end, text, caret = start + text.length, record = true) {
  if (record) remember();
  editor.value = editor.value.slice(0, start) + text + editor.value.slice(end);
  editor.setSelectionRange(caret, caret);
  lastValue = editor.value;
  lastSelection = caret;
  ignored = null;
  updateStats();
  updateSuggestions();
}

function getSuggestions(word, before = '') {
  return rankSuggestions(word, { before, preferences: rememberChoices ? preferences : undefined });
}

function updateLearningStatus() {
  $('learning-status').textContent = !storageAvailable ? 'Spellings can only be remembered in this tab' : !rememberChoices ? 'Learning paused · saved choices are not used' : `${preferences.size} ${preferences.size === 1 ? 'word' : 'words'} remembered on this device`;
  $('reset-spellings').disabled = !preferences.size;
}

function currentToken() {
  if (mode !== 'nepali' || composing || editor.selectionStart !== editor.selectionEnd) return null;
  const token = wordAtCaret(editor.value, editor.selectionStart);
  if (!token || ignored === `${token.start}:${token.word}`) return null;
  return {...token,before:editor.value.slice(Math.max(0,token.start-256),token.start)};
}

function renderCandidates(ranked) {
  candidates = ranked.map(candidate => candidate.text);
  selected = Math.min(selected, candidates.length - 1);
  const source=ranked[selected]?.source;
  $('suggestion-source').textContent = punctuation ? 'Choose । or . · ↑ ↓ then Enter' : source === 'personal' ? 'Your preferred spelling' : source === 'word-join' ? 'Join with the previous word' : source === 'context' ? 'Based on the preceding words' : 'On-device suggestions';
  $('candidates').setAttribute('aria-label', punctuation ? 'Punctuation choices' : 'Nepali word suggestions');
  $('candidates').replaceChildren();
  candidates.forEach((word, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `candidate${index === selected ? ' selected' : ''}`;
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', String(index === selected));
    button.setAttribute('aria-label', `Suggestion ${index + 1}: ${word}`);
    button.lang = 'ne';
    const number = document.createElement('span');
    number.className = 'candidate-number';
    number.textContent = String(index + 1);
    number.setAttribute('aria-hidden', 'true');
    button.append(number, document.createTextNode(word));
    button.addEventListener('pointerdown', event => event.preventDefault());
    button.addEventListener('click', () => { if (punctuation) choosePunctuation(word); else commit(word, ''); editor.focus(); });
    $('candidates').append(button);
  });
  $('candidate-announcement').textContent = punctuation ? 'Punctuation: 1 danda ।, 2 period .' : `Suggestions for ${active?.word}: ${candidates.join(', ')}`;
}

function updateSuggestions() {
  if (punctuation && mode === 'nepali' && !composing && editor.selectionStart === punctuation.end && editor.selectionEnd === punctuation.end && editor.value.slice(punctuation.start, punctuation.end) === punctuation.text) {
    active = null;
    $('suggestion-active').hidden = false;
    $('suggestion-idle').hidden = true;
    $('roman-word').textContent = 'Punctuation';
    renderCandidates([{text:'।'}, {text:'.'}]);
    return;
  }
  punctuation = null;
  const next = currentToken();
  if (!next) {
    active = null;
    candidates = [];
    selected = 0;
    $('suggestion-active').hidden = true;
    $('suggestion-idle').hidden = false;
    $('suggestion-idle').lastElementChild.textContent = mode === 'english' ? 'English mode · your words stay as you type them' : 'Your word suggestions will appear here';
    return;
  }
  if (next.word !== active?.word || next.start !== active?.start || next.before !== active?.before) { selected = 0; selectionTouched = false; }
  active = next;
  $('suggestion-active').hidden = false;
  $('suggestion-idle').hidden = true;
  $('roman-word').textContent = next.word;
  renderCandidates(getSuggestions(next.word,next.before));
}

function commit(explicitWord, separator = '') {
  const token = currentToken();
  if (!token) return false;
  const ranked = getSuggestions(token.word,token.before);
  const candidate = explicitWord ? ranked.find(candidate=>candidate.text===explicitWord) : ranked[selected];
  const choice = candidate?.text || token.word;
  let start=token.start;
  if(candidate?.source==='word-join') {
    // Only an explicit candidate selection can replace an earlier word/space.
    // Recheck the exact prefix at commit time to avoid stale range replacement.
    if(!(explicitWord||selectionTouched)||!editor.value.slice(0,start).endsWith(candidate.replaceBefore)) {updateSuggestions();return false;}
    start-=candidate.replaceBefore.length;
  }
  // Learn deliberate corrections, never reinforce an automatically accepted guess.
  if (rememberChoices && candidate?.source!=='word-join' && (explicitWord || selectionTouched)) {
    preferences.record(token.word, choice,{scope:contextScope(token.word,token.before)});
    save();
  }
  selectionTouched = false;
  replace(start, token.end, choice + separator);
  return true;
}

function choosePunctuation(text = candidates[selected], separator = '') {
  if (!punctuation) return;
  const {start, end} = punctuation;
  punctuation = null;
  if (editor.value.slice(start, end) !== text || separator) replace(start, end, text + separator);
  else updateSuggestions();
}

function insertPunctuation() {
  if (mode !== 'nepali') return false;
  punctuation = null;
  // Preserve decimal typing; offer both marks after numbers as well.
  const decimal = editor.selectionStart === editor.selectionEnd && /[0-9०-९]$/.test(editor.value.slice(0, editor.selectionStart));
  const text = decimal ? '.' : '।';
  if (!commit(undefined, text)) replace(editor.selectionStart, editor.selectionEnd, text);
  const end = editor.selectionStart;
  punctuation = {start:end - 1, end, text, decimal};
  selected = decimal ? 1 : 0;
  selectionTouched = false;
  updateSuggestions();
  return true;
}

function history(direction) {
  const source = direction === 'undo' ? undoStack : redoStack;
  const destination = direction === 'undo' ? redoStack : undoStack;
  if (!source.length) return;
  punctuation = null;
  destination.push({ value: editor.value, caret: editor.selectionStart });
  const snapshot = source.pop();
  editor.value = snapshot.value;
  editor.focus();
  editor.setSelectionRange(snapshot.caret, snapshot.caret);
  lastValue = snapshot.value;
  lastSelection = snapshot.caret;
  ignored = null;
  updateStats();
  updateSuggestions();
}

editor.addEventListener('input', () => {
  punctuation = null;
  const next = editor.value;
  if (next !== lastValue) {
    remember();
    lastValue = next;
    ignored = null;
  }
  lastSelection = editor.selectionStart;
  updateStats();
  updateSuggestions();
});
editor.addEventListener('compositionstart', () => { composing = true; updateSuggestions(); });
editor.addEventListener('compositionend', () => { composing = false; updateSuggestions(); });
// Software keyboards may deliver beforeinput without a usable keydown event.
editor.addEventListener('beforeinput', event => {
  if (event.isComposing || composing) return;
  if (event.cancelable && event.inputType === 'insertText' && event.data === '.' && insertPunctuation()) {
    event.preventDefault();
    return;
  }
  if (event.cancelable && punctuation && ((event.inputType === 'insertText' && event.data === ' ') || event.inputType === 'insertLineBreak')) {
    event.preventDefault();
    choosePunctuation(candidates[selected], event.inputType === 'insertLineBreak' ? '\n' : ' ');
    return;
  }
  if (!currentToken()) return;
  if (event.inputType === 'insertText' && wordSeparators.has(event.data)) {
    event.preventDefault();
    commit(undefined, event.data === '.' ? '।' : event.data);
  } else if (event.inputType === 'insertLineBreak') {
    event.preventDefault();
    commit(undefined, '');
  }
});
editor.addEventListener('click', () => { punctuation = null; lastSelection = editor.selectionStart; updateSuggestions(); });
editor.addEventListener('select', () => { lastSelection = editor.selectionStart; });
editor.addEventListener('keyup', event => {
  if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) updateSuggestions();
});
editor.addEventListener('keydown', event => {
  if (event.isComposing || composing) return;
  if ((event.metaKey || event.ctrlKey) && !event.altKey && ['z', 'y'].includes(event.key.toLowerCase())) {
    event.preventDefault();
    history(event.key.toLowerCase() === 'y' || event.shiftKey ? 'redo' : 'undo');
    return;
  }
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === '.' && insertPunctuation()) {
    event.preventDefault();
    return;
  }
  if (punctuation) {
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      selected = (selected + 1) % 2;
      selectionTouched = true;
      updateSuggestions();
      return;
    }
    if (/^[12]$/.test(event.key) && (!punctuation.decimal || selectionTouched)) {
      event.preventDefault();
      choosePunctuation(candidates[Number(event.key) - 1]);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choosePunctuation(candidates[selected], event.key === ' ' ? ' ' : '\n');
      return;
    }
    punctuation = null;
    updateSuggestions();
    if (event.key === 'Escape') { event.preventDefault(); return; }
  }
  const token = currentToken();
  if (!token) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    ignored = `${token.start}:${token.word}`;
    updateSuggestions();
  } else if (['ArrowDown', 'ArrowUp'].includes(event.key) && candidates.length) {
    event.preventDefault();
    selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + candidates.length) % candidates.length;
    selectionTouched = true;
    renderCandidates(getSuggestions(token.word,token.before));
  } else if (/^[1-5]$/.test(event.key) && candidates[Number(event.key) - 1]) {
    event.preventDefault();
    commit(candidates[Number(event.key) - 1]);
  } else if (event.key === 'Enter' || wordSeparators.has(event.key)) {
    event.preventDefault();
    const separator = event.key === 'Enter' ? (event.shiftKey ? '\n' : '') : event.key === '.' ? '।' : event.key;
    commit(undefined, separator);
  }
});

function setMode(next) {
  punctuation = null;
  mode = next;
  $('nepali-mode').classList.toggle('active', mode === 'nepali');
  $('english-mode').classList.toggle('active', mode === 'english');
  $('nepali-mode').setAttribute('aria-pressed', String(mode === 'nepali'));
  $('english-mode').setAttribute('aria-pressed', String(mode === 'english'));
  editor.setAttribute('lang', mode === 'nepali' ? 'ne' : 'en');
  updateSuggestions();
  save();
}
$('nepali-mode').addEventListener('click', () => { setMode('nepali'); editor.focus(); });
$('english-mode').addEventListener('click', () => { setMode('english'); editor.focus(); });
$('learning-toggle').checked = rememberChoices;
$('learning-toggle').addEventListener('change', () => {
  rememberChoices = $('learning-toggle').checked;
  updateSuggestions();
  save();
});
$('reset-spellings').addEventListener('click', () => {
  preferences.clear();
  updateSuggestions();
  save();
  toast('Learned spellings reset. Your draft is unchanged.');
});
$('engine-details').textContent = `Engine ${ENGINE_VERSION} · learned on-device suggestions · no words leave this browser`;

document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const prefix = start && !/\s$/.test(editor.value.slice(0, start)) ? ' ' : '';
  setMode('nepali');
  editor.focus();
  replace(start, end, prefix + button.dataset.example);
}));
$('undo').addEventListener('click', () => history('undo'));
$('redo').addEventListener('click', () => history('redo'));
$('clear').addEventListener('click', () => $('clear-dialog').showModal());
$('cancel-clear').addEventListener('click', () => $('clear-dialog').close());
$('confirm-clear').addEventListener('click', () => {
  $('clear-dialog').close();
  replace(0, editor.value.length, '');
  editor.focus();
  save();
  toast('A fresh page. You can undo to bring your draft back.');
});
$('focus-mode').addEventListener('click', () => {
  const expanded = document.body.classList.toggle('focus-mode');
  $('focus-mode').setAttribute('aria-pressed', String(expanded));
  $('focus-mode').setAttribute('aria-label', expanded ? 'Restore writing area' : 'Expand writing area');
  $('focus-mode').title = expanded ? 'Restore writing area' : 'Expand writing area';
  editor.focus();
});

function outputText() {
  if (punctuation) choosePunctuation();
  if (currentToken()) commit();
  return editor.value;
}
$('copy').addEventListener('click', async () => {
  const text = outputText();
  try {
    await navigator.clipboard.writeText(text);
    toast('Copied. Your words are ready to go.');
  } catch {
    editor.focus();
    editor.select();
    toast('Clipboard unavailable. Your text is selected — press ⌘/Ctrl C to copy.');
  }
});
$('download').addEventListener('click', async () => {
  const text = outputText();
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'nepali-writing.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Your writing has been downloaded.');
});

function openGuide() { $('guide-dialog').showModal(); }
for (const id of ['open-guide', 'more-guide']) $(id).addEventListener('click', openGuide);
for (const id of ['close-guide', 'guide-done']) $(id).addEventListener('click', () => $('guide-dialog').close());
document.addEventListener('keydown', event => {
  if (event.altKey && event.key.toLowerCase() === 'n') {
    event.preventDefault();
    setMode(mode === 'nepali' ? 'english' : 'nepali');
    editor.focus();
    toast(mode === 'nepali' ? 'Nepali phonetic input enabled' : 'English input enabled');
  } else if (event.key === '?' && !['TEXTAREA', 'INPUT'].includes(document.activeElement.tagName) && !document.querySelector('dialog[open]')) openGuide();
});
window.addEventListener('pagehide', save);
document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });

setMode(mode);
updateLearningStatus();
updateStats();
