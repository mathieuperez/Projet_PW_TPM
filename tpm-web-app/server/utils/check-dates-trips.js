const Trip = require('../schemas/trip');
const verifyauth = require('../utils/verify-auth');

let caseone = false;
let casetwo = false;

module.exports = (req, res, trip, token, tripId, login, next) => {
    if (trip.address === undefined || trip.city === undefined || trip.country  === undefined || trip.price === undefined || trip.startDate === undefined
        || trip.endDate === undefined || trip.startArea === undefined || trip.arrivalArea === undefined || trip.time === undefined || login === undefined) {
            res.status(422).json({success: false, message: 'Missing Arguments.'});
    }
    else {
        Trip.find({"endDate": {"$gt": trip.startDate.getTime()-1, "$lt": trip.endDate.getTime()+1}, "address": trip.address}).exec(function(err, trips){
            if (err) {
                res.status(500).json(
                    {
                        success: false,
                        message:'There was a problem with the database while checking if there is already a trip ending at this address and time.'
                    }
                );
            }
            else {
                verifyauth(req, res, login, token, function () {
                    if (trips.length === 0 || trips.length === 1) {
                        if (trips.length === 1) {
                            if (trips['0']._id != tripId) {
                                res.status(409).json(
                                    {
                                        success: false,
                                        message: 'Already a trip with this address and start date.'
                                    }
                                );
                            }
                            else {
                                Trip.find({"startDate": {"$gt": trip.startDate.getTime()-1,"$lt": trip.endDate.getTime()+1},"address": trip.address}).exec(function (err, trips) {
                                    if (err) {
                                        res.status(500).json(
                                            {
                                                success: false,
                                                message: 'There was a problem with the database while checking if there is already a trip starting at this address and time.'
                                            }
                                        );
                                    }
                                    else {
                                        if (trips.length === 0) {
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
                            Trip.find({"startDate": {"$gt": trip.startDate.getTime()-1,"$lt": trip.endDate.getTime()+1}, "address": trip.address}).exec(function (err, trips) {
                                if (err) {
                                    res.status(500).json(
                                        {
                                            success: false,
                                            message:'There was a problem with the database while checking if there is already a trip ending at this address and time.'
                                        }
                                    );
                                }
                                else {
                                    if (trips.length === 0) {
                                        next();
                                    }
                                    else {
                                        let i = 0;
                                        while (!casetwo && i < trips.length) {
                                            if (trips[i]._id != tripId) {
                                                casetwo = true;
                                            }
                                            else {
                                                i = i + 1;
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
};
