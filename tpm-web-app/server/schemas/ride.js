const mongoose = require('mongoose');

let ride = mongoose.Schema({
    rideStartCity: {type: String,required: true},
    rideArrivalCity: {type: String,required: true},
    rideStart: {type: String,required: true},
    rideArrival: {type: String,required: true},
    ridePrice: {type: Number,required: true},
    rideSeat: { type: Number,required: true},
    rideStartDate: {type: Date ,required: true},
    rideArrivalDate: {type: Date ,required: true},
    rideStartTime:{type:String,required:true},
    rideArrivalTime:{type:String,required:true},
    rideConveyance:{type:String,required:true},
    login: {type: String,required: true}
});

module.exports = mongoose.model('Ride', ride);
