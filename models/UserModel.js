var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    fullname: {type: String, required: [true, "Can't be blank"]},
    email: {type: String, required: [true, "Can't be blank"], unique: true, index: true},
    birthdate: {type: String, required: false, select: true},
    bio: {type: String, required: false, select: true},
    hash: {type: String, required: true, select: false},
    salt: {type: String, required: true, select: false}
});

UserSchema.methods.setPassword =  function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

mongoose.model('User', UserSchema);