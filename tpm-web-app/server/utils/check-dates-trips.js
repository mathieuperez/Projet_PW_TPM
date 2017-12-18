const Trip = require('../schemas/trip');
const verifyauth = require('../utils/verify-auth');

let caseone = false;
let casetwo = false;

module.exports = (req, res, trip, token, tripId, login, next) => {
    console.log("tripid = " + tripId);
    if (trip.address === undefined || trip.city === undefined || trip.country  === undefined || trip.price === undefined || trip.startDate === undefined
        || trip.endDate === undefined || trip.startArea === undefined || trip.arrivalArea === undefined || trip.time === undefined || login === undefined) {
            res.status(422).json({success: false, message: 'Missing Arguments.'});
    }
    else {
        Trip.find({"endDate": {"$gt": trip.startDate.getTime()-1, "$lt": trip.endDate.getTime()+1}, "address": trip.address}).exec(function(err, trips){
            if (err) {
                console.log(err);
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
                        console.log("0 ou 1 voyage avec meme date (end)");
                        if (trips.length === 1) {
                            console.log("1 voyage avec meme date (end)");
                            if (trips['0']._id != tripId) {
                                console.log("cas 1");
                                res.status(409).json(
                                    {
                                        success: false,
                                        message: 'Already a trip with this address and start date.'
                                    }
                                );
                            }
                            else {
                                console.log("0 voyages avec meme date (end)");
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
                                        console.log("voyages avec meme date (start)");
                                        if (trips.length === 0) {
                                            next();
                                        }
                                        else {
                                            console.log("au moins 1 voyage avec meme date (start)");
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
                                                console.log("cas 2");
                                                res.status(409).json(
                                                    {
                                                        success: false,
                                                        message: 'Already a trip with this address and end date.'
                                                    }
                                                );
                                            } else {
                                                console.log("meme voyage avec meme date (start)");
                                                next();
                                            }
                                        }
                                    }
                                });
                            }
                        } else {
                            console.log("aucun voyage avec meme date (end)");
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
                                    console.log("0 ou 1 voyage avec meme date (start)");
                                    if (trips.length === 0) {
                                        next();
                                    }
                                    else {
                                        console.log("au moins 1 voyage avec meme date (start)");
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
                                            console.log("cas 3");
                                            res.status(409).json(
                                                {
                                                    success: false,
                                                    message: 'Already a trip with this address and end date.'
                                                }
                                            );
                                        } else {
                                            console.log("aucun voyage avec meme date (start)");
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
