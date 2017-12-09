const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RentingsSchema = mongoose.Schema({
    address: {type: String,required: true},
    country: { type: String,required: true},
    city: { type: String,required: true},
    price: {type: Number,required: true},
    startDate: {type: Date,required: true},
    time: {type: Number,required: true},
    surface: {type: Number,required: true},
    description: { type: String},
    endDate: {type: Date,required: true},
    login: {type: String,required: true}
});

module.exports = mongoose.model('User', UserSchema);