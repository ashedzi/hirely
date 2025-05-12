'use strict';

const URL = "https://randomuser.me/api/?nat=CA&results=10&seed=same";

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
        console.log(data.results);

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
                <div class="user-info">
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