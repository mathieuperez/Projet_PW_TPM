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

    verifyauth(req, res, renting.login, token, function () {
        if (renting.country == null || renting.address == null || renting.city  == null || renting.price == null || req.body.startDate == null || renting.time == null || renting.surface == null) {
            res.status(422).json({success: false, message:'Missing Arguments.'});
        }
        else {
            renting.startDate = new Date(''+ req.body.startDate.split('/')[2] + '-' + req.body.startDate.split('/')[1] + '-' + req.body.startDate.split('/')[0]);
            renting.endDate=new Date().setTime(renting.startDate.getTime()+renting.time * 86400000);
            var dateProblem=0;

            verifyDate(req, res, renting, dateProblem, function(){
                if(dateProblem==0){
                    renting.save(function (err, result) {
                        if (err) {
                            res.status(401).json({success: false, message: 'Creating Rent failed.'});
                        }
                        else {
                            res.status(200).json({success: true, message: 'Creating Rent successful', renting: result});
                        }
                    });
                }
                else{
                    res.status(409).json({success: false,message: 'There is already a rent with this address and date.'});
                }
            });
        }
    });
});



router.patch('/:login/:id', (req, res) => {
    var oldRenting=new Renting();
    oldRenting.id = req.params.id;
    let token = req.headers['access-token'];
    var renting = new Renting();
    renting.login = req.params.login;
    renting.country = req.body.country;
    renting.address = req.body.address;
    renting.city = req.body.city;
    renting.price = req.body.price;
    renting.time = req.body.time;
    renting.surface = req.body.surface;
    renting.description = req.body.description;

    verifyauth(req, res, renting.login, token, function () {
        if (renting.country == null || renting.address == null || renting.city  == null || renting.price == null || req.body.startDate == null || renting.time == null || renting.surface == null) {
            res.status(422).json({success: false, message:'Missing Arguments.'});
        }
        else {
            renting.startDate = new Date(''+ req.body.startDate.split('/')[2] + '-' + req.body.startDate.split('/')[1] + '-' + req.body.startDate.split('/')[0]);
            renting.endDate=new Date().setTime(renting.startDate.getTime()+renting.time * 86400000);

            Renting.findById(req.params.id, function (err, rentings) {
                if (err) {
                    res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent with this address and starting date.'});
                }
                else {
                    oldRenting.address = rentings.address;
                    oldRenting.startDate = rentings.startDate;
                    oldRenting.endDate = rentings.endDate;

                    var dateProblem=0
                    verifyDate(req, res, renting, dateProblem, function(){
                        if (err) {
                            res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent with this address and starting date.'});
                        }
                        else {
                            if (dateProblem == 0){
                                Renting.findOneAndUpdate( {"_id": req.params.id}, {$set: {"country": renting.country, "address": renting.address, "city": renting.city, "price": renting.price,
                                    "time": renting.time, "surface": renting.surface, "description": renting.description, "startDate": renting.startDate, "endDate": renting.endDate}}, function (err, rent) {
                                    if (err) {
                                        res.status(500).json({success: false, message: 'Rent modification failed.'});
                                    }
                                    else {
                                        res.status(200).json({success: true, message: 'Rent modification successful'});
                                    }
                                });
                            }
                            else if (dateProblem > 1){
                                res.status(409).json({success: false, message: 'There is already a Rent with this address and date.'});
                            }
                            else if (dateProblem == 1) {
                                let same=false;
                                compareDate(renting, oldRenting, same, function(){
                                    if(same==true){
                                        Renting.findOneAndUpdate( {"_id": req.params.id}, {"country": renting.country, "address": renting.address, "city": renting.city, "price": renting.price,
                                            "time": renting.time, "surface": renting.surface, "description": renting.description, "startDate": renting.startDate, "endDate": renting.endDate}, function (err, rent) {
                                            if (err) {
                                                res.status(500).json({success: false, message: 'Rent modification failed.'});
                                            }
                                            else {
                                                res.status(200).json({success: true, message: 'Rent modification successful'});
                                            }
                                        });
                                    }
                                    else{
                                        res.status(409).json({success: false, message: 'There is already a Rent with this address and date.'});
                                    }

                                });
                            }
                        }
                    });
                }
            });
        }

    });
});



router.delete('/:login/:id', function(req, res, next) {
    let id = req.params.id;
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Renting.findOneAndRemove({"_id": id}, function(err, rentings){
            if (err){
                res.status(401).json({success: false, message: 'Deleting Rent failed.'});
            }
            else {
                if (rentings) {
                    res.status(200).json({success: true, message: 'Deleting Rent successful'});
                }
                else {
                    res.status(409).json({success: false,message: 'There is no rent with this id.'});
                }
            }
        });
    });
});


router.get('/:login', function(req, res, next) {
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Renting.find({"login": login}, function (err, rentings) {
            if (err){
                res.status(401).json({success: false, message: 'Get Rentings failed.'});
            }
            else {
                res.status(200).json({success: true, message: 'Get Rentings successful', rentings: rentings});
            }
        });
    });
});

router.get('/', function(req, res, next) {
    Renting.find(function (err, rentings) {
        if (err){
            res.status(401).json({success: false, message: 'Get Rentings failed.'});
        }
        else {
            res.status(200).json({success: true, message: 'Get Rentings successful', rentings: rentings});
        }
    });
});


function verifyDate(req, res, renting, dateProblem, next) {
    Renting.find({"endDate": {"$gt": renting.startDate.getTime()-1, "$lt": renting.endDate.getTime()+1}, "address": renting.address, "login": renting.login}).exec(function(err, rentings){
        if (err) {
            res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent ending at this address and time.'});
        }
        else {
            if (rentings.length > 0) {
                dateProblem+=rentings.length;
            }
            Renting.find({"startDate": {"$gt": renting.startDate.getTime()-1, "$lt": renting.endDate.getTime()+1}, "address": renting.address, "login": renting.login}).exec(function (err, rentings) {
                if (err) {
                    res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent starting at this address and time.'});
                }
                else {
                    if (rentings.length> 0) {
                        dateProblem+=rentings.length;
                    }
                    Renting.find({"startDate": {"$lt": renting.startDate.getTime()+1},"endDate": {"$gt": renting.endDate.getTime()-1}, "address": renting.address, "login": renting.login}).exec(function (err, rentings) {
                        if (err) {
                            res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent starting at this address and time.'});
                        }
                        else {

                            if (rentings.length > 0) {
                                dateProblem+=rentings.length;
                            }
                            if(dateProblem==0){
                                next();
                            }
                            else {
                                res.status(409).json({success: false,message: 'There is already a location with this address and date.'});
                            }
                        }
                    });
                }
            });
        }
    });
}



function compareDate(renting, oldRenting, same, next) {
    if(renting.address==oldRenting.address){
        if( ((renting.endDate.getTime()) > (oldRenting.startDate.getTime()-1)) && ((renting.endDate.getTime()) < (oldRenting.endDate.getTime()+1))){
            same=true;
            next()
        }
        else if( ((renting.startDate.getTime()) > (oldRenting.startDate.getTime()-1)) && ((renting.startDate.getTime()) < (oldRenting.endDate.getTime()+1))){
            same=true;
            next()
        }
        else if( ((renting.startDate.getTime()) < (oldRenting.startDate.getTime())) && ((renting.endDate.getTime()) > (oldRenting.endDate.getTime()))){
            same=true;
            next()
        }
        else{
            next();
        }

    }
    else{
        next();
    }
}


module.exports = router;
