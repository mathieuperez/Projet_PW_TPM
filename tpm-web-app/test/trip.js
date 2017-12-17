let expect  = require("chai").expect;
let request = require("request");


describe("Trip tests", function() {
    let url = "http://localhost:3000/api/";
    let token;
    let tripId;

    describe("POST Create a agency", function() {
        var localurl = url + "users/";

        it("Bad request (missing Argument) : returns status 422", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { email: "test.agence@agence.fr", password: "agence"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Good request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { email: "test.agence@agence.fr", password: "agence", login: "testagence", role: "Agence"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Duplicate request : returns status 409", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { email: "test.agence@agence.fr", password: "agence", login: "testagence", role: "Agence"}
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
                form:    {password: "agence"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Bad Request (not matching arguments) : returns status 400", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "testagencequipassepas", password: "agence"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it("Good Request : returns status 200", function(done) {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     localurl,
                form:    { login: "testagence", password: "agence"}
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                token = JSON.parse(body).token;
                done();
            });
        });
    });

    describe("POST Create a trip", function() {
        var localurl = url + "trips/testagence";

        it("Bad request (missing Token) : returns status 401", function(done) {
            request.post({
                url:    localurl,
                form:   {
                            address: "test adresse",
                            city: "test ville",
                            country: "test pays",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                headers:{
                            'access-token' : "tokenquipassepas"
                        },
                url:    localurl,
                form:   {
                            address: "test adresse",
                            city: "test ville",
                            country: "test pays",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Bad Request (missing arguments) : returns status 422", function(done) {
            request.post({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl,
                form:   {
                            address: "test adresse",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Good Request : returns status 200", function(done) {
            request.post({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl,
                form:   {
                            address: "test adresse",
                            city: "test ville",
                            country: "test pays",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                tripId = JSON.parse(body).object._id;
                done();
            });
        });

        it("Bad request (Duplicate) : returns status 409", function(done) {
            request.post({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token' : token
                        },
                url:    localurl,
                form:   {
                            address: "test adresse",
                            city: "test ville",
                            country: "test pays",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(409);
                done();
            });
        });

        it("Bad Request (date and address) : returns status 409", function(done) {
            request.post({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl,
                form:   {
                            address: "test adresse",
                            city: "ville",
                            country: "pays",
                            price: 100,
                            startDate: "12/11/2017",
                            endDate: "12/13/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 4,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(409);
                done();
            });
        });
    });

    describe("PATCH Change a trip", function() {
        var localurl = url + "trips/testagence/";

        it("Bad request (missing Token) : returns status 401", function(done) {
            request.patch({
                url:    localurl + tripId,
                form:   {
                            address: "test adresse",
                            city: "test ville",
                            country: "test pays",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.patch({
                headers:{
                            'access-token' : "tokenquipassepas"
                        },
                url:    localurl + tripId,
                form:   {
                            address: "test adresse",
                            city: "test ville",
                            country: "test pays",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Bad Request (missing arguments) : returns status 422", function(done) {
            request.patch({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl + tripId,
                form:   {
                            address: "test adresse",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });

        it("Good Request : returns status 200", function(done) {
            request.patch({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl + tripId,
                form:   {
                            address: "test adresse modif",
                            city: "test ville modif",
                            country: "test pays",
                            price: 100,
                            startDate: "12/12/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 2,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Good Request : returns status 200 (second change)", function(done) {
            request.patch({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl + tripId,
                form:   {
                            address: "test adresse modif 2",
                            city: "test ville modif",
                            country: "test pays",
                            price: 100,
                            startDate: "12/13/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 1,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("Good Request : returns status 200 (no change but must pass)", function(done) {
            request.patch({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl + tripId,
                form:   {
                            address: "test adresse modif 2",
                            city: "test ville modif",
                            country: "test pays",
                            price: 100,
                            startDate: "12/13/2017",
                            endDate: "12/14/2017",
                            startArea: "test",
                            arrivalArea: "test",
                            time: 1,
                            description: "test"
                        }
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe("DELETE Change a trip", function() {
        var localurl = url + "trips/testagence/";

        it("Bad request (missing Token) : returns status 401", function(done) {
            request.del({
                url:    localurl + tripId,
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Bad request (bad Token) : returns status 401", function(done) {
            request.del({
                headers:{
                            'access-token' : "tokenquipassepas"
                        },
                url:    localurl + tripId
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(401);
                done();
            });
        });

        it("Good Request : returns status 200", function(done) {
            request.del({
                headers:{
                            'content-type' : 'application/x-www-form-urlencoded',
                            'access-token': token
                        },
                url:    localurl + tripId
            }, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});
