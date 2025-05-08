'use strict';

const URL = "https://randomuser.me/api/?nat=CA&results=10&seed=same";

const options = {
    method: "GET",
    headers: {
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
            <img src="${user.picture.small}" alt="User Picture">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.occupation}</p>
        `;
        thirdContainer.appendChild(userCard);
    });
}

getUser(URL);