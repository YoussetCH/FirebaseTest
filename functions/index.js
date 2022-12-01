const functions = require('firebase-functions');
const firebaseAdmin = require('firebase-admin');
const express = require('express');

const app = express();
const firebaseApp = firebaseAdmin.initializeApp();

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

const appCheckVerification = async (req, res, next) => {
    if (next.app == undefined) {
        res.status(412);
        return next('The function must be called from an App Check verified app.');
    }

    const appCheckToken = req.header('X-Firebase-AppCheck');

    if (!appCheckToken) {
        res.status(401);
        return next('Unauthorized');
    }

    try {
        const appCheckClaims = await firebaseAdmin.appCheck().verifyToken(appCheckToken);
        // If verifyToken() succeeds, continue with the next middleware
        // function in the stack.
        return next();
    } catch (err) {
        res.status(401);
        return next('Unauthorized');
    }
}

app.get('/api', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.json({bongs: 'BONG '.repeat(hours)});
});

app.get('/api/checkAuth', [appCheckVerification], (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.json({bongs: 'BONG '.repeat(hours)});
});

app.get('/api/people', (req, res) => {
    res.json(people);
});

exports.app = functions.https.onRequest(app);