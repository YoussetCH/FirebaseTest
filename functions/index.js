const functions = require('firebase-functions');
const express = require('express');
const app = express();

const people = [
    {
        name: "Hannah Rickard",
        number: "06-51-99-56-83",
        id: 1
    },
    {
        name: "Hyun Namkoong",
        number: "10987654",
        id: 2
    },
    {
        name: "Courtney Martinez",
        number: "3691215",
        id: 3
    }
];

app.get('/api', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.json({bongs: 'BONG '.repeat(hours)});
});

app.get('/api/people', (req, res) => {
    res.json(people);
});

exports.app = functions.https.onRequest(app);