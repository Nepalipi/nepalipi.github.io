// Keep vertical stickiness outside the horizontal scroller so the browser can
// pin the visible header during compositor scrolling. The original table owns
// the accessible headers and determines the column widths.
for (const table of document.querySelectorAll('.source-table, .word-grid')) {
  const scroller = table.parentElement;
  const wrapper = document.createElement('div');
  wrapper.className = 'sticky-table';

  const viewport = document.createElement('div');
  viewport.className = 'sticky-table-header';
  viewport.setAttribute('aria-hidden', 'true');
  viewport.inert = true;

  const mirror = document.createElement('table');
  mirror.className = 'sticky-' + table.className;
  const columns = mirror.createTHead();
  const widths = document.createElement('colgroup');
  mirror.prepend(widths);
  viewport.append(mirror);

  scroller.before(wrapper);
  wrapper.append(scroller, viewport);

  function syncHorizontal() {
    viewport.scrollLeft = scroller.scrollLeft;
  }

  function syncHeader() {
    const head = table.tHead;
    const bounds = head.getBoundingClientRect();
    const scrollBounds = scroller.getBoundingClientRect();
    const cells = Array.from(head.rows[0]?.cells ?? []);
    const columnWidths = cells.map(cell => cell.getBoundingClientRect().width);
    viewport.style.marginTop = (bounds.top - scrollBounds.top) + 'px';
    viewport.style.marginInline = scroller.clientLeft + 'px';
    viewport.style.height = bounds.height + 'px';
    viewport.style.setProperty('--word-input', getComputedStyle(table).getPropertyValue('--word-input'));
    table.style.setProperty('--header-height', bounds.height + 'px');
    mirror.style.width = table.getBoundingClientRect().width + 'px';
    widths.replaceChildren(...columnWidths.filter(Boolean).map(width => {
      const col = document.createElement('col');
      col.style.width = width + 'px';
      return col;
    }));
    const row = head.rows[0]?.cloneNode(true);
    row?.querySelector('[aria-sort]')?.removeAttribute('aria-sort');
    columns.replaceChildren(...(row ? [row] : []));
    wrapper.dataset.ready = '';
    syncHorizontal();
  }

  const sizes = new ResizeObserver(syncHeader);
  sizes.observe(table);
  sizes.observe(table.tHead);
  sizes.observe(scroller);
  const content = new MutationObserver(syncHeader);
  content.observe(table.tHead, { subtree: true, childList: true, attributes: true });
  scroller.addEventListener('scroll', syncHorizontal, { passive: true });

  table.tBodies[0].addEventListener('focusin', event => {
    const header = viewport.getBoundingClientRect();
    if (header.top > 0 || header.bottom <= 0) return;
    const overlap = header.bottom + 8 - event.target.getBoundingClientRect().top;
    if (overlap > 0) window.scrollBy(0, -overlap);
  });
}
