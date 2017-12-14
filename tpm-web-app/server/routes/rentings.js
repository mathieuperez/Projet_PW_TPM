const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const Renting = require('../schemas/renting');
const verifyauth = require('../utils/verify-auth');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.post('/:login', (req, res) => {
    var renting = new Renting();
    renting.country = req.body.country;
    renting.address = req.body.address;
    renting.city = req.body.city;
    renting.price = req.body.price;
    renting.time = req.body.time;
    renting.surface = req.body.surface;
    renting.description = req.body.description;
    renting.login = req.params.login;
    let token = req.headers['access-token'];

    if (renting.country == null || renting.address == null || renting.city  == null || renting.price == null || req.body.startDate == null || renting.time == null || renting.surface == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
        renting.startDate = new Date(''+ req.body.startDate.split('/')[2] + '-' + req.body.startDate.split('/')[1] + '-' + req.body.startDate.split('/')[0]);
        renting.endDate=new Date().setTime(renting.startDate.getTime()+renting.time * 86400000);

        Renting.find({"endDate": {"$gte": renting.startDate, "$lt": renting.endDate}}).exec(function(err, rentings){
            if (err) {
                res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent ending at this adress and time.'});
            }
            else {
                verifyauth(req, res, renting.login, token, function () {
                    if (rentings.length == 0) {
                        Renting.find({"start": {"$gte": renting.start,"$lt": renting.endDate}}).exec(function (err, rentings) {
                            if (err) {
                                res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent starting at this adress and time.'});
                            }
                            else {
                                if (rentings.length == 0) {
                                    renting.save(function (err) {
                                        if (err) {
                                            res.status(401).json({success: false, message: 'Creating Rent failed.'});
                                        }
                                        else {
                                            res.status(200).json({success: true, message: 'Creating Rent successful'});
                                        }
                                    });
                                }
                                else {
                                    res.status(409).json({success: false, message: 'There is already a location with this adress and date.'});
                                }
                            }
                        });
                    }
                    else {
                        res.status(409).json({success: false,message: 'There is already a location with this adress and date.'});
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
        Renting.remove({"_id": id, "login": login}, function(err, renting){
            if (err){
                return next(err);
            }
            else {
                res.json({success: true, message:"Renting deleted successful."});
            }
        });
    });
});


router.get('/:login', function(req, res, next) {
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Renting.find({"login": login}, function (err, rentings) {
            if (err) return next(err);

            res.json(rentings);
        });
    });
});

router.get('/', function(req, res, next) {
    Renting.find(function (err, rentings) {
        if (err) return next(err);
        res.json(rentings);
    });
});

module.exports = router;
