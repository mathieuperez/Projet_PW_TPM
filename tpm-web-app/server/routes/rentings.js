const express = require('express');
const router = express.Router();
const User = require('./UserSchema');
const Renting = require('./RentingSchema');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();

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

    if (renting.country == null || renting.address == null || renting.city  == null || renting.price == null || renting.startDate == null || renting.time == null || renting.surface == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
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
                                      console.log(err);
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
