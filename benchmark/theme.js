// Page appearance only. Recorded evidence, engine state and storage are untouched.
const choices = [...document.querySelectorAll('[data-theme-choice]')];
for (const button of choices) {
  button.addEventListener('click', () => {
    document.documentElement.dataset.theme = button.dataset.themeChoice;
    for (const choice of choices) choice.setAttribute('aria-pressed', String(choice === button));
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--page').trim();
  });
}
