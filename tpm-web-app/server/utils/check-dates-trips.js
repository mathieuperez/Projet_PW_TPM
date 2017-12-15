const express = require('express');
const Trip = require('../schemas/trip');
const verifyauth = require('../utils/verify-auth');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

let caseone = false;
let casetwo = false;

module.exports = (req, res, trip, token, tripId, login, next) => {
    if (trip.address == null || trip.city == null || trip.country  == null || trip.price == null || trip.startDate== null
        || trip.endDate == null || trip.startArea == null || trip.arrivalArea == null || trip.time == null || login == null) {
            console.log(trip);
            res.status(422).json({success: false, message: 'Missing Arguments.'});
    }
    else {
        Trip.find({"endDate": {"$gte": trip.startDate, "$lt": trip.endDate}}).exec(function(err, trips){
            if (err) {
                res.status(500).json(
                    {
                        success: false,
                        message:'There was a problem with the database while checking if there is already a trip ending at this adress and time.'
                    }
                );
            }
            else {
                verifyauth(req, res, login, token, function () {
                    if (trips.length == 0 || trips.length == 1) {
                        if (trips.length == 1) {
                            if (trips['0']._id != tripId) {
                                res.status(409).json(
                                    {
                                        success: false,
                                        message: 'Already a trip with this address and start date.'
                                    }
                                );
                            }
                            else {
                                Trip.find({"startDate": {"$gte": trip.startDate,"$lt": trip.endDate}}).exec(function (err, trips) {
                                    if (err) {
                                        res.status(500).json(
                                            {
                                                success: false,
                                                message: 'There was a problem with the database while checking if there is already a trip starting at this adress and time.'
                                            }
                                        );
                                    }
                                    else {
                                        if (trips.length == 0) {
                                            next();
                                        }
                                        else {
                                            let i = 0;
                                            while (!caseone && i < trips.length) {
                                                if (trips[i]._id != tripId) {
                                                    caseone = true;
                                                }
                                                else {
                                                    i = i + 1;
                                                }
                                            }
                                            if (caseone) {
                                                res.status(409).json(
                                                    {
                                                        success: false,
                                                        message: 'Already a trip with this address and end date.'
                                                    }
                                                );
                                            } else {
                                                next();
                                            }
                                        }
                                    }
                                });
                            }
                        } else {
                            Trip.find({"startDate": {"$gte": trip.startDate,"$lt": trip.endDate}}).exec(function (err, trips) {
                                if (err) {
                                    res.status(500).json(
                                        {
                                            success: false,
                                            message:'There was a problem with the database while checking if there is already a trip ending at this adress and time.'
                                        }
                                    );
                                }
                                else {
                                    if (trips.length == 0) {
                                        next();
                                    }
                                    else {
                                        let j = 0;
                                        while (!casetwo && j < trips.length) {
                                            if (trips[j]._id != tripId) {
                                                casetwo = true;
                                            }
                                            else {
                                                j = j + 1;
                                            }
                                        }
                                        if (casetwo) {
                                            res.status(409).json(
                                                {
                                                    success: false,
                                                    message: 'Already a trip with this address and end date.'
                                                }
                                            );
                                        } else {
                                            next();
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        res.status(409).json(
                            {
                                success: false,
                                message: 'Already a trip with this address and start date.'
                            }
                        );
                    }
                });
            }
        });
    }
}
