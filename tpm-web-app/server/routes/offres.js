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

   location : [{ 
    pays: { type: String,required: true},
    adresse: {type: String,required: true},
    tarif: {type: Number,required: true},
    durée: {type: Number,required: true},
    date_debut: {type: Date,required: true},
    option: { type: String}
    }],
   
   trajet : [{ 
    depart: { type: String,required: true},
    destination: {type: String,required: true},
    lieu_depart: {type: String,required: true},
    lieu_arrivé: {type: String,required: true},
    tarif: {type: Number,required: true},
    places_restantes: { type: String,required: true},
    date: {type: Date ,required: true}
    }],
   voyage: [{
    pays: { type: String,required: true},
    adresse_location: {type: String,required: true},
    tarif: {type: Number,required: true},
    date_aller: {type: Date,required: true},
    date_retour: {type: Date,required: true},
    lieu_aller: {type: String,required: true},
    lieu_retour: {type: String,required: true},
    durée: {type: Number,required: true},
    description: {type: Date,required: true}
    }]

});

var Offres = mongoose.model('Offres', OffresSchema);


router.post('/locations/', (req, res) => {
    var location = new Locations();
    location.pays = req.body.pays;
    location.adresse = req.body.adresse;
    location.tarif = req.body.tarif;
    location.duree = req.body.duree;
    location.date_debut = req.body.date_debut;
    location.option = req.body.option;

    if (location.pays == null || location.adresse == null || location.tarif == null || location.duree == null || location.date_debut == null || location.option == null) {
        res.status(422).json({success: false, message:'Missing Arguments.'});
    }
    else {
        var datefin=new Date().setDate(location.date_debut+location.duree);
        Offres.find({"location": {"date_debut": {"$gte": date_debut, "$lt": datefin}}}).exec(function(err, locations){
            if (err) {
                res.status(500).json({success: false, message:'There was a problem with the database while checking if the email already exists.'});
            }
            else {
                if(locations.length==0){

                    location.save(function(err){
                      if(err){
                        res.status(401).json({success: false, message: 'Register failed.'});
                      }
                      else{
                        res.status(200).json({success: true, message:'Register successful'});
                      }
                    })  
                }
                else{
                    res.status(409).json({success: false, message: 'There is already a location with this adresse and date.'});
                }
            }
        })
    }


    location.save(function(err){
      if(err){
        res.status(400).json({success: false, message: 'Register failed.'});
      }
    res.json({
        success: true,
        message : 'location bien ajouté!'});
    })

});
router.get('/', function(req, res, next) {
    var location = new Locations();
  location.find(function (err, locations) {
    if (err) return next(err);
    res.json(location);
  });
});

module.exports = router;
