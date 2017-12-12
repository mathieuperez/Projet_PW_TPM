var expect  = require("chai").expect;
var request = require("request");
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

describe("Travel Agency API", function() {

    var url = "http://localhost:3000/api/";

    describe("POST !Create a user", function() {
        var localurl = url + "users/";

        it("Bad request (missing Argument) : returns status 422", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { email: "mathieu.perez@etu.u-bordeaux.fr", password: "mperez3"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { email: "mathieu.perez@etu.u-bordeaux.fr", password: "mperez3", login: "bisounours", role: "Developpeur"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Another good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { email: "mp@bord.fr", password: "mp", login:"teddybear", role: "Utilisateur"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Duplicate request : returns status 409", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { email: "mathieu.perez@etu.u-bordeaux.fr", password: "mperez3", login: "bisounours", role: "Developpeur"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(409);
                done();
            });
        });

    });


    describe("POST Authentification", function() {
        var localurl = url + "users/token";

        it("Bad Request (missing arguments) : returns status 422", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    {password: "mperez3"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Bad Request (not matching arguments) : returns status 400", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "bisounours Premier", password: "mperez3"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it("Good Request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });




describe("POST Create a renting", function() {
        var localurl = url + "rentings/mperez3";
        var authurl = url + "users/token";
/*
        it("Another good request without token verification: returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { country: "france", address: "3rue jean plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });*/

        it("Bad request (missing Token) : returns status 401", function(done) {
                request.post({
                    url:     localurl,
                    form:    { login: "bisounours"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(422);
                    done();
                });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "bisounours", password: "mp"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                request.post({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { description: "ma_user_story_preferee", difficulte: "3"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(422);
                    done();
                });

            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                request.post({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { country: "france", address: "3rue jean plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });

            });
        });



        it("Bad request (Duplicate) : returns status 409", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                //done();
                request.post({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { country: "france", address: "3rue jean plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    done();
                });

            });
        });





    });



});
