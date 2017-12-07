var _ = require('lodash');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users.js');
var trajet = require('../models/trajet.js');

var Q = require('q');
var service = {};


service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


function create(trajet, idUser) {
    var deferred = Q.defer();


  // On ajoute le nom du projet à la liste de l'utilisateur qui crée le projet
  User.findByIdAndUpdate(
  idUser,
  {$push: {"trajet": trajet.name  } },
  {safe: true, upsert: true},
  function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
  });


//on insert le projet dans la collection Projet
  trajet.create( { "name":  project.name, "depart": trajet.depart, "destination":trajet.destination,
    "lieu_depart":trajet.lieu_depart,"lieu_arriver":trajet.lieu_arriver,"tarif":trajet.tarif,
    "places_restantes":trajet.places_restantes,"date":trajet:date}, function (err, doc) {
  if (err) deferred.reject(err.name + ': ' + err.message);
    // saved!
  });

    return deferred.promise;
}

/*function update(_id, projectParam) {
    var deferred = Q.defer();


    function updateproject() {
        // fields to update
        var set = {
            projectname: projectParam.projectname,
            password: projectParam.password
        };


      project.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

  project.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
*/