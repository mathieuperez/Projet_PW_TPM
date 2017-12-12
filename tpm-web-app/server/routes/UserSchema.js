const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    login:{type: String, unique: true, lowercase: true, trim: true, required: true},
    email:{type: String, unique: true, lowercase: true, trim: true, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    token: {type: String, required: false}
});

module.exports = mongoose.model('User', UserSchema);