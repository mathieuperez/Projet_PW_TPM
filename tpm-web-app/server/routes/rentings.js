const express = require('express');
const router = express.Router();
const User = require('./UserSchema');
const Renting = require('./RentingSchema');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();
app.set('superSecret', "12345"); // secret variable

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

    if (renting.country == null || renting.address == null || renting.city  == null || renting.price == null || req.body.startDate == null || renting.time == null || renting.surface == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
        verifyAuthentification(req, res, renting.login, function () {
            renting.startDate = new Date(''+ req.body.startDate.split('/')[2] + '-' + req.body.startDate.split('/')[1] + '-' + req.body.startDate.split('/')[0]);
            renting.endDate=new Date().setTime(renting.startDate.getTime()+renting.time * 86400000);

            verifyDate(req, res, renting, function(){
                renting.save(function (err) {
                    if (err) {
                        res.status(401).json({success: false, message: 'Creating Rent failed.'});
                    }
                    else {
                        res.status(200).json({success: true, message: 'Creating Rent successful'});
                    }
                });
            });

        });
    }
});



router.patch('/:login/:oldStartDate/:oldAddress', (req, res) => {

    var renting = new Renting();
    renting.country = req.body.country;
    renting.address = req.body.address;
    renting.city = req.body.city;
    renting.price = req.body.price;
    renting.time = req.body.time;
    renting.surface = req.body.surface;
    renting.description = req.body.description;
    renting.login = req.params.login;
    var oldRenting=new Renting();
    oldRenting.address = req.params.oldAddress;
    oldRenting.startDate = req.params.oldStartDate; //!!!!!!!! FORMAT: yyyy-mm-dd

    if (renting.country == null || renting.address == null || renting.city  == null || renting.price == null || req.body.startDate == null || renting.time == null || renting.surface == null) {
        console.log("missing arguments patch");
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
        verifyAuthentification(req, res, renting.login, function () {
            renting.startDate = new Date(''+ req.body.startDate.split('/')[2] + '-' + req.body.startDate.split('/')[1] + '-' + req.body.startDate.split('/')[0]);
            renting.endDate=new Date().setTime(renting.startDate.getTime()+renting.time * 86400000);

/*
            console.log("--------------------------------------------------"+renting.startDate);
            console.log("--------------------------------------------------"+oldRenting.startDate.toISOString()+"   :   "+oldRenting.startDate);
            console.log("--------------------------------------------------"+oldRenting.startDate.toDateString());

*/
            Renting.find({"startDate": oldRenting.startDate.toISOString(),"address": oldRenting.address}).exec(function (err, rentings) {
                if (err) {
                    res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent with this address and starting date.'});
                }
                else {
                    if (rentings.length == 1) {
                        oldRenting.country=rentings[0].country;
                        oldRenting.city=rentings[0].city;
                        oldRenting.price=rentings[0].price;
                        oldRenting.time=rentings[0].time;
                        oldRenting.surface=rentings[0].surface;
                        oldRenting.description=rentings[0].description;
                        oldRenting.login=rentings[0].login;
                        oldRenting.endDate=rentings[0].endDate;

                        findAndDeleteRent(req, res, oldRenting, function(){

                            verifyDate(req, res, renting, function(){

                                renting.save(function (err) {
                                    if (err) {
                                        res.status(401).json({success: false, message: 'Creating Rent failed.'});
                                    }
                                    else {
                                        res.status(200).json({success: true, message: 'Creating Rent successful'});
                                    }
                                });

                            });

                        });
                    }
                    else {
                        res.status(409).json({success: false,message: 'There is no rent with this address and starting date.'});
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
                console.log("No token provided");
                res.status(401).send({success: false,message: 'No token provided.'});
            }
        }
    });

}


function verifyDate(req, res, renting, next) {
    console.log("                      pppppppp");
    Renting.find({"endDate": {"$gte": renting.startDate.getTime()-1, "$lt": renting.endDate.getTime()+1}}).exec(function(err, rentings){
        if (err) {
            res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a rent ending at this address and time.'});
        }
        else {
            if (rentings.length == 0) {
                Renting.find({"startDate": {"$gte": renting.startDate.getTime()-1, "$lt": renting.endDate.getTime()+1}}).exec(function (err, rentings) {
                    if (err) {
                        res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent starting at this address and time.'});
                    }
                    else {
                        if (rentings.length == 0) {
                            Renting.find({"startDate": {"$lt": renting.startDate.getTime()+1},"endDate": {"$gt": renting.endDate.getTime()-1}}).exec(function (err, rentings) {
                                if (err) {
                                    res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent starting at this address and time.'});
                                }
                                else {

                                    if (rentings.length == 0) {
                                        next();
                                    }
                                    else {
                                        res.status(409).json({success: false,message: 'There is already a location with this address and date.'});
                                    }

                                }
                            });
                        }
                        else {
                            res.status(409).json({success: false,message: 'There is already a location with this address and date.'});
                        }

                    }
                });
            }
            else {
                res.status(409).json({success: false,message: 'There is already a location with this address and date.'});
            }
        }
    });
}



function findAndDeleteRent(req, res, renting, next) {

    Renting.findOneAndRemove({"startDate": renting.startDate,"address": renting.address}).exec(function (err, rentings) {
        if (err) {
            res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a rent with this address and starting date.'});
        }
        else {
            if (rentings) {
                next();
            }
            else {
                res.status(409).json({success: false,message: 'There is no rent with this address and starting date.'});
            }
        }
    });

}


module.exports = router;
