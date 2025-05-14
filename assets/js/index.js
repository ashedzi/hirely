'use strict';

const body = document.querySelector('body');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
  const isPasswordHidden = passwordInput.type === 'password';

  // Toggle the input type
  passwordInput.type = isPasswordHidden ? 'text' : 'password';

  // Swap the icon classes
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});

const TEST_USER = 'hirelyUser';
const TEST_PWD  = 'Welcome123';

if (!localStorage.getItem('hirely_username')) {
    localStorage.setItem('hirely_username', TEST_USER);
    localStorage.setItem('hirely_password', TEST_PWD);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    if (!form) return;

    let errorEl = document.getElementById('error-message');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.id = 'error-message';
        errorEl.style.color = 'red';
        errorEl.style.marginBottom = '1rem';
        errorEl.style.display = 'none';
        form.insertBefore(errorEl, form.firstChild);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        const inputUser = document.getElementById('email').value.trim();
        const inputPwd  = document.getElementById('password').value;

        const storedUser = localStorage.getItem('hirely_username');
        const storedPwd  = localStorage.getItem('hirely_password');

        if (inputUser === storedUser && inputPwd === storedPwd) {
            window.location.href = 'home.html';
        } else {
            errorEl.textContent = 'Incorrect username or password';
            errorEl.style.display = 'block';
        }
    });
});
