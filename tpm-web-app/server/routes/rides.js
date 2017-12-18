const express = require('express');
const router = express.Router();
const Ride = require('../schemas/ride');
const verifyauth = require('../utils/verify-auth');

let app = express();
app.set('superSecret', "12345"); // secret variable

//Ajouter un trajet
router.post('/:login', (req, res) => {
    let ride= new Ride();
    ride.rideStartCity= req.body.rideStartCity;
    ride.rideArrivalCity= req.body.rideArrivalCity;
    ride.rideStart = req.body.rideStart;
    ride.rideArrival = req.body.rideArrival;
    ride.ridePrice = req.body.ridePrice;
    ride.rideSeat = req.body.rideSeat;
    ride.rideStartTime=req.body.rideStartTime;
    ride.rideArrivalTime=req.body.rideArrivalTime;
    ride.rideConveyance=req.body.rideConveyance;
    ride.rideStartDate = new Date(''+ req.body.rideStartDate.split('/')[2] + '-' + req.body.rideStartDate.split('/')[1] + '-' + req.body.rideStartDate.split('/')[0]+"");
    ride.rideArrivalDate = new Date(''+ req.body.rideArrivalDate.split('/')[2] + '-' + req.body.rideArrivalDate.split('/')[1] + '-' + req.body.rideArrivalDate.split('/')[0]+"");

    ride.login=req.params.login;
    let hourStart = req.body.rideStartTime;
    hourStart = hourStart.split(':')[0]*3600 + hourStart.split(':')[1]*60 ;
    let hourArrival = req.body.rideArrivalTime;
    hourArrival = hourArrival.split(':')[0]*3600 + hourArrival.split(':')[1]*60 ;
    let token = req.headers['access-token'];

   verifyauth(req, res, ride.login, token, function () {

        if(ride.rideStartCity === undefined || ride.rideArrivalCity === undefined|| ride.rideStart === undefined || ride.rideArrival === undefined ||
            ride.ridePrice === undefined || ride.rideSeat === undefined || ride.rideStartDate === undefined || ride.rideArrivalDate === undefined ||
            ride.rideConveyance === undefined){
            res.status(422).json({success: false, message: 'Missing Arguments.'});
        }
        else {
            ride.rideStartDate=new Date().setTime(ride.rideStartDate.getTime()+(hourStart*1000));
            ride.rideArrivalDate=new Date().setTime(ride.rideArrivalDate.getTime()+(hourArrival*1000));
            let dateProblem=0;

            verifyDate(res, ride, dateProblem, function(){
                if(dateProblem === 0){
                    ride.save(function (err, result) {
                        if (err) {
                            res.status(401).json({success: false, message: 'Creating Ride failed.'});
                        }
                        else {
                            res.status(200).json({success: true, message: 'Creating Ride successful', ride: result});
                        }
                    });
                }
                else{
                    res.status(409).json({success: false,message: 'There is already a ride with this address and date.'});
                }
            });
        }
    });
});



//modifier un trajet
router.patch('/:login/:id', (req, res) => {
    let oldRide=new Ride();
    oldRide.id = req.params.id;
    let token = req.headers['access-token'];
    let ride= new Ride();
    ride.rideStartCity= req.body.rideStartCity;
    ride.rideArrivalCity= req.body.rideArrivalCity;
    ride.rideStart = req.body.rideStart;
    ride.rideArrival = req.body.rideArrival;
    ride.ridePrice = req.body.ridePrice;
    ride.rideSeat = req.body.rideSeat;
    ride.rideStartDate = req.body.rideStartDate;
    ride.rideArrivalDate=req.body.rideArrivalDate;
    ride.rideConveyance=req.body.rideConveyance;
    ride.rideStartTime=req.body.rideStartTime;
    ride.rideArrivalTime=req.body.rideArrivalTime;

    let hourStart = req.body.rideStartTime;
    hourStart = hourStart.split(':')[0]*3600 + hourStart.split(':')[1]*60 ;
    let hourArrival = req.body.rideArrivalTime;
    hourArrival = hourArrival.split(':')[0]*3600 + hourArrival.split(':')[1]*60 ;

    verifyauth(req, res, ride.login, token, function () {
        if(ride.rideStartCity === undefined || ride.rideArrivalCity === undefined|| ride.rideStart === undefined || ride.rideArrival === undefined ||
            ride.ridePrice === undefined || ride.rideSeat === undefined || ride.rideStartDate === undefined || ride.rideArrivalDate === undefined
            || ride.rideConveyance === undefined){
            res.status(422).json({success: false, message: 'Missing Arguments.'});
        }

        else {
            ride.rideStartDate=new Date().setTime(ride.rideStartDate.getTime()+(hourStart*1000));
            ride.rideArrivalDate=new Date().setTime(ride.rideArrivalDate.getTime()+(hourArrival*1000));

            Ride.findById(req.params.id, function (err, rides) {
                if (err) {
                    res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a ride with this address and starting date.'});
                }
                else {
                    oldRide.rideStartDate = rides.rideStartDate;
                    oldRide.rideArrivalDate = rides.rideArrivalDate;
                    oldRide.rideStartTime = rides.rideStartTime;
                    oldRide.rideArrivalTime = rides.rideArrivalTime;

                    let dateProblem=0;
                    verifyDate(res, ride, dateProblem, function(){
                        if (err) {
                            res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a ride with this address and starting date.'});
                        }
                        else {
                            if (dateProblem === 0){
                                Ride.findOneAndUpdate( {"_id": req.params.id}, {$set: {"rideStartCity": ride.rideStartCity, "rideArrivalCity": ride.rideArrivalCity, "rideStart": ride.rideStart, "rideArrival": ride.rideArrival,
                                    "ridePrice": ride.ridePrice, "rideSeat": ride.rideSeat, "rideStartDate": ride.rideStartDate, "rideArrivalDate": ride.rideArrivalDate, "rideStartTime": ride.rideStartTime,
                                    "rideArrivalTime": ride.rideArrivalTime,"rideConveyance": ride.rideConveyance}}, function (err, rides) {
                                    if (err) {
                                        res.status(500).json({success: false, message: 'ride modification failed.'});
                                    }
                                    else {
                                        res.status(200).json({success: true, message: 'ride modification successful', ride: rides});
                                    }
                                });
                            }
                            else if (dateProblem > 1){
                                res.status(409).json({success: false, message: 'There is already a ride with this date.'});
                            }
                            else if (dateProblem === 1) {
                                let same=false;
                                compareDate(ride, oldRide, same, function(){
                                    if(same === true){
                                        Ride.findOneAndUpdate( {"_id": req.params.id}, {"rideStartCity": ride.rideStartCity, "rideArrivalCity": ride.rideArrivalCity, "rideStart": ride.rideStart, "rideArrival": ride.rideArrival,
                                    "ridePrice": ride.ridePrice, "rideSeat": ride.rideSeat, "rideStartDate": ride.rideStartDate, "rideArrivalDate": ride.rideArrivalDate, "rideStartTime": ride.rideStartTime,
                                    "rideArrivalTime": ride.rideArrivalTime,"rideConveyance": ride.rideConveyance}, function (err, ride) {
                                            if (err) {
                                                res.status(500).json({success: false, message: 'ride modification failed.'});
                                            }
                                            else {
                                                if(ride){
                                                    res.status(200).json({success: true, message: 'Ride modification successful'});
                                                }
                                                else{
                                                    res.status(500).json({success: true, message: 'Ride modification failed'});
                                                }
                                            }
                                        });
                                    }
                                    else{
                                        res.status(409).json({success: false, message: 'There is already a ride with this address and date.'});
                                    }

                                });
                            }
                        }
                    });
                }
            });
        }

    });
});




//suprimer un trajet
router.delete('/:login/:id', function(req, res) {
    let id = req.params.id;
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Ride.findOneAndRemove({"_id": id}, function(err, rides){
            if (err){
                res.status(500).json({success: false, message: 'Deleting Ride failed.'});
            }
            else {
                if (rides) {
                    res.status(200).json({success: true, message: 'Deleting Ride successful'});
                }
                else {
                    res.status(409).json({success: false,message: 'There is no ride with this id.'});
                }
            }
        });
    });
});

  //Afficher les offres de trajets d'un particulier connecté
  router.get('/:login', function(req, res) {
    let login = req.params.login;
    let token = req.headers['access-token'];
    verifyauth(req, res, login, token, function () {
        Ride.find({"login": login}, function (err, rides) {
            if (err){
                res.status(500).json({success: false, message: 'Get Rides failed.'});
            }
            else {
                res.status(200).json({success: true, message: 'Get Rides successful', rides: rides});
            }
        });
    });
});

//afficher tous les trajets
router.get('/', function(req, res) {
    Ride.find(function (err, rides) {
        if (err){
            res.status(500).json({success: false, message: 'Get Rides failed.'});
        }
        else {
            res.status(200).json({success: true, message: 'Get Rides successful', rides: rides});
        }
    });
});

function verifyDate(res, ride, dateProblem, next) {

    let hourStart = ride.rideStartTime;
    hourStart = hourStart.split(':')[0]*3600 + hourStart.split(':')[1]*60 ;
    let hourArrival = ride.rideArrivalTime;
    hourArrival = hourArrival.split(':')[0]*3600 + hourArrival.split(':')[1]*60 ;

    ride.rideStartDate=new Date().setTime(ride.rideStartDate.getTime()+(hourStart*1000));
    ride.rideArrivalDate=new Date().setTime(ride.rideArrivalDate.getTime()+(hourArrival*1000));


     Ride.find({"rideArrivalDate": {"$gt": ride.rideStartDate.getTime()-1, "$lt": ride.rideArrivalDate.getTime()+1}, "login": ride.login}).exec(function(err, rides){
        if (err) {
            res.status(500).json({success: false, message:'There was a problem with the database while checking if there is already a ride ending at this  time.'});
        }
        else {
            if (rides.length > 0) {
                dateProblem+=rides.length;
            }
            Ride.find({"rideStartDate": {"$gt": ride.rideStartDate.getTime()-1, "$lt": ride.rideArrivalDate.getTime()+1}, "login": ride.login}).exec(function (err, rides) {
                if (err) {
                    res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a ride starting at this  time.'});
                }
                else {
                    if (rides.length> 0) {
                        dateProblem+=rides.length;
                    }
                    Ride.find({"rideStartDate": {"$lt": ride.rideStartDate.getTime()+1},"rideArrivalDate": {"$gt": ride.rideArrivalDate.getTime()-1},"login": ride.login}).exec(function (err, rides) {
                        if (err) {
                            res.status(500).json({success: false, message: 'There was a problem with the database while checking if there is already a ride starting at this  time.'});
                        }
                        else {

                            if (rides.length > 0) {
                                dateProblem+=rides.length;
                            }
                            if(dateProblem === 0){
                                next();
                            }
                            else {
                                res.status(409).json({success: false,message: 'There is already a ride with this  date.'});
                            }
                        }
                    });
                }
            });
        }
    });

}



function compareDate(ride, oldride, same, next) {

    let hourStart = ride.rideStartTime;
    hourStart = hourStart.split(':')[0]*3600 + hourStart.split(':')[1]*60 ;
    let hourArrival = ride.rideArrivalTime;
    hourArrival = hourArrival.split(':')[0]*3600 + hourArrival.split(':')[1]*60 ;

    ride.rideStartDate=new Date().setTime(ride.rideStartDate.getTime()+(hourStart*1000));
    ride.rideArrivalDate=new Date().setTime(ride.rideArrivalDate.getTime()+(hourArrival*1000));


    let oldhourStart = oldride.rideStartTime;
    oldhourStart = oldhourStart.split(':')[0]*3600 + oldhourStart.split(':')[1]*60 ;
    let oldhourArrival = oldride.rideArrivalTime;
    oldhourArrival = oldhourArrival.split(':')[0]*3600 + oldhourArrival.split(':')[1]*60 ;

    oldride.rideStartDate=new Date().setTime(oldride.rideStartDate.getTime()+(oldhourStart*1000));
    oldride.rideArrivalDate=new Date().setTime(oldride.rideArrivalDate.getTime()+(oldhourArrival*1000));

        if( ((ride.rideArrivalDate.getTime()) > (oldride.rideStartDate.getTime()-1)) && ((ride.rideArrivalDate.getTime()) < (oldride.rideArrivalDate.getTime()+1))){
            same=true;
            next()
        }
        else if( ((ride.rideStartDate.getTime()) > (oldride.rideStartDate.getTime()-1)) && ((ride.rideStartDate.getTime()) < (oldride.rideArrivalDate.getTime()+1))){
            same=true;
            next()
        }
        else if( ((ride.rideStartDate.getTime()) < (oldride.rideStartDate.getTime())) && ((ride.rideArrivalDate.getTime()) > (oldride.rideArrivalDate.getTime()))){
            same=true;
            next()
        }
        else{
            next();
        }


}


module.exports = router;

