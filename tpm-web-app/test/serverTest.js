var expect  = require("chai").expect;
var request = require("request");
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

describe("Travel Agency API", function() {

    var url = "http://localhost:3000/api/";

    describe("POST Créer un utilisateur", function() {
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



/*




    describe("GET Obtenir un utilisateur", function() {
        var localurl = url + "users/dprestat";
        it("Good request : returns status 200", function(done) {
            request.get({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("fetched the associated user", function(done) {
            request.get({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                var email = bodyJson.email;
                var password = bodyJson.password;
                var name = bodyJson.name;
                var surname = bodyJson.surname;

                expect(email).to.equal("dprestat");
                expect(password).to.equal("dp33");
                expect(name).to.equal("Prestat");
                expect(surname).to.equal("Dimitri");
                done();
            });
        });
    });
*/



/*

describe("PUT Créer une user story", function() {
        var localurl = url + "userStories/projects/Bepp";
        var authurl = url + "users/token";

        it("Bad request (missing Argument) : returns status 422", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { email: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                request.put({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { description: "ma user story préférée"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(422);
                    done();
                });

            });
        });

        it("Bad request (missing Token) : returns status 401", function(done) {
                request.put({
                    url:     localurl,
                    form:    { name: "Bepp"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(422);
                    done();
                });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { email: "abounad", password: "ab33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                request.put({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { description: "ma_user_story_preferee", difficulte: "3"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });

            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     authurl,
                form:    { email: "dprestat", password: "dp33"}
            }, function(error, response, body) {
                var bodyJson = JSON.parse(body);
                request.put({
                    headers: {'x-access-token' : bodyJson.token},
                    url:     localurl,
                    form:    { description: "ma_user_story_preferee", difficulte: "3" }
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });

            });
        });

    });*/



});
