const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Trip = require('../schemas/trip');
const verifyauth = require('../utils/verify-auth');
const checkdates = require('../utils/check-dates-trips');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.post('/:login', (req, res) => {
    console.log('trip');
    var trip = new Trip();
    trip.address = req.body.address;
    trip.city = req.body.city;
    trip.country = req.body.country;
    trip.price = req.body.price;
    trip.startDate = req.body.startDate;
    trip.endDate = req.body.endDate;
    trip.startArea = req.body.startArea;
    trip.arrivalArea = req.body.arrivalArea;
    trip.time = req.body.time;
    trip.description = req.body.description;
    trip.login = req.params.login;
    let token = req.headers['access-token'];

    let status;
    let success;
    let message;

    checkdates(req, res, trip, token, trip._id, trip.login, function () {
        trip.save(function (err) {
            if (err) {
                status = 401;
                success = false;
                message = 'Creating Trip failed.';
            }
            else {
                status = 200;
                success = true;
                message = 'Creating Trip success.';
            }
            res.status(status).json({success: success, message: message});
        });
    });
});

router.patch('/:login/:id', function (req, res) {
    let trip = req.body;
    let token = req.headers['access-token'];

    let login = req.params.login;
    let id = req.params.id;

    let status;
    let success;
    let message;

    checkdates(req, res, trip, token, id, login, function () {
        Trip.findOneAndUpdate({"_id": id, "login": login}, trip, { new: true }, function (err, trips) {
            if (err) {
                status = 401;
                success = false;
                message = 'Updating Trip failed.';
            }
            else {
                status = 200;
                success = true;
                message = 'Updating Trip success.';
            }
            res.status(status).json({success: success, message: message});
        });
    });
});


router.delete('/:login/:id', function(req, res, next) {
    let id = req.params.id.toString();
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Trip.remove({"_id": id, "login": login}, function(err, trip){
            if (err){
                return next(err);
            }
            else {
                res.json({success: true, message:"Trip deleted successful."});
            }
        });
    });
});

router.get('/:login', function(req, res, next) {
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Trip.find({"login": login}, function (err, trips) {
            if (err) {
                return next(err);
            }
            res.json(trips);
        });
    });
});

router.get('/', function(req, res, next) {
    Trip.find(function (err, trips) {
        if (err) {
            return next(err);
        }
        res.json(trips);
    });
});

module.exports = router;
