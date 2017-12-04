const express = require('express');
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

var OffresSchema = mongoose.Schema({

   location : [
   { 
    name :{type:String, unique:true},
    pays: { type: String,required: true},
    adresse: {type: String,required: true},
    tarif: {type: Number,required: true},
    durée: {type: Number,required: true},
    date_debut: {type: Date,required: true},
    option: { type: String}
    }],
   
   trajet : [
   { 
    name :{type:String, unique:true},
    depart: { type: String,required: true},
    destination: {type: String,required: true},
    lieu_depart: {type: String,required: true},
    lieu_arriver: {type: String,required: true},
    tarif: {type: Number,required: true},
    places_restantes: { type: String,required: true},
    date: {type: Date ,required: true}
    }
  ],

   voyage: [
   {
    name :{type:String, unique:true},
    pays: { type: String,required: true},
    adresse_location: {type: String,required: true},
    tarif: {type: Number,required: true},
    date_aller: {type: Date,required: true},
    date_retour: {type: Date,required: true},
    lieu_aller: {type: String,required: true},
    lieu_retour: {type: String,required: true},
    durée: {type: Number,required: true},
    description: {type: Date,required: true}
    }
  ]

});

var Offres = mongoose.model('Offres', OffresSchema);



//Ajouter un trajet 
router.post('/', (req, res) => {
    var offre= new Offres();

    offre.trajet.depart = req.body.depart;
    offre.trajet.destination = req.body.destination;
    offre.trajet.lieu_depart = req.body.lieu_depart;
    offre.trajet.lieu_arrivée = req.body.lieu_arrivée;
    offre.trajet.tarif = req.body.tarif;
    offre.trajet.places_restantes = req.body.places_restantes;
    offre.trajet.date = req.body.date;


    offre.save(function(err){
      if(err){
        res.status(400).json({success: false, message: 'Register failed.'});
      }
    res.json({
        success: true,
        message : 'offre de trajet bien ajouté!'});
    })

});


  /* GET  PROJECTS of a User */
  router.get('/:login', function(req, res, next) {
    var login = req.params.login;
    console.log(login);
    var listTrajet = [] ;
    var arvind = new Offres({
  trajet [name:'trajet1',depart:'fes',destination'rabat',lieu_depart:'mcdo',lieu_arriver:'bar',tarif:'45',places_restantes:'3',date:'12/01/2017']});
 
  arvind.save(function (err, data) {
   if (err) console.log(err);
   else console.log('Saved : ', data );
   });

    User.findOne({ login: login }, function (err, user) {
if(user){
      listTrajet = user.trajet;


          Offres.find({ 'name': {$in: listTrajet } })
              .then((offres.trajet) => {


                  res.json(offres.trajet);
                  console.log(offres.trajet);


              })
              .catch((err) => {
                  sendError(err, res);
              });}

      });
    });




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


