const express = require('express');
const router = express.Router();

const users = require('./users');
const rentings = require('./rentings');
const trajets = require('./trajets');

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.use('/users', users);
router.use('/rentings', rentings);
router.use('/trajets', trajets);

// Define the home page route
router.get('/', function(req, res) {
    res.json('home page');
});

module.exports = router;
