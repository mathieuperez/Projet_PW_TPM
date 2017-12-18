const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

let app = express();

app.set('superSecret', "12345"); // secret variable

router.post('/', (req, res) => {
    let user = new User();
    user.login = req.body.login;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    if (user.email === undefined || user.login === undefined || user.password === undefined) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
        User.find().where('email').equals(user.email).exec(function(err, users){
            if (err) {
                res.status(500).json({success: false, message:'There was a problem with the database while checking if the email already exists.'});
            }
            else{
                if (users.length === 0) {
                    User.find().where('login').equals(user.login).exec(function(err, users){
                        if (err) {
                            res.status(500).json({success: false, message:'There was a problem with the database while checking if the login already exists.'});
                        }
                        else {
                            if (users.length === 0) {
                                user.password = crypto.createHmac('sha256', user.password)
                                                        .update('I love cupcakes')
                                                        .digest('hex');
                                user.save(function(err, user){
                                    if(err){
                                        res.status(401).json({success: false, message: 'Register failed.'});
                                    }
                                    else{
                                        if(user){
                                            res.status(200).json({success: true, message: 'Register successful'});
                                        }
                                        else{
                                            res.status(500).json({success: true, message: 'Register failed'});
                                        }
                                    }
                                });
                            }
                            else{
                                res.status(409).json({success: false, message: 'There is already a user with this login.'});
                            }
                        }
                    });
                }
                else{
                    res.status(409).json({success: false, message: 'There is already a user with this email.'});
                }
            }
        });
    }
});

router.post('/token', (req, res) => {
    let user = new User();
    res.setHeader('Content-Type', 'application/json');
    user.login = req.body.login;
    user.password = req.body.password;

    if (user.login === undefined || user.password === undefined) {
        res.status(422).json({success: false, message: 'Missing arguments.'});
    }
    else {
        user.password = crypto.createHmac('sha256', user.password)
                    .update('I love cupcakes')
                    .digest('hex');
        User.findOne( {login: user.login, password: user.password } , (error, users ) => {
            if (users) {
                let token = jwt.sign(users.toObject(), app.get('superSecret')); //24hours
                res.status(200).json({success: true, message: 'Authentication succeeded', user: users, token: token});
            }
            else {
                res.status(400).json({success: false, message: 'Authentication failed. Wrong login/password.'});
            }
        });
    }
});

module.exports = router;
