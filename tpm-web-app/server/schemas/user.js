const mongoose = require('mongoose');

let user = mongoose.Schema({
    login:{type: String, unique: true, lowercase: true, trim: true, required: true},
    email:{type: String, unique: true, lowercase: true, trim: true, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
});

module.exports = mongoose.model('User', user);
