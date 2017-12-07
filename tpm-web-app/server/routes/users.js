const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();

app.set('superSecret', "12345"); // secret variable

var usersSchema = mongoose.Schema({
  email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
  },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },

    trajet:[String],
    location:[String],
    voyage:[String]


});

var User = mongoose.model('User', usersSchema);

router.post('/', (req, res) => {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    if (user.email == null || user.password == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
        User.find().where('email').equals(user.email).exec(function(err, users){
            if (err) {
                res.status(500).json({success: false, message:'There was a problem with the database while checking if the email already exists.'});
            }
            else {
                if (users.length == 0) {
                    user.password = crypto.createHmac('sha256', user.password)
                                            .update('I love cupcakes')
                                            .digest('hex');
                    user.save(function(err){
                        if(err){
                            res.status(401).json({success: false, message: 'Register failed.'});
                        }
                        else{
                            res.status(200).json({success: true, message:'Register successful'});
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
    var user = new User();
    res.setHeader('Content-Type', 'application/json');
    user.email = req.body.email;
    user.password = req.body.password;

    if (user.email == null || user.password == null) {
        res.status(422).json({success: false, message: 'Missing arguments.'});
    }
    else {
        user.password = crypto.createHmac('sha256', user.password)
                    .update('I love cupcakes')
                    .digest('hex');
        User.findOne( {'email': user.email, 'password': user.password } , (error, users ) => {
            if (users) {
                var token = jwt.sign(users.toJSON(), app.get('superSecret'));
                User.updateOne({ 'email': users.email }, { 'token': token }, (error,response) => {
                    if (response['ok'] === 1) {
                        res.json({
                            success: true,
                            message: 'Authentication succeded!',
                            user: users
                        });
                    } else {
                        res.status(400).json({success: false, message: 'Authentication failed.'});
                    }
                });
            }
            else {
                res.status(400).json({success: false, message: 'Authentication failed. Wrong login/password.'});
            }
        });
    }
});

module.exports = router;
