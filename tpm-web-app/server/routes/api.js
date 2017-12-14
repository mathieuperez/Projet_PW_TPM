const express = require('express');
const router = express.Router();

const users = require('./users');
const rentings = require('./rentings');
const rides = require('./rides');
const trips = require('./trips');

router.use('/users', users);
router.use('/rentings', rentings);
router.use('/rides', rides);
router.use('/trips', trips);


// Define the home page route
router.get('/', function(req, res) {
    res.json('home page');
});

module.exports = router;
