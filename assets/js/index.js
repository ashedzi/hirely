'use strict';

const body = document.querySelector('body');
const passwordInput = document.querySelector('.password');
const togglePassword = document.querySelector('.toggle-password');

togglePassword.addEventListener('click', () => {
  const isPasswordHidden = passwordInput.type === 'password';
  passwordInput.type = isPasswordHidden ? 'text' : 'password';
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});

const storedUsername = 'me@gmail.com';
const storedPassword  = 'Welcome123';

if (!localStorage.getItem('hirely_email')) {
    localStorage.setItem('hirely_email', storedUsername);
    localStorage.setItem('hirely_password', storedPassword);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    if (!form) return;

    const errorEl = document.querySelector('.error-message');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const inputUser = document.getElementById('email').value.trim();
        const inputPwd  = document.getElementById('password').value;

        const storedUser = localStorage.getItem('hirely_email');
        const storedPwd  = localStorage.getItem('hirely_password');

        if (inputUser === storedUser && inputPwd === storedPwd) {
            errorEl.style.visibility = 'hidden'; 
            window.location.href = 'home.html';
        } else {
            errorEl.textContent = '*Incorrect username or password';
            errorEl.style.visibility = 'visible';
        }
    });
});
