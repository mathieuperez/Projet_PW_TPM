const Ride = require('../schemas/ride');
const verifyauth = require('../utils/verify-auth');

let caseone = false;
let casetwo = false;

module.exports = (req, res, ride, token, rideId, login, next) => {
     if(ride.rideStartCity === undefined || ride.rideArrivalCity === undefined|| ride.rideStart === undefined || ride.rideArrival === undefined ||
      ride.ridePrice === undefined || ride.rideSeat === undefined || ride.rideDateStart === undefined || ride.rideDateArrival === undefined ||
      ride.rideStartTime === undefined || ride.rideArrivalTime === undefined || ride.rideConveyance === undefined){
            console.log(ride);
            res.status(422).json({success: false, message: 'Missing Arguments.'});
    }
    else {
        Ride.find({"rideDateArrival": {"$gte": ride.rideDateStart, "$lt": ride.rideDateArrival}}).exec(function(err, rides){
            if (err) {
                console.log("<<<<<<<<<<<<<");
                res.status(500).json(
                    {
                        success: false,
                        message:'There was a problem with the database while checking if there is already a ride ending at this adress and time.'
                    }
                );
            }
            else {
                verifyauth(req, res, login, token, function () {
                    if (rides.length === 0 || rides.length === 1) {
                        if (rides.length === 1) {
                            if (rides['0']._id != rideId) {
                                next();
                            }
                            else {
                                Ride.find({"rideDateStart": {"$gte": ride.rideDateStart,"$lt": ride.rideDateArrival}}).exec(function (err, rides) {
                                    if (err) {
                console.log("<<<<<<<<<<<<<22222");
                                        res.status(500).json(
                                            {
                                                success: false,
                                                message: 'There was a problem with the database while checking if there is already a ride starting at this adress and time.'
                                            }
                                        );
                                    }
                                    else {
                                        if (rides.length === 0) {
                                            next();
                                        }
                                        else {
                                            let i = 0;
                                            while (!caseone && i < rides.length) {
                                                if (rides[i]._id != rideId) {
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
                                                        message: 'Already a ride with this address and end date.'
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
                            Ride.find({"rideDateStart": {"$gte": ride.rideDateStart,"$lt": ride.rideDateArrival}}).exec(function (err, rides) {
                                if (err) {

                console.log("<<<<<<<<<<<<<3333333");
                                    res.status(500).json(
                                        {
                                            success: false,
                                            message:'There was a problem with the database while checking if there is already a ride ending at this adress and time.'
                                        }
                                    );
                                }
                                else {
                                    if (rides.length === 0) {
                                        next();
                                    }
                                    else {
                                        let j = 0;
                                        while (!casetwo && j < rides.length) {
                                            if (rides[j]._id != rideId) {
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
                                                    message: 'Already a ride with this address and end date.'
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
                        next();
                    }
                });
            }
        });
    }
};
