const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Trip = require('../schemas/trip');
const verifyauth = require('../utils/verify-auth');
const checkdates = require('../utils/check-dates-trips');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.post('/:login', (req, res) => {
    var trip = new Trip();
    trip.address = req.body.address;
    trip.city = req.body.city;
    trip.country = req.body.country;
    trip.price = req.body.price;
    trip.startDate = new Date(''+ req.body.startDate.split('/')[2] + '-' + req.body.startDate.split('/')[1] + '-' + req.body.startDate.split('/')[0]);
    trip.endDate = new Date(''+ req.body.endDate.split('/')[2] + '-' + req.body.endDate.split('/')[1] + '-' + req.body.endDate.split('/')[0]);
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
        trip.save(function (err, result) {
            if (err) {
                status = 500;
                success = false;
                message = 'Creating Trip failed.';
            }
            else {
                status = 200;
                success = true;
                message = 'Creating Trip success.';
            }
            res.status(status).json({success: success, message: message, object: result});
        });
    });
});

router.patch('/:login/:id', function (req, res) {
    let trip = req.body;
    trip.startDate = new Date(''+ trip.startDate.split('/')[2] + '-' + trip.startDate.split('/')[1] + '-' + trip.startDate.split('/')[0]);
    trip.endDate = new Date(''+ trip.endDate.split('/')[2] + '-' + trip.endDate.split('/')[1] + '-' + trip.endDate.split('/')[0]);
    let token = req.headers['access-token'];

    let login = req.params.login;
    let id = req.params.id;

    let status;
    let success;
    let message;

    checkdates(req, res, trip, token, id, login, function () {
        Trip.findOneAndUpdate({"_id": id, "login": login}, trip, { new: true }, function (err, trips) {
            if (err) {
                status = 500;
                success = false;
                message = 'Updating Trip failed.';
            }
            else {
                status = 200;
                success = true;
                message = 'Updating Trip success.';
            }
            res.status(status).json({success: success, message: message, object: trips});
        });
    });
});

router.delete('/:login/:id', function(req, res, next) {
    let id = req.params.id.toString();
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Trip.findOneAndRemove({"_id": id}, function(err, trips){
            if (err){
                res.status(500).json({success: false, message: 'Deleting Trip failed.'});
            }
            else {
                if (trips) {
                    res.status(200).json({success: true, message: 'Deleting Trip successful'});
                }
                else {
                    res.status(409).json({success: false,message: 'There is no Trip with this id.'});
                }
            }
        });
    });
});

router.get('/:login', function(req, res, next) {
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Trip.find({"login": login}, function (err, trips) {
            if (err){
                res.status(500).json({success: false, message: 'Get Trips failed.'});
            }
            else {
                res.status(200).json({success: true, message: 'Get Trips successful', trips: trips});
            }
        });
    });
});

router.get('/', function(req, res, next) {
    Trip.find(function (err, trips) {
        if (err){
            res.status(500).json({success: false, message: 'Get Trips failed.'});
        }
        else {
            res.status(200).json({success: true, message: 'Get Trips successful', trips: trips});
        }
    });
});

module.exports = router;
