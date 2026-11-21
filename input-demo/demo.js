import { NepaliPi } from './nepalipi.bundle.js';

const $ = id => document.getElementById(id);
let renderer = 'list';
const nepaliNumber = value => String(value).replace(/\d/g, digit => '०१२३४५६७८९'[digit]);
let customHints = { nepalipi: 'नेपालिपि' };
const attributes = (element, values) => {
  for (const [key, value] of Object.entries(values)) {
    if (value === null) element.removeAttribute(key);
    else element.setAttribute(key, value);
  }
};

$('copy-install').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('install-command').textContent);
    $('install-status').textContent = 'Command copied.';
  } catch {
    $('install-status').textContent = 'Could not copy. Select the command to copy it manually.';
  }
});

// All elements, markup and classes here belong to the consumer, not the controller.
const input = $('message');
const host = $('message-options');
const controller = NepaliPi(input, { hints: customHints });
function renderSuggestions(state) {
  attributes(input, controller.getInputAttributes());
  host.hidden = !state.open;
  host.dataset.renderer = renderer;
  const panel = document.createElement(renderer === 'list' ? 'ul' : renderer === 'ime' ? 'section' : 'div');
  const list = renderer === 'ime' ? document.createElement('ol') : panel;
  attributes(list, controller.getListAttributes());
  panel.className = `suggestion-${renderer}`;
  if (renderer === 'ime') {
    const query = document.createElement('div');
    query.className = 'ime-query';
    const language = document.createElement('span');
    language.className = 'ime-language';
    language.textContent = 'ने';
    language.lang = 'ne';
    language.setAttribute('aria-hidden', 'true');
    const roman = document.createElement('span');
    roman.textContent = state.mode === 'punctuation' ? 'Punctuation' : state.word;
    query.append(language, roman);
    panel.append(query, list);
  }
  for (const suggestion of state.suggestions) {
    const button = document.createElement('button');
    button.type = 'button';
    attributes(button, controller.getOptionAttributes(suggestion.id));
    button.lang = suggestion.lang ?? (suggestion.kind === 'english' ? 'en' : 'ne');
    button.dataset.kind = suggestion.kind;
    button.dataset.number = String(suggestion.number);
    button.dataset.custom = String(suggestion.custom);
    if (suggestion.kind === 'english') button.setAttribute('aria-label', `${suggestion.text}, English, option 6`);
    if (suggestion.kind === 'punctuation') button.setAttribute('aria-label', `${suggestion.label}, विकल्प ${nepaliNumber(suggestion.number)}`);
    if (renderer === 'list' || renderer === 'ime') {
      const title = document.createElement('strong');
      title.textContent = suggestion.text;
      title.dataset.optionText = '';
      const detail = document.createElement('span');
      detail.textContent = renderer === 'ime' ? `${nepaliNumber(suggestion.number)}.` : suggestion.label ?? '';
      detail.lang = renderer === 'ime' ? 'ne' : suggestion.lang ?? 'en';
      if (renderer === 'ime') {
        detail.className = 'ime-number';
        detail.setAttribute('aria-hidden', 'true');
        button.append(detail, title);
        if (suggestion.kind === 'punctuation') {
          const label = document.createElement('small');
          label.className = 'option-language';
          label.textContent = suggestion.label;
          button.append(label);
        }
      } else {
        const shortcut = document.createElement('kbd');
        shortcut.className = 'option-shortcut';
        shortcut.textContent = nepaliNumber(suggestion.number);
        shortcut.lang = 'ne';
        shortcut.setAttribute('aria-hidden', 'true');
        button.append(shortcut, title);
        if (suggestion.label) button.append(detail);
      }
      const row = document.createElement('li');
      row.setAttribute('role', 'presentation');
      row.append(button);
      list.append(row);
    } else {
      const shortcut = document.createElement('kbd');
      shortcut.className = 'option-shortcut';
      shortcut.textContent = nepaliNumber(suggestion.number);
      shortcut.lang = 'ne';
      shortcut.setAttribute('aria-hidden', 'true');
      const title = document.createElement('span');
      title.dataset.optionText = '';
      title.textContent = suggestion.text;
      button.append(shortcut, title);
      if (suggestion.kind === 'punctuation') {
        const label = document.createElement('small');
        label.className = 'option-language';
        label.textContent = suggestion.label;
        button.append(label);
      }
      list.append(button);
    }
    // Preserve the field's caret and focus during pointer/touch selection.
    button.addEventListener('pointerdown', event => event.preventDefault());
    button.addEventListener('click', () => controller.choose(suggestion.id));
  }
  host.replaceChildren(panel);
  controller.dropdown.reposition();
  if (state.open) $('announcement').lang = state.mode === 'punctuation' ? 'ne' : 'en';
  if (state.open) $('announcement').textContent = state.mode === 'punctuation'
    ? state.suggestions.map(item => `${nepaliNumber(item.number)} ${item.label} ${item.text}`).join(', ')
    : `Spellings for ${state.word}: ${state.suggestions.map(item => item.text).join(', ')}`;
}
controller.dropdown.update({ container: host, render: renderSuggestions, position: 'caret' });

for (const button of document.querySelectorAll('.renderer-switch button[data-renderer]')) {
  button.addEventListener('click', () => {
    renderer = button.dataset.renderer;
    for (const item of document.querySelectorAll('.renderer-switch button[data-renderer]')) item.setAttribute('aria-pressed', String(item === button));
    const markup = {
      list: ['LIST', '<ul role="listbox">\n  <li>\n    <button role="option">\n      <strong>नमस्ते</strong>\n      <kbd>१</kbd>\n    </button>\n  </li>\n</ul>'],
      chips: ['CHIP', '<div role="listbox">\n  <button role="option">\n    नमस्ते\n  </button>\n  <button role="option">\n    नमस्तें\n  </button>\n</div>'],
      ime: ['INPUT TOOLS', '<section class="suggestion-ime">\n  <div>ने · pani</div>\n  <ol role="listbox">\n    <li>\n      <button role="option">\n        <span>१.</span>\n        <strong>पनि</strong>\n      </button>\n    </li>\n  </ol>\n</section>'],
    };
    $('markup-label').textContent = `View ${markup[renderer][0].toLowerCase()} markup`;
    $('markup-code').textContent = markup[renderer][1];
    renderSuggestions(controller.getState());
  });
}
for (const button of document.querySelectorAll('[data-theme-choice]')) {
  button.addEventListener('click', () => {
    document.documentElement.dataset.theme = button.dataset.themeChoice;
    for (const item of document.querySelectorAll('[data-theme-choice]')) item.setAttribute('aria-pressed', String(item === button));
  });
}
$('enabled').addEventListener('change', event => {
  controller.update({ enabled: event.target.checked });
});
$('demo-form').addEventListener('submit', event => {
  event.preventDefault();
  $('form-result').textContent = JSON.stringify(Object.fromEntries(new FormData(event.target)), null, 2);
  $('form-result').hidden = false;
});
$('demo-form').addEventListener('reset', () => {
  $('form-result').hidden = true;
  controller.update({ enabled: true });
});
const hintRows = $('hint-rows');
let hintRowNumber = 1;

$('add-hint').addEventListener('click', () => {
  const row = hintRows.firstElementChild.cloneNode(true);
  hintRowNumber += 1;
  for (const label of row.querySelectorAll('label')) {
    const field = row.querySelector(`#${label.htmlFor}`);
    field.id += `-${hintRowNumber}`;
    field.defaultValue = '';
    field.value = '';
    label.htmlFor = field.id;
  }
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'remove-hint';
  remove.textContent = 'Remove row';
  remove.addEventListener('click', () => {
    row.remove();
    $('add-hint').focus();
  });
  row.append(remove);
  hintRows.append(row);
  row.querySelector('[data-hint-roman]').focus();
});

$('hint-form').addEventListener('submit', event => {
  event.preventDefault();
  const submittedHints = new Map();
  for (const row of hintRows.children) {
    const roman = row.querySelector('[data-hint-roman]').value.trim();
    const nepali = row.querySelector('[data-hint-nepali]').value.trim();
    const spellings = submittedHints.get(roman) ?? [];
    if (!spellings.includes(nepali)) spellings.push(nepali);
    submittedHints.set(roman, spellings);
  }
  const next = { ...customHints, ...Object.fromEntries(submittedHints) };
  $('hint-status').hidden = false;
  try {
    controller.setHints(next);
  } catch (error) {
    $('hint-status').textContent = error.message;
    return;
  }
  customHints = next;
  $('hint-status').textContent = 'Spelling hints applied.';
  $('playground').scrollIntoView({ block: 'start' });
  input.focus({ preventScroll: true });
});
$('clear-hints').addEventListener('click', () => {
  controller.setHints({});
  customHints = {};
  $('hint-status').hidden = false;
  $('hint-status').textContent = 'Hints cleared.';
});
