const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = express();

var rideSchema = mongoose.Schema({

    rideStartCity: {type: String,required: true},
    rideArrivalCity: {type: String,required: true},
    rideStart: {type: String,required: true},
    rideArrival: {type: String,required: true},
    ridePrice: {type: Number,required: true},
    rideSeat: { type: String,required: true},
    rideDate: {type: Date ,required: true},
    login: {type: String,required: true}


});

var Ride = mongoose.model('ride', rideSchema);


//Ajouter un trajet
router.post('/:login', (req, res) => {
  var ride= new Ride();
    ride.rideStartCity= req.body.rideStartCity;
    ride.rideArrivalCity= req.body.rideArrivalCity;
    ride.rideStart = req.body.rideStart;
    ride.rideArrival = req.body.rideArrival;
    ride.ridePrice = req.body.ridePrice;
    ride.rideSeat = req.body.rideSeat;
    ride.rideDate = new Date(''+ req.body.rideDate.split('/')[2] + '-' + req.body.rideDate.split('/')[1] + '-' + req.body.rideDate.split('/')[0]);
    ride.login=req.params.login;


    ride.save(function(err){
      if(err){
        res.status(400).json({success: false, message: 'Register failed.'});
      }
    res.json({
        success: true,
        message : 'offre de trajet bien ajouté!'});
    })
  });

  //Afficher les offres de trajets d'un particulier connecté
  router.get('/:login', function(req, res, next) {
    var login = req.params.login;
    Ride.find({"login": login}, function (err, rides) {
        if (err) return next(err);
        res.json(rides);
    });
});

router.get('/', function(req, res, next) {
    Ride.find(function (err, rides) {
        if (err) return next(err);
        res.json(rides);
    });
});


module.exports = router;

