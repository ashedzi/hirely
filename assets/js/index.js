'use strict';

const body = document.querySelector('body');

function setBackGroundImage(img) {
    body.style.background = `#18171f url(${img}) center center / cover no-repeat`;
}

function getBackGroundImage() {
    const URL = 'https://unsplash.com/photos/a-pink-towel-hanging-from-a-window-with-two-black-shutters-FhzljWO6caw'
    fetch(URL) 
        .then(response => {
            console.log(`status: ${response.status}`);
            setBackGroundImage(URL);
            console.log('Asynchronous task completed');
        })
        .catch(error => {
            console.log(error.message);
        });
}

getBackGroundImage();


const URL_USERS = "https://randomuser.me/api/?nat=CA&results=10&seed=same";

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/JSON; charset=UTF-8'
    },
    mode: 'cors'
};

fetch(URL_USERS, options)
     .then(response => response.json())
     .then(json => json.results)
     .then(results => {
         console.log(results);

     })
     .catch(error => console.error(error));


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
