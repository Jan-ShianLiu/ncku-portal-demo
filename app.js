'use strict';
// Purely local demonstration. No requests, cookies, logging or credential storage.
document.querySelectorAll('[data-demo-link], [data-forgot]').forEach(control => {
  control.addEventListener('click', event => event.preventDefault());
});
const toggle = document.querySelector('.password-toggle');
if (toggle) toggle.addEventListener('click', () => {
  const password = document.querySelector('#password');
  const visible = password.type === 'password';
  password.type = visible ? 'text' : 'password';
  toggle.setAttribute('aria-pressed', String(visible));
  toggle.setAttribute('aria-label', visible ? '隱藏密碼' : '顯示密碼');
});
const form = document.querySelector('#demo-login');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    // Do not read entered values. Clear the fields immediately.
    form.reset();
    document.querySelector('#password').type = 'password';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-label', '顯示密碼');
    window.location.href = 'menu.html';
  });
  window.addEventListener('pagehide', () => form.reset());
}
