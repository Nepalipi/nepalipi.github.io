// Browser module/global prototype. Consumers provide every rendered element.
import { attachNepalipi } from './input-demo/controller.js';
import { attachCaretPopup, getCaretRect } from './input-demo/caret-popup.js';

const instances = new WeakMap(), dropdownOwners = new WeakMap();

function resolveElement(target, label, doc = document, allowMissing = false) {
  if (typeof target === 'string') {
    const matches = doc.querySelectorAll(target);
    if (matches.length > 1) throw new Error(`${label} must match exactly one element. Use a unique selector.`);
    if (!matches.length) {
      if (allowMissing) return null;
      throw new Error(`${label} did not match an element.`);
    }
    return matches[0];
  }
  if (!target || target.nodeType !== 1 || !target.ownerDocument) throw new TypeError(`${label} must be an element or a unique CSS selector.`);
  return target;
}

function validateOptions(options) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('NepaliPi options must be an object.');
  for (const key of ['enabled', 'numberShortcuts']) {
    if (key in options && typeof options[key] !== 'boolean') throw new TypeError(`${key} must be a boolean.`);
  }
  if ('onError' in options && options.onError !== null && typeof options.onError !== 'function') throw new TypeError('onError must be a function or null.');
}

function dropdownConfig(value, element, previous) {
  if (value === false || value === null) return null;
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new TypeError('dropdown needs a container and render function, or false.');
  const config = { position: 'caret', ...previous, ...value };
  config.container = resolveElement(config.container, 'Dropdown container', element.ownerDocument);
  if (config.container.ownerDocument !== element.ownerDocument) throw new Error('Dropdown and field must belong to the same document.');
  if (config.container.contains(element) || element.contains(config.container)) throw new Error('Dropdown container must be separate from the target field.');
  if (typeof config.render !== 'function') throw new TypeError('dropdown.render must be a function; Nepalipi creates no suggestion HTML.');
  if (!['caret', 'manual'].includes(config.position)) throw new TypeError('dropdown.position must be caret or manual.');
  const owner = dropdownOwners.get(config.container);
  if (owner && owner !== element) throw new Error('This dropdown container belongs to another field.');
  return config;
}

function bindDropdown(config, element, core, controller, hooks) {
  const container = config.container, initialHidden = container.hidden;
  let cleanup, positioner, unsubscribe = () => {}, disposed = false, mounting = true;
  dropdownOwners.set(container, element);
  const binding = {
    element: container,
    reposition() { positioner?.update(); },
    destroy() {
      if (disposed) return;
      disposed = true;
      unsubscribe();
      const previousCleanup = cleanup;
      cleanup = undefined;
      try { if (previousCleanup) hooks.invoke(previousCleanup); }
      finally {
        positioner?.destroy();
        container.hidden = initialHidden;
        dropdownOwners.delete(container);
      }
    },
  };
  try {
    if (config.position === 'caret') positioner = attachCaretPopup(element, container);
    unsubscribe = core.subscribe(state => {
      if (disposed) return;
      try {
        const previousCleanup = cleanup;
        cleanup = undefined;
        if (previousCleanup) hooks.invoke(previousCleanup);
        if (disposed) return;
        container.hidden = !state.open;
        const result = hooks.invoke(() => config.render(state, { container, controller }));
        if (typeof result === 'function') {
          if (disposed) hooks.invoke(result);
          else cleanup = result;
        }
        if (!disposed) positioner?.update();
      } catch (error) {
        if (mounting) throw error;
        try { binding.destroy(); }
        catch { /* Preserve the original failure and keep native edits usable. */ }
        finally {
          container.hidden = true;
          hooks.failed(binding, error);
        }
      }
    });
    mounting = false;
    return binding;
  } catch (error) {
    binding.destroy();
    throw error;
  }
}

export function NepaliPi(target, options = {}) {
  if (typeof document === 'undefined') throw new Error('NepaliPi attaches in the browser after the target field exists.');
  validateOptions(options);
  const element = resolveElement(target, 'NepaliPi target');
  if (instances.has(element)) throw new Error('NepaliPi is already attached. Use NepaliPi.get(target) to control the existing instance.');
  let config = options.dropdown === undefined ? null : dropdownConfig(options.dropdown, element);
  const core = attachNepalipi(element, options);
  let binding = null, destroyed = false, renderDepth = 0, onError = options.onError;
  const checkAlive = () => { if (destroyed) throw new Error('This NepaliPi instance has been destroyed.'); };
  const checkMutable = () => {
    checkAlive();
    if (renderDepth) throw new Error('NepaliPi mutations are not allowed inside dropdown render/cleanup callbacks. Use an event handler or a later task.');
  };
  const reportError = (error, code) => {
    if (onError) {
      try { onError(error, { code, target: element }); return; }
      catch { /* A consumer error handler must not interrupt a completed edit. */ }
    }
    console.error(`NepaliPi: ${code}. Provide onError to inspect the consumer callback failure.`);
  };
  const hooks = {
    invoke(callback) {
      renderDepth++;
      try { return callback(); }
      finally { renderDepth--; }
    },
    failed(failedBinding, error) {
      if (binding === failedBinding) binding = null;
      reportError(error, 'DROPDOWN_RENDER_FAILED');
    },
  };
  const mountDropdown = () => {
    const created = bindDropdown(config, element, core, controller, hooks);
    if (destroyed) created.destroy();
    else binding = created;
  };
  const controller = {
    target: element,
    subscribe(listener) {
      let initial = true, off = () => {};
      off = core.subscribe(state => {
        try { listener(state); }
        catch (error) {
          if (initial) throw error;
          off();
          reportError(error, 'SUBSCRIBER_FAILED');
        }
      });
      initial = false;
      return off;
    },
    getState: core.getState,
    choose(...args) { checkMutable(); return core.choose(...args); },
    highlight(...args) { checkMutable(); return core.highlight(...args); },
    open() { checkMutable(); return core.open(); },
    dismiss() { checkMutable(); return core.dismiss(); },
    getInputAttributes: core.getInputAttributes,
    getListAttributes: core.getListAttributes,
    getOptionAttributes: core.getOptionAttributes,
    getCaretRect() { checkAlive(); return getCaretRect(element); },
    enable() { return controller.update({ enabled: true }); },
    disable() { return controller.update({ enabled: false }); },
    setHints(hints) { return controller.update({ hints }); },
    update(changes) {
      checkMutable();
      validateOptions(changes);
      const nextConfig = 'dropdown' in changes ? dropdownConfig(changes.dropdown, element, config) : config;
      core.update(changes);
      if ('onError' in changes) onError = changes.onError;
      if ('dropdown' in changes) {
        binding?.destroy();
        binding = null;
        config = nextConfig;
        if (config && !destroyed) mountDropdown();
      }
      return controller;
    },
    dropdown: {
      get element() { return binding?.element ?? null; },
      open() { checkMutable(); return binding ? core.open() : false; },
      close() { checkMutable(); core.dismiss(); },
      update(changes) { return controller.update({ dropdown: changes }); },
      reposition() { checkAlive(); binding?.reposition(); },
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      try { binding?.destroy(); }
      finally { binding = null; core.destroy(); instances.delete(element); }
    },
  };
  instances.set(element, controller);
  try {
    if ('enabled' in options) core.update({ enabled: options.enabled });
    if (config) mountDropdown();
    return controller;
  } catch (error) {
    controller.destroy();
    throw error;
  }
}

NepaliPi.get = target => {
  const element = resolveElement(target, 'NepaliPi target', document, true);
  return element ? instances.get(element) ?? null : null;
};

if (typeof window !== 'undefined') {
  if (window.NepaliPi !== undefined && window.NepaliPi !== NepaliPi) throw new Error('window.NepaliPi is already defined; the existing global was preserved.');
  window.NepaliPi = NepaliPi;
}

export default NepaliPi;
