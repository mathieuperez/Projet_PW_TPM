const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();

   var LocationsSchema = mongoose.Schema({
    adress: {type: String,required: true},
    country: { type: String,required: true},
    city: { type: String,required: true},
    price: {type: Number,required: true},
    startDate: {type: Date,required: true},
    time: {type: Number,required: true},
    surface: {type: Number,required: true},
    description: { type: String},
    endDate: {type: Date,required: true},
    login: {type: String,required: true}
    });


var Locations = mongoose.model('Locations', LocationsSchema);


router.post('/locations/:login', (req, res) => {
    var location = new Locations();
    location.country = req.body.country;
    location.adress = req.body.adress;
    location.city = req.body.city;
    location.price = req.body.price;
    location.startDate = req.body.startDate;
    location.time = req.body.time;
    location.surface = req.body.surface;
    location.description = req.body.description;
    location.login = req.params.login;
    location.endDate=new Date().setDate(location.startDate+location.time);

    if (location.country == null || location.adress == null || location.city  == null || location.price == null || location.startDate == null || location.time == null || location.surface == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
        Locations.find({"endDate": {"$gte": location.startDate, "$lt": location.endDate}}).exec(function(err, locations){
            if (err) {
                res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent ending at this adress and time.'});
            }
            else {
                if(locations.length==0){
                    Locations.find({"start": {"$gte": location.start, "$lt": location.endDate}}).exec(function(err, locations){
                        if (err) {
                            res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent starting at this adress and time.'});
                        }
                        else {
                            if(locations.length==0){
                                location.save(function(err){
                                  if(err){
                                    res.status(401).json({success: false, message: 'Creating Rent failed.'});
                                  }
                                  else{
                                    res.status(200).json({success: true, message:'Creating Rent successful'});
                                  }
                                });
                            }
                            else{
                                res.status(409).json({success: false, message: 'There is already a location with this adress and date.'});
                            }
                        }
                    });
                }
                else{
                    res.status(409).json({success: false, message: 'There is already a location with this adress and date.'});
                }
            }
        });
    }
});


router.get('/', function(req, res, next) {
    var location = new Locations();
  location.find(function (err, locations) {
    if (err) return next(err);
    res.json(location);
  });
});

module.exports = router;
