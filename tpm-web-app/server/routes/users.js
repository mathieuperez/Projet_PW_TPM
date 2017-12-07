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
    login:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
  },
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
   
    trajet:[String],
    location:[String],
    voyage:[String]
    
  
});

var User = mongoose.model('User', usersSchema);

router.post('/', (req, res) => {
    var user = new User();
    user.login = req.body.login;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;


    user.password = crypto.createHmac('sha256', user.password)
                   .update('I love cupcakes')
                   .digest('hex');

    user.save(function(err){
      if(err){
        res.status(400).json({success: false, message: 'Register failed.'});
      }
    res.json({
        success: true,
        message : 'Register completed!'});
    })

});

router.post('/token', (req, res) => {
    var user = new User();
    res.setHeader('Content-Type', 'application/json');
    user.login = req.body.login;
    user.password = req.body.password;

    if (user.login == null || user.password == null) {
        res.status(422).json({success: false, message: 'Missing arguments.'});
    }
    else {
        user.password = crypto.createHmac('sha256', user.password)
                    .update('I love cupcakes')
                    .digest('hex');
        User.findOne( {'login': user.login, 'password': user.password } , (error, users ) => {
            if (users) {
                var token = jwt.sign(users.toJSON(), app.get('superSecret'));
                //
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
