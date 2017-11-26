const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
    user.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message : 'Success'});
    });
});

router.get('/', (req, res) => {
    User.find( (error, users ) => {
        if (error){
            res.send(error);
        }
        res.json(users);
    });
});

router.post('/token', (req, res) => {

});

module.exports = router;
