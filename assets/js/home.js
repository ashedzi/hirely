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