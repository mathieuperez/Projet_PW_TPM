const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();

app.set('superSecret', "12345"); // secret variable

mongoose.connect('mongodb://localhost:27017/tpm-webdb', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

var usersSchema = mongoose.Schema({
    email: String,
    password: String,
    role: String
});

var User = mongoose.model('User', usersSchema);

router.post('/', (req, res) => {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;


    user.password = crypto.createHmac('sha256', user.password)
                   .update('I love cupcakes')
                   .digest('hex');

    user.save(function(err){
      if(err){
        res.send(err);
      }
    res.json({message : 'Success'});
    })

});

router.post('/token', (req, res) => {
    var user = new User();
    res.setHeader('Content-Type', 'application/json');
    user.email = req.body.login;
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
                res.json({
                    success: true,
                    message: 'Authentication succeded!',
                    token: token,
                    user: users
                });
            }
            else {
                res.status(400).json({success: false, message: 'Authentication failed. Wrong login/password.'});
            }
        });
    }
});

module.exports = router;
