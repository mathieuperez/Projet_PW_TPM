const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./UserSchema');
const jwt = require('jsonwebtoken'); 

var app = express();

app.set('superSecret', "12345");

var RentingsSchema = mongoose.Schema({
    address: {type: String,required: true},
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


var Renting = mongoose.model('Renting', RentingsSchema);

router.post('/:login', (req, res) => {
    var renting = new Renting();
    renting.country = req.body.country;
    renting.address = req.body.address;
    renting.city = req.body.city;
    renting.price = req.body.price;
    renting.startDate = new Date(''+ req.body.startDate.split('/')[2] + '-' + req.body.startDate.split('/')[1] + '-' + req.body.startDate.split('/')[0]);
    renting.time = req.body.time;
    renting.surface = req.body.surface;
    renting.description = req.body.description;
    renting.login = req.params.login;
    renting.endDate=new Date().setTime(renting.startDate.getTime()+renting.time * 86400000);



    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    ",req.params.login);



    if (renting.country == null || renting.address == null || renting.city  == null || renting.price == null || renting.startDate == null || renting.time == null || renting.surface == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {

        verifyAuthentification(req, res, renting.login, function () {
            Renting.find({"endDate": {"$gte": renting.startDate, "$lt": renting.endDate}}).exec(function(err, rentings){
                if (err) {
                    res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent ending at this adress and time.'});
                }
                else {
                    if(rentings.length==0){
                        Renting.find({"start": {"$gte": renting.start, "$lt": renting.endDate}}).exec(function(err, rentings){
                            if (err) {
                                res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent starting at this adress and time.'});
                            }
                            else {
                                if(rentings.length==0){
                                    renting.save(function(err){
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
        });
    }
});


router.get('/:login', function(req, res, next) {
    var login = req.params.login;
    Renting.find({"login": login}, function (err, rentings) {
        if (err) return next(err);
        res.json(rentings);
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
                        res.success(401).json({success: false, message: 'Failed to authenticate token.'});
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