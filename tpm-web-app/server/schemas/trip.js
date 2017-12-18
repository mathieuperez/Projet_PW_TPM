const mongoose = require('mongoose');

let trip = mongoose.Schema({
    address: {type: String,required: true},
    city: { type: String,required: true},
    country: { type: String,required: true},
    price: {type: Number,required: true},
    startDate: {type: Date,required: true},
    endDate: {type: Date,required: true},
    startArea: {type: String,required: true},
    arrivalArea: {type: String,required: true},
    time: {type: Number,required: true},
    description: { type: String},
    login: {type: String,required: true}
});

module.exports = mongoose.model('Trip', trip);
