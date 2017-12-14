const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../schemas/user');
const Ride = require('../schemas/ride');
const verifyauth = require('../utils/verify-auth');

var app = express();
app.set('superSecret', "12345"); // secret variable


//Ajouter un trajet
router.post('/:login', (req, res) => {
  var ride= new Ride();
    ride.rideStartCity= req.body.rideStartCity;
    ride.rideArrivalCity= req.body.rideArrivalCity;
    ride.rideStart = req.body.rideStart;
    ride.rideArrival = req.body.rideArrival;
    ride.ridePrice = req.body.ridePrice;
    ride.rideSeat = req.body.rideSeat;
    ride.rideStartTime=req.body.rideStartTime;
    ride.rideArrivalTime=req.body.rideArrivalTime;
    ride.rideConveyance=req.body.rideConveyance;
    ride.rideDate = new Date(''+ req.body.rideDate.split('/')[2] + '-' + req.body.rideDate.split('/')[1] + '-' + req.body.rideDate.split('/')[0]+"");
    ride.login=req.params.login;
    let token = req.headers['access-token'];
    console.log(ride.rideDate);
    if (ride.rideStartCity == null || ride.rideArrivalCity == null || ride.rideStart  == null || ride.rideArrival == null || ride.ridePrice== null || ride.rideSeat == null || ride.rideSeat == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {

        Ride.find({"date":ride.rideDate,"Hour":ride.rideStartTime}).exec(function(err, rides){
            if (err) {
                res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent ending at this adress and time.'});
            }
            else {
                verifyauth(req, res, ride.login, token, function () {

                    if (rides.length == 0) {
                        Ride.find({"date":ride.rideDate,"Hour":ride.rideStartTime}).exec(function (err, rentings) {
                            if (err) {
                                res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent starting at this adress and time.'});
                            }
                            else {
                                if (rides.length == 0) {
                                    ride.save(function (err) {
                                        if (err) {
                                            res.status(401).json({success: false, message: 'Creating Rent failed.'});
                                        }
                                        else {
                                            res.status(200).json({success: true, message: 'Creating Rent successful'});
                                        }
                                    });
                                }
                                else {
                                    res.status(409).json({success: false, message: 'There is already a ride with this date and hour.'});
                                }
                            }
                        });
                    }
                    else {
                        res.status(409).json({success: false,message: 'There is already a ride with this date and hour.'});
                    }
                });
            }
        });
    }
});

router.delete('/:login/:id', function(req, res, next) {
    let id = req.params.id.toString();
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Ride.remove({"_id": id, "login": login}, function(err, ride){
            if (err){
                return next(err);
            }
            else {
                res.json({success: true, message:"Ride deleted successful."});
            }
        });
    });
});


  //Afficher les offres de trajets d'un particulier connecté
  router.get('/:login', function(req, res, next) {
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Ride.find({"login": login}, function (err, rides) {
            if (err) return next(err);
            res.json(rides);
        });
    });
});

router.get('/', function(req, res, next) {
    Ride.find(function (err, rides) {
        if (err) return next(err);
        res.json(rides);
    });
});


function verifyAuthentification(req, res, login, next) {

    login="bisounours";
    User.findOne().where('login').equals(login).exec(function(err, users){
        if (err) {
            res.status(500).json({success: false, message:'There was a problem with the database while checking if the login already exists.'});
        }
        else {
            var token = users.token;
            if (token) {
                jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                    if (err) {
                        res.status(401).json({success: false, message: 'Failed to authenticate token.'});
                    }
                    else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                res.status(401).send({success: false,message: 'No token provided.'});
            }
        }
    });

}

module.exports = router;

