// Optional consumer-side geometry. The headless controller still owns no UI.
const textProperties = [
  'direction', 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight',
  'fontStretch', 'fontKerning', 'fontFeatureSettings', 'fontVariationSettings',
  'lineHeight', 'letterSpacing', 'wordSpacing', 'textAlign', 'textIndent',
  'textTransform', 'tabSize', 'paddingTop', 'paddingRight', 'paddingBottom',
  'paddingLeft', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth',
  'borderLeftWidth', 'wordBreak', 'overflowWrap',
];

function createMirror(element) {
  const mirror = element.ownerDocument.createElement('div');
  mirror.setAttribute('aria-hidden', 'true');
  mirror.setAttribute('data-nepalipi-caret-mirror', '');
  mirror.inert = true;
  element.ownerDocument.body.append(mirror);
  return mirror;
}

function measure(element, mirror) {
  const view = element.ownerDocument.defaultView;
  const style = view.getComputedStyle(element);
  const number = name => parseFloat(style[name]) || 0;
  for (const property of textProperties) mirror.style[property] = style[property];
  Object.assign(mirror.style, {
    position: 'fixed', visibility: 'hidden', pointerEvents: 'none',
    left: '-10000px', top: '0', margin: '0', boxSizing: 'border-box',
    borderStyle: 'solid', height: 'auto', minHeight: '0', maxHeight: 'none',
    width: `${element.clientWidth + number('borderLeftWidth') + number('borderRightWidth')}px`,
    whiteSpace: element instanceof view.HTMLTextAreaElement && element.wrap !== 'off' ? 'pre-wrap' : 'pre',
  });
  const position = element.selectionStart ?? 0;
  mirror.textContent = element.value.slice(0, position);
  const marker = element.ownerDocument.createElement('span');
  marker.textContent = element.value.slice(position) || '\u200b';
  mirror.append(marker);
  const box = element.getBoundingClientRect();
  const mirrorBox = mirror.getBoundingClientRect();
  const markerBox = marker.getClientRects()[0];
  const height = number('lineHeight') || number('fontSize') * 1.2;
  const left = box.left + markerBox.left - mirrorBox.left - element.scrollLeft;
  const top = box.top + markerBox.top - mirrorBox.top - element.scrollTop;
  return { left, top, bottom: top + height, height };
}

export function getCaretRect(element) {
  const mirror = createMirror(element);
  try { return measure(element, mirror); }
  finally { mirror.remove(); }
}

export function attachCaretPopup(element, popup, { gap = 6, padding = 8 } = {}) {
  const doc = element.ownerDocument, view = doc.defaultView;
  const events = new view.AbortController();
  const mirror = createMirror(element);
  const parent = popup.parentNode, sibling = popup.nextSibling;
  const properties = ['position', 'left', 'top', 'right', 'bottom', 'margin', 'maxWidth', 'maxHeight', 'visibility'];
  const original = Object.fromEntries(properties.map(name => [name, popup.style[name]]));
  let frame = 0, destroyed = false, revealActive = false;
  // A body-level popup escapes the textarea and ordinary overflow containers.
  popup.classList.add('caret-popup');
  Object.assign(popup.style, { position: 'fixed', right: 'auto', bottom: 'auto', margin: '0', visibility: 'hidden' });
  doc.body.append(popup);

  function position() {
    frame = 0;
    if (destroyed || popup.hidden) return;
    const caret = measure(element, mirror);
    const box = element.getBoundingClientRect();
    const viewport = view.visualViewport;
    const left = (viewport?.offsetLeft ?? 0) + padding;
    const top = (viewport?.offsetTop ?? 0) + padding;
    const right = left + (viewport?.width ?? doc.documentElement.clientWidth) - padding * 2;
    const bottom = top + (viewport?.height ?? view.innerHeight) - padding * 2;
    const clipped = doc.activeElement !== element ||
      caret.left < box.left + element.clientLeft - 1 ||
      caret.left > box.left + element.clientLeft + element.clientWidth + 1 ||
      caret.bottom <= box.top + element.clientTop ||
      caret.top >= box.top + element.clientTop + element.clientHeight ||
      caret.bottom <= top || caret.top >= bottom || caret.left < left || caret.left > right;
    popup.style.visibility = clipped ? 'hidden' : 'visible';
    if (clipped) return;
    popup.style.maxWidth = `${Math.max(0, right - left)}px`;
    // Measure natural height before choosing a side; previous clamps must not
    // make an above/below choice oscillate on subsequent observer callbacks.
    const scrollTop = popup.scrollTop;
    popup.style.maxHeight = 'none';
    const naturalHeight = popup.getBoundingClientRect().height;
    const below = Math.max(0, bottom - caret.bottom - gap);
    const above = Math.max(0, caret.top - top - gap);
    const placement = naturalHeight <= below || below >= above ? 'bottom' : 'top';
    popup.style.maxHeight = `${placement === 'bottom' ? below : above}px`;
    // Expanding to measure natural height can clamp scrollTop back to zero.
    popup.scrollTop = scrollTop;
    const size = popup.getBoundingClientRect();
    popup.style.left = `${Math.max(left, Math.min(caret.left, right - size.width))}px`;
    popup.style.top = `${placement === 'bottom' ? caret.bottom + gap : caret.top - gap - size.height}px`;
    popup.dataset.placement = placement;
    const active = popup.querySelector('[aria-selected="true"]');
    if (revealActive && active) {
      const option = active.getBoundingClientRect(), bounds = popup.getBoundingClientRect();
      if (option.top < bounds.top) popup.scrollTop -= bounds.top - option.top;
      else if (option.bottom > bounds.bottom) popup.scrollTop += option.bottom - bounds.bottom;
    }
    revealActive = false;
  }

  function schedule() {
    if (!destroyed && !frame) frame = view.requestAnimationFrame(position);
  }
  function update() {
    revealActive = true;
    schedule();
  }
  const on = (target, name, capture = false) => target?.addEventListener(name, schedule, { capture, signal: events.signal });
  // Scrolling the popup must not force it back to the highlighted first row.
  // Explicit renders can reveal the active row; geometry events leave the
  // user's manual scroll position intact.
  on(element, 'scroll');
  on(doc, 'selectionchange');
  on(view, 'scroll', true);
  on(view, 'resize');
  on(view.visualViewport, 'scroll');
  on(view.visualViewport, 'resize');
  on(doc.fonts, 'loadingdone');
  const resize = new view.ResizeObserver(schedule);
  resize.observe(element);
  resize.observe(popup);
  doc.fonts.ready.then(schedule);
  return {
    update,
    destroy() {
      destroyed = true;
      if (frame) view.cancelAnimationFrame(frame);
      events.abort();
      resize.disconnect();
      mirror.remove();
      popup.classList.remove('caret-popup');
      delete popup.dataset.placement;
      for (const property of properties) popup.style[property] = original[property];
      if (parent) parent.insertBefore(popup, sibling?.parentNode === parent ? sibling : null);
      else popup.remove();
    },
  };
}
