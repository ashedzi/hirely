'use strict';

const post = document.querySelector('.post-button');
const selectPost = document.querySelector('.select-post');
const textDraft = document.querySelector('textarea');
const fileInput = document.querySelector('.select-file');
const uploadsContainer = document.querySelector('.uploads-container');
const fileName = document.querySelector('.file-name');
const body = document.querySelector('body');
const posts = [];
let count = 0;

function createElements(tags, attributes = {}, textContent = '') {
    const element = document.createElement(tags);

    for (const key in attributes) {
        if (Array.isArray(attributes[key])) {
            element.setAttribute(key, attributes[key].join(' '));
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }

    if (textContent) element.textContent = textContent;

    return element;
}

function createPost() {
    const uploads = createElements('div', {class: 'uploads'});
    const userPostInfo = createElements('div', {class: 'user-post-info flex space-between align-items'});
    const userInfo = createElements('div', {class: 'user-info flex gap-8 align-items'});
    const postImageContainer = createElements('figure', {class: 'avartar'});
    const postImage = createElements('img', {src: './assets/img/avartar.jpg'});
    const postDate = createElements('div', {class: 'post-date'});
    const usersName = createElements('p', {}, 'Ashedzi Solomon');
    const date = createElements('p', {}, new Date().toDateString());
    const uploadedContent = createElements('div', {class: 'content-uploaded'});
    const postText = createElements('p', {}, textDraft.value);
    const postedImageContainer = createElements('figure');
    const postedImage = createElements('img');

    uploads.append(userPostInfo, uploadedContent);
    userPostInfo.append(userInfo, postDate);
    userInfo.append(postImageContainer, usersName);
    postImageContainer.append(postImage);
    postDate.append(date);
    uploadedContent.append(postText, postedImageContainer);
    postedImageContainer.append(postedImage);
    setImage(postedImage);
    return uploads;
}

function validatePost() {
    if(textDraft.value.trim() === '' && fileInput.files.length === 0) {
        return false;
    }
    return true;
}

function setImage(postedImage) {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            postedImage.src = event.target.result; 
        };
        reader.readAsDataURL(file);
    }
}

function clearPost() {
    textDraft.value = '';
    fileInput.value = '';
    fileName.textContent = '';
}

fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
    }
    return;
});

post.addEventListener('click', () => {
    if(!validatePost()) {
        return false;
    }
    const newPost = createPost();
    uploadsContainer.insertBefore(newPost, uploadsContainer.firstChild);
    posts.unshift(newPost);
    count++;
    clearPost();
});

/* ----------------- */
/* Third Column      */
/* ----------------- */

// Fetching users from randomuser.me API

const URL = "https://randomuser.me/api/?nat=CA&results=10";

const options = {
    methods: "GET",
    header: {
        'Content-Type': 'application/JSON; charset=UTF-8'
    },
    mode: 'cors'
}

async function getUser(endpoint) {
    try {
        const result = await fetch(endpoint, options);
        if(!result.ok) {
            throw new error(`${result.status}: ${result.statusText}`);
        }

        const data = await result.json();
        displayUser(data.results);

    } catch (error) {
        console.error(error.message);
    }
}

function displayUser(users) {
    const thirdContainer = document.querySelector('.third-column');
    
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <div class="user-card-content">
                <img src="${user.picture.medium}" alt="User Picture">
                <div class="user-data">
                    <h3>${user.name.first} ${user.name.last}</h3>
                    <p>${user.location.city}</p>
                </div>
            </div>
            <div>
                <button class="btn add-btn"><i class="fa-solid fa-plus"></i></button>
            </div>
        `;
        thirdContainer.appendChild(userCard);
    });
}

getUser(URL);
