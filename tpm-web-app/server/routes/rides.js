const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('../schemas/user');
const Ride = require('../schemas/ride');
const checkDatesHours = require('../utils/check-DateHour-rides');
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
    let a = new Date(''+ req.body.rideDateStart.split('/')[2] + '-' + req.body.rideDateStart.split('/')[1] + '-' + req.body.rideDateStart.split('/')[0]+"");
    let b = new Date(''+ req.body.rideDateArrival.split('/')[2] + '-' + req.body.rideDateArrival.split('/')[1] + '-' + req.body.rideDateArrival.split('/')[0]+"");

    ride.login=req.params.login;
    let hourStart = req.body.rideStartTime;
    hourStart = hourStart.split(':')[0]*3600 + hourStart.split(':')[1]*60 ;
    let hourArrival = req.body.rideArrivalTime;
    hourArrival = hourArrival.split(':')[0]*3600 + hourArrival.split(':')[1]*60 ;
    console.log(hourStart);
    ride.rideDateStart=new Date().setTime(a.getTime()+(hourStart*1000));
    ride.rideDateArrival=new Date().setTime(b.getTime()+(hourArrival*1000));
    console.log(ride.rideDateArrival);

    let token = req.headers['access-token'];
    console.log("<<<<<<<laa");
    
    console.log("ride"+ride);

    let status;
    let success;
    let message;

     checkDatesHours(req, res, ride, token, ride._id, ride.login, function () {
        ride.save(function (err) {
            if (err) {
                status = 401;
                success = false;
                message = 'Creating Ride failed.';
            }
            else {
                status = 200;
                success = true;
                message = 'Creating Ride success.';
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



module.exports = router;

