const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('./users.js');
var trajetService = require('../services/trajet.service');
var app = express();

mongoose.connect('mongodb://localhost:27017/tpm-webdb', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

var trajetSchema = mongoose.Schema({

    name :{type:String, unique:true},
    depart: { type: String,required: true},
    destination: {type: String,required: true},
    lieu_depart: {type: String,required: true},
    lieu_arriver: {type: String,required: true},
    tarif: {type: Number,required: true},
    places_restantes: { type: String,required: true},
    date: {type: Date ,required: true}


});

var trajet = mongoose.model('trajet', trajetSchema);
//Ajouter un trajet 
router.post('/:idUser', (req, res) => {
    var trajet= new trajet();
    var iduser = req.params.idUser;

    trajet.name = req.body.name;
    trajet.depart = req.body.depart;
    trajet.destination = req.body.destination;
    trajet.lieu_depart = req.body.lieu_depart;
    trajet.lieu_arrivée = req.body.lieu_arrivée;
    trajet.tarif = req.body.tarif;
    trajet.places_restantes = req.body.places_restantes;
    trajet.date = req.body.date;


    trajet.save(function(err){
      if(err){
        res.status(400).json({success: false, message: 'Register failed.'});
      }
    res.json({
        success: true,
        message : 'offre de trajet bien ajouté!'});
    })

     User.findByIdAndUpdate(
     idUser,
     {$push: {"trajet": trajet.name  } },
     {safe: true, upsert: true},
     function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

         deferred.resolve();
  });

});


  /* GET  PROJECTS of a User */
  router.get('/:login', function(req, res, next) {
    var login = req.params.login;
    console.log(login);
    var listTrajet = [] ;
   
    User.findOne({ login: login }, function (err, user) {
if(user){
      listTrajet = user.trajet;


          trajet.find({ 'name': {$in: listTrajet } })
              .then((trajet) => {


                  res.json(trajet);
                  console.log(trajet);


              })
              .catch((err) => {
                  sendError(err, res);
              });}

      });
    });

//ajouter le trajet dans la liste des trajets dun utilisateur

/*router.post('/:idUser', function(req, res, next) {
    var iduser = req.params.idUser;
    console.log(iduser);

    trajetService.create(req.body, iduser,function (err, post) {

      if (err) return next(err);
      res.json(post);
    });
  });*/


//get trajets d'un user
/*router.get('/', function(req, res, next) {
    var offre = new Offres();
  offre.trajet.find(function (err, locations) {
    if (err) return next(err);
    res.json(offre.trajet);
  });
});
*/
module.exports = router;







































/*const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();

mongoose.connect('mongodb://localhost:27017/tpm-webdb', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

var trajetsSchema = mongoose.Schema({
    tarif: {
        type: Number,
        required: true
  },
    date: {
        type: Date,
        required: true
    },
    heure: {
        type: String,
        required: true
    },
    bagage: {
        type: String,
        required: true
    },
});

var Trajet = mongoose.model('Trajet', trajetsSchema);


router.post('/', (req, res) => {
    var trajet = new Trajet();
    trajet.tarif = req.body.tarif;
    trajet.date = req.body.date;
    trajet.heure = req.body.heure;
    trajet.bagage = req.body.bagage;

    trajet.save(function(err){
      if(err){
        res.status(400).json({success: false, message: 'Register failed.'});
      }
    res.json({
        success: true,
        message : 'Trajet bien ajouté!'});
    })

});


module.exports = router;
*/

