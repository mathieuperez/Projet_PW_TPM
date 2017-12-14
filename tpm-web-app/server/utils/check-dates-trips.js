const express = require('express');
const Trip = require('../schemas/trip');
const verifyauth = require('../utils/verify-auth');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = (req, res, trip, token, tripId, next) => {
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
            verifyauth(req, res, trip.login, token, function () {
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
                                        trips.forEach(element => {
                                            if (element._id != tripId) {
                                                res.status(409).json(
                                                    {
                                                        success: false,
                                                        message: 'Already a trip with this address and end date.'
                                                    }
                                                );
                                            }
                                        });
                                        next();
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
                                    trips.forEach(element => {
                                        if (element._id != tripId) {
                                            res.status(409).json(
                                                {
                                                    success: false,
                                                    message: 'Already a trip with this address and end date.'
                                                }
                                            );
                                        }
                                    });
                                    next();
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
