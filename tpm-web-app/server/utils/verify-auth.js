const express = require('express');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var app = express();

app.set('superSecret', "12345"); // secret variable

module.exports = (req, res, login, token, next) => { if (token) {
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
