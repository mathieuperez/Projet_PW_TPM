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

/*

router.patch('/:login/:oldStartDate/:oldTime/:oldAddress', (req, res) => {
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
    oldRenting.startDate = req.params.oldStartDate;
    oldRenting.time = req.params.oldTime;
    oldRenting.endDate = new Date().setTime(oldRenting.startDate.getTime()+oldRenting.time * 86400000);

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
});*/



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


function verifyDate(req, res, renting, next) {
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

module.exports = router;
