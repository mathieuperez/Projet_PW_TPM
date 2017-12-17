let expect  = require("chai").expect;
let request = require("request");

describe("Travel Agency API", function() {

    let url = "http://localhost:3000/api/";
    let token;
    let id;

    describe("POST Create a user", function() {
        let localurl = url + "users/";

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
        let localurl = url + "users/token";

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
                token = JSON.parse(body).token;

                done();
            });
        });

    });




    describe("POST Create a renting", function() {
        let localurl = url + "rentings/bisounours";
        let authurl = url + "users/token";

        it("Bad request (missing Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    url:     localurl,
                    form:    { country: "france", address: "3rue_jean_plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });



        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'access-token' : 'badToken'},
                    url:     localurl,
                    form:    { country: "france", address: "3rue_jean_plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });



        it("Good request : returns status 200", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl,
                    form:    { country: "france", address: "3rue_jean_plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
            });

        });


        it("Bad request (Duplicate) : returns status 409", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl,
                    form:    { country: "france", address: "3rue_jean_plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    done();
                });

            });
        });

    });



    describe("PATCH Modify a renting", function() {

        let localurl = url + "rentings/bisounours/";
        let authurl = url + "users/token";


        it("Bad request (missing Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : "badtoken"},
                    url:     localurl,
                    form:    { country: "france", address: "3rue_jean_plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body2) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });



        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : "badtoken"},
                    url:     localurl,
                    form:    { country: "france", address: "3rue_jean_plaa", city: "Pau", price: 350, startDate: "10/12/2017", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });


        it("Good request : returns status 200", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl,
                    form:    { country: "france", address: "3rue_jean_plaa", city: "Pau", price: 350, startDate: "10/12/2005", time: 15, surface: 37}
                }, function(error, response, body) {
                    let bodyJson = JSON.parse(body);
                    id = bodyJson.renting._id;
                    request.patch({
                        headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                        url:     localurl+id,
                        form:    { country: "france", address: "3rue jean plaa", city: "Pau", price: 350, startDate: "10/02/2057", time: 15, surface: 37}
                    }, function(error, response, body2) {
                        expect(response.statusCode).to.equal(200);
                        done();
                    });
                });

            });
        });


        it("Bad request (Duplicate) : returns status 409", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);

                token = bodyJson.token;

                request.patch({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl+id,
                    form:    { country: "france", address: "3rue jean plaa", city: "Pau", price: 350, startDate: "10/02/2057", time: 15, surface: 37}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    done();
                });

            });
        });


    });




        describe("DELETE Delete a renting", function() {

            let localurl = url + "rentings/bisounours/";
            let authurl = url + "users/token";

            it("Bad request (missing Token) : returns status 401", function(done) {
                request.delete({
                    url:     localurl+id,
                    form:    { login: "bisounours"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });


            it("Bad request (bad Token) : returns status 401", function(done) {
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded'},
                    url:     authurl,
                    form:    { login: "bisounours", password: "mp"}
                }, function(error, response, body) {
                    let bodyJson = JSON.parse(body);
                    request.delete({
                        headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : "badtoken"},
                        url:     localurl+id,
                        form:    { country: "france", startDate: "28/10/2017", time: 15, surface: 37}
                    }, function(error, response, body) {
                        expect(response.statusCode).to.equal(401);
                        done();
                    });

                });
            });



            it("Good request : returns status 200", function(done) {
                request.post({
                    url:     authurl,
                    form:    { login: "bisounours", password: "mperez3"}
                }, function(error, response, body) {
                    let bodyJson = JSON.parse(body);
                    token = bodyJson.token;
                    request.delete({
                        headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                        url:     localurl+id,
                        form:    { address: "3rue jean plaa", startDate: "28/10/2017"}
                    }, function(error, response, body) {
                        expect(response.statusCode).to.equal(200);
                        done();
                    });

                });
            });



            it("Bad request : returns status 500 (cast to objectId failed)", function(done) {
                request.post({
                    url:     authurl,
                    form:    { login: "bisounours", password: "mperez3"}
                }, function(error, response, body) {
                    let bodyJson = JSON.parse(body);
                    token = bodyJson.token;
                    request.delete({
                        headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                        url:     localurl+"badId",
                        form:    { address: "3rue jean plaa", startDate: "28/10/2017"}
                    }, function(error, response, body) {
                        expect(response.statusCode).to.equal(500);
                        done();
                    });

                });
            });


        });


   describe("POST Create a ride", function() {
        let localurl = url + "rides/bisounours";
        let authurl = url + "users/token";

        it("Bad request (missing Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    url:     localurl,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });



        it("Bad request (missing Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'access-token' : 'badToken'},
                    url:     localurl,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}              
                      }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });



        it("Good request : returns status 200", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}         
          }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
            });

        });


        it("Bad request (Duplicate) : returns status 409", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    done();
                });

            });
        });
    });



   
   describe("PATCH Modify a ride", function() {

        let localurl = url + "rides/bisounours/";
        let authurl = url + "users/token";


        it("Bad request (missing Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : "badtoken"},
                    url:     localurl,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}                }, function(error, response, body2) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });



        it("Bad request (bad Token) : returns status 401", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : "badtoken"},
                    url:     localurl,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}
                 }, function(error, response, body) {
                    expect(response.statusCode).to.equal(401);
                    done();
                });
            });
        });


        it("Good request : returns status 200", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);
                token = bodyJson.token;
                request.post({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}
                }, function(error, response, body) {
                    let bodyJson = JSON.parse(body);
                    id = bodyJson.ride._id;
                    request.patch({
                        headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                        url:     localurl+id,
                        form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}
                     }, function(error, response, body2) {
                        expect(response.statusCode).to.equal(200);
                        done();
                    });
                });

            });
        });


        it("Bad request (Duplicate) : returns status 409", function(done) {
            request.post({
                url:     authurl,
                form:    { login: "bisounours", password: "mperez3"}
            }, function(error, response, body) {
                let bodyJson = JSON.parse(body);

                token = bodyJson.token;

                request.patch({
                    headers: {'content-type' : 'application/x-www-form-urlencoded', 'access-token' : token},
                    url:     localurl+id,
                    form:    { rideStartCity: "france", rideArrivalCity: "3rue jean plaa", rideStart: "Pau", rideArrival: "bordeaux",rideStartDate:"12/05/2018",rideArrivalDate:"12/05/2018",rideStartTime:"12:59:00",rideArrivalTime:"15:59:00",rideConveyance:"bm", ridePrice: "55", rideSeat: "1"}

                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    done();
                });

            });
        });


    });



    describe("Trip tests", function() {
        let url = "http://localhost:3000/api/";
        let tokenTrip;
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
                    tokenTrip = JSON.parse(body).token;
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
                                endDate: "14/12/2017",
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
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl,
                    form:   {
                                address: "test adresse",
                                price: 100,
                                startDate: "12/12/2017",
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl,
                    form:   {
                                address: "test adresse",
                                city: "test ville",
                                country: "test pays",
                                price: 100,
                                startDate: "12/12/2017",
                                endDate: "14/12/2017",
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
                                'access-token' : tokenTrip
                            },
                    url:    localurl,
                    form:   {
                                address: "test adresse",
                                city: "test ville",
                                country: "test pays",
                                price: 100,
                                startDate: "12/12/2017",
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl,
                    form:   {
                                address: "test adresse",
                                city: "ville",
                                country: "pays",
                                price: 100,
                                startDate: "11/12/2017",
                                endDate: "13/12/2017",
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
                                endDate: "14/12/2017",
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
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl + tripId,
                    form:   {
                                address: "test adresse",
                                price: 100,
                                startDate: "12/12/2017",
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl + tripId,
                    form:   {
                                address: "test adresse modif",
                                city: "test ville modif",
                                country: "test pays",
                                price: 100,
                                startDate: "12/12/2017",
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl + tripId,
                    form:   {
                                address: "test adresse modif 2",
                                city: "test ville modif",
                                country: "test pays",
                                price: 100,
                                startDate: "13/12/2017",
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl + tripId,
                    form:   {
                                address: "test adresse modif 2",
                                city: "test ville modif",
                                country: "test pays",
                                price: 100,
                                startDate: "13/12/2017",
                                endDate: "14/12/2017",
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
                                'access-token': tokenTrip
                            },
                    url:    localurl + tripId
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
            });
        });
    });


});
