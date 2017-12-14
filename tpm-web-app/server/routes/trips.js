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

    if (trip.address == null || trip.city == null || trip.country  == null || trip.price == null || trip.startDate== null
        || trip.endDate == null || trip.startArea == null || trip.arrivalArea == null || trip.time == null || trip.login == null) {
        res.status(422).json({success: false, message: 'Missing Arguments.'});
    }
    else {
        Trip.find({"endDate": {"$gte": trip.startDate, "$lt": trip.endDate}}).exec(function(err, trips){
            if (err) {
                res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a trip ending at this adress and time.'});
            }
            else {
                verifyauth(req, res, trip.login, token, function () {
                    if (trips.length == 0) {
                        Trip.find({"startDate": {"$gte": trip.startDate,"$lt": trip.endDate}}).exec(function (err, trips) {
                            if (err) {
                                res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent starting at this adress and time.'});
                            }
                            else {
                                if (trips.length == 0) {
                                    trip.save(function (err) {
                                        if (err) {
                                            res.status(401).json({success: false, message: 'Creating Trip failed.'});
                                        }
                                        else {
                                            res.status(200).json({success: true, message: 'Creating Trip successful'});
                                        }
                                    });
                                }
                                else {
                                    res.status(409).json({success: false, message: 'There is already a trip with this address and date.'});
                                }
                            }
                        });
                    }
                    else {
                        res.status(409).json({success: false,message: 'There is already a trip with this address and date.'});
                    }
                });
            }
        });
    }
});

router.patch('/:login/:id', function (req, res) {
    let trip = req.body;
    let token = req.headers['access-token'];

    let login = req.params.login;
    let id = req.params.id;
    checkdates(req, res, trip, token, id, function () {
        Trip.findOneAndUpdate({"_id": id, "login": login}, trip, { new: true }, function (err, trips) {
            if (err) {
                res.status(401).json({success: false, message: 'Updating Trip failed.'});
            }
            else {
                res.status(200).json({success: true, message: 'Updating Trip successful'});
            }
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
