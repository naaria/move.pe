// Logro 1: alterna entre modo claro y oscuro y recuerda la preferencia.
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === 'dark';
  toggle.setAttribute('aria-pressed', String(isDark));
}

let saved = null;
try {
  saved = localStorage.getItem('theme');
} catch (e) {}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
});
