var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); //allow us to use passport to encrypt passwords when logging in and registering users
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10; //identify character length of hash key (of hashed passwords)

//User properties
var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true  //only one
  },
  password: {
    type: String,
    bcrypt: true,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);