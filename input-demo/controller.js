// Prototype direction: headless vanilla field behavior; consumers own all UI.
// This demo reuses engine 2.4.8 without changing its sources or frozen evidence.
import { wordAtCaret } from '../transliterate.js';
import { rankSuggestions } from '../engine/engine.js';
import { compileHints, withHints } from './hints.js';

let sequence = 0;
const attachedFields = new WeakSet();

export function attachNepalipi(element, { numberShortcuts = true, hints = {} } = {}) {
  if (!(element instanceof HTMLTextAreaElement) &&
      !(element instanceof HTMLInputElement && ['text', 'search'].includes(element.type))) {
    throw new TypeError('This prototype supports text/search inputs and textareas.');
  }
  if (attachedFields.has(element)) throw new Error('Nepalipi is already attached to this field. Update or destroy its existing controller first.');
  let customHints = compileHints(hints);
  attachedFields.add(element);
  const id = `nepalipi-${++sequence}`;
  const listeners = new Set();
  const events = new AbortController();
  let destroyed = false, composing = false, enabled = true, internal = false;
  let activeId = null, signature = '', dismissed = '', revision = 0;
  let heldNumber = null;
  let punctuation = null;
  let state, candidates = [], token = null;
  const snapshot = () => ({ value: element.value, start: element.selectionStart, end: element.selectionEnd });
  let previous = snapshot();
  const undo = [], redo = [];
  const remember = () => {
    undo.push(previous);
    if (undo.length > 200) undo.shift();
    redo.length = 0;
  };
  const on = (name, handler) => element.addEventListener(name, handler, { signal: events.signal });

  function refresh() {
    if (destroyed) return;
    const editable = enabled && !composing && !element.disabled && !element.readOnly &&
      element === document.activeElement && element.selectionStart === element.selectionEnd;
    if (punctuation && (!editable || element.selectionStart !== punctuation.end || element.value !== punctuation.value)) punctuation = null;
    token = editable && !punctuation
      ? wordAtCaret(element.value, element.selectionStart) : null;
    const next = punctuation ? `punctuation\0${element.value}\0${punctuation.start}\0${punctuation.end}`
      : token ? `${element.value}\0${token.start}\0${token.end}` : '';
    if (next !== signature) { activeId = null; revision++; }
    signature = next;
    candidates = token && next !== dismissed ? withHints(token.word, rankSuggestions(token.word, {
      limit: 5,
      before: element.value.slice(Math.max(0, token.start - 256), token.start),
    }), customHints).map((candidate, index) => ({ ...candidate, id: `${id}-${revision}-${index}`, number: index + 1, kind: 'nepali' })) : [];
    if (token && next !== dismissed) candidates.push({
      id: `${id}-${revision}-english`, text: token.word, source: 'english', kind: 'english', number: 6,
    });
    if (punctuation) candidates = [
      { text: '।', label: 'पूर्णविराम', lang: 'ne', number: 1 },
      { text: '.', label: 'दशमलव', lang: 'ne', number: 2 },
    ].map(candidate => ({ ...candidate, kind: 'punctuation', id: `${id}-${revision}-mark-${candidate.number}` }));
    if (!candidates.some(candidate => candidate.id === activeId)) {
      // Joining earlier text always requires an explicit choice.
      activeId = (punctuation ? candidates.find(candidate => candidate.text === punctuation.text)
        : candidates.find(candidate => candidate.source !== 'word-join'))?.id ?? null;
    }
    state = Object.freeze({
      suggestions: Object.freeze(candidates.map(({ id, text, number, kind, label, lang, custom }) => Object.freeze({ id, text, number, kind, label, lang, custom: Boolean(custom) }))),
      activeId, open: Boolean(candidates.length), enabled, numberShortcuts, status: 'ready',
      numberSelectionEnabled: numberShortcuts && (!punctuation?.decimal || punctuation.touched),
      mode: punctuation ? 'punctuation' : token ? 'word' : null,
      word: punctuation ? '.' : token?.word ?? '', value: element.value,
    });
    for (const listener of listeners) listener(state);
  }

  function announceChange() {
    previous = snapshot();
    internal = true;
    try { element.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertReplacementText' })); }
    finally { internal = false; }
    refresh();
  }

  function choose(candidateId = activeId, separator = '', explicit = true) {
    if (destroyed || composing || !enabled || element.disabled || element.readOnly) return false;
    const expected = signature;
    refresh();
    if (destroyed || composing || !enabled || element.disabled || element.readOnly ||
        element !== document.activeElement || element.selectionStart !== element.selectionEnd) return false;
    // Subscribers can synchronously replace values or move the caret. Validate
    // against the live host after notifying them, not only the saved snapshot.
    const liveToken = punctuation ? null : wordAtCaret(element.value, element.selectionStart);
    const liveSignature = punctuation && element.value === punctuation.value && element.selectionStart === punctuation.end
      ? `punctuation\0${element.value}\0${punctuation.start}\0${punctuation.end}`
      : liveToken ? `${element.value}\0${liveToken.start}\0${liveToken.end}` : '';
    if (liveSignature !== expected) return false;
    if ((!token && !punctuation) || signature !== expected) return false;
    const candidate = candidates.find(item => item.id === candidateId);
    if (!candidate) return false;
    let start = punctuation?.start ?? token.start;
    const end = punctuation?.end ?? token.end;
    if (candidate.source === 'word-join') {
      if (!explicit || !element.value.slice(0, start).endsWith(candidate.replaceBefore)) return false;
      start -= candidate.replaceBefore.length;
    }
    const result = element.value.slice(0, start) + candidate.text + separator + element.value.slice(end);
    if (element.maxLength >= 0 && result.length > element.maxLength) return false;
    previous = snapshot();
    const changed = result !== element.value;
    if (changed) remember();
    punctuation = null;
    element.setRangeText(candidate.text + separator, start, end, 'end');
    // A literal choice stays accepted until this word is edited. Otherwise the
    // next Space would reopen its Nepali candidates and convert it again.
    dismissed = candidate.kind === 'english' && !separator
      ? `${element.value}\0${start}\0${start + candidate.text.length}` : '';
    if (changed) announceChange();
    else { previous = snapshot(); refresh(); }
    return true;
  }

  function insertPunctuation() {
    if (destroyed || !enabled || composing || element.disabled || element.readOnly) return false;
    const original = snapshot();
    punctuation = null;
    refresh();
    const interrupted = () => destroyed || !enabled || composing || element.disabled || element.readOnly ||
      element !== document.activeElement || element.value !== original.value ||
      element.selectionStart !== original.start || element.selectionEnd !== original.end;
    if (interrupted()) return false;
    const english = candidates.find(candidate => candidate.id === activeId)?.kind === 'english' ||
      Boolean(token && signature === dismissed);
    const decimal = element.selectionStart === element.selectionEnd && /[0-9०-९]$/.test(element.value.slice(0, element.selectionStart));
    const text = english || decimal ? '.' : '।';
    // Commit a pending word and its punctuation in one undoable edit.
    if (!choose(activeId, text, false)) {
      if (interrupted()) return false;
      const start = element.selectionStart, end = element.selectionEnd;
      const result = element.value.slice(0, start) + text + element.value.slice(end);
      if (element.maxLength >= 0 && result.length > element.maxLength) return false;
      previous = snapshot();
      const changed = result !== element.value;
      if (changed) remember();
      element.setRangeText(text, start, end, 'end');
      dismissed = '';
      if (changed) announceChange();
      else previous = snapshot();
    }
    // A completed edit still consumes the key if a notification disposed or
    // disabled the controller afterward; do not append the native mark twice.
    if (destroyed || !enabled || composing || element.disabled || element.readOnly) return true;
    const end = element.selectionStart;
    punctuation = { start: end - 1, end, text, value: element.value, decimal, touched: false };
    refresh();
    return true;
  }

  function dismiss() {
    punctuation = null;
    dismissed = signature;
    refresh();
  }

  function history(direction) {
    const source = direction === 'undo' ? undo : redo;
    const destination = direction === 'undo' ? redo : undo;
    if (!source.length || element.disabled || element.readOnly || !enabled || composing) return;
    destination.push(snapshot());
    const saved = source.pop();
    punctuation = null;
    element.value = saved.value;
    element.setSelectionRange(saved.start, saved.end);
    dismissed = '';
    announceChange();
  }

  on('input', () => {
    if (internal) return;
    punctuation = null;
    if (element.value !== previous.value) remember();
    previous = snapshot();
    dismissed = '';
    refresh();
  });
  for (const event of ['focus', 'click', 'keyup', 'select']) on(event, () => {
    previous = snapshot();
    refresh();
  });
  on('blur', () => { heldNumber = null; refresh(); });
  on('keyup', event => { if (event.key === heldNumber) heldNumber = null; });
  on('compositionstart', () => { punctuation = null; composing = true; refresh(); });
  on('compositionend', () => { composing = false; previous = snapshot(); refresh(); });
  const boundaries = /^[\s.,!?;:()[\]{}"“”‘’—–]$/u;
  function boundary(text) {
    return text === '.' ? insertPunctuation() : choose(activeId, text, false);
  }
  function chooseNumber(key) {
    if (!state.numberSelectionEnabled || !state.open || !/^[1-6]$/.test(key)) return false;
    const candidate = candidates.find(item => item.number === Number(key));
    return candidate ? choose(candidate.id) : false;
  }
  on('beforeinput', event => {
    previous = snapshot();
    if (event.isComposing || composing || !enabled || !event.cancelable) return;
    if (event.inputType === 'insertText' && chooseNumber(event.data ?? '')) {
      event.preventDefault();
    } else if (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') {
      event.preventDefault();
      history(event.inputType === 'historyUndo' ? 'undo' : 'redo');
    } else if (event.inputType === 'insertText' && boundaries.test(event.data ?? '') && boundary(event.data)) {
      event.preventDefault();
    } else if (['insertLineBreak', 'insertParagraph'].includes(event.inputType) && boundary('\n')) {
      event.preventDefault();
    }
  });
  on('keydown', event => {
    previous = snapshot();
    if (event.isComposing || composing || !enabled || element.disabled || element.readOnly) return;
    if ((event.ctrlKey || event.metaKey) && !event.altKey && ['z', 'y'].includes(event.key.toLowerCase())) {
      event.preventDefault();
      history(event.key.toLowerCase() === 'y' || event.shiftKey ? 'redo' : 'undo');
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (!event.shiftKey && event.repeat && event.key === heldNumber) {
      event.preventDefault();
      return;
    }
    if (!event.shiftKey && chooseNumber(event.key)) {
      heldNumber = event.key;
      event.preventDefault();
    } else if (event.key === 'Escape') dismiss();
    else if (state.open && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      if (punctuation) punctuation.touched = true;
      const index = candidates.findIndex(candidate => candidate.id === activeId);
      activeId = candidates[(index + (event.key === 'ArrowDown' ? 1 : -1) + candidates.length) % candidates.length].id;
      refresh();
    } else if (event.key === 'Tab') choose(activeId, '', false);
    else if (event.key === 'Enter') {
      if (choose(activeId, element instanceof HTMLTextAreaElement ? '\n' : '', false) && element instanceof HTMLTextAreaElement) event.preventDefault();
    } else if (boundaries.test(event.key) && boundary(event.key)) event.preventDefault();
  });
  if (element.form) element.form.addEventListener('reset', () => {
    queueMicrotask(() => { punctuation = null; previous = snapshot(); undo.length = redo.length = 0; dismissed = ''; refresh(); });
  }, { signal: events.signal });
  refresh();

  return {
    subscribe(listener) {
      if (destroyed) return () => {};
      listeners.add(listener);
      try { listener(state); }
      catch (error) { listeners.delete(listener); throw error; }
      return () => listeners.delete(listener);
    },
    getState() { return state; },
    open() {
      if (destroyed || !enabled || element.disabled || element.readOnly || composing) return false;
      element.focus({ preventScroll: true });
      dismissed = '';
      refresh();
      return state.open;
    },
    choose,
    highlight(candidateId) {
      if (destroyed) return;
      if (candidates.some(candidate => candidate.id === candidateId)) {
        if (punctuation) punctuation.touched = true;
        activeId = candidateId;
        refresh();
      }
    },
    dismiss,
    update(options) {
      const nextHints = 'hints' in options ? compileHints(options.hints) : customHints;
      if ('enabled' in options) enabled = Boolean(options.enabled);
      if ('numberShortcuts' in options) numberShortcuts = Boolean(options.numberShortcuts);
      if ('hints' in options) {
        customHints = nextHints;
        revision++;
        activeId = null;
        dismissed = '';
      }
      heldNumber = null;
      refresh();
    },
    getInputAttributes() {
      return {
        ...(element instanceof HTMLInputElement ? { role: 'combobox', 'aria-expanded': String(state.open) } : {}),
        'aria-autocomplete': 'list', 'aria-controls': `${id}-list`,
        'aria-activedescendant': activeId || null,
      };
    },
    getListAttributes() { return { id: `${id}-list`, role: 'listbox', 'aria-label': state.mode === 'punctuation' ? 'Punctuation choices' : 'Nepali spellings' }; },
    getOptionAttributes(candidateId) {
      const candidate = candidates.find(item => item.id === candidateId);
      return {
        id: candidateId, role: 'option', 'aria-selected': String(activeId === candidateId), tabindex: '-1',
        'aria-keyshortcuts': state.numberSelectionEnabled && candidate ? String(candidate.number) : null,
      };
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      events.abort();
      listeners.clear();
      attachedFields.delete(element);
    },
  };
}
