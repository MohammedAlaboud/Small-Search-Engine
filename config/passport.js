//More or less from documentations online for passport.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function() {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ //search for user passed in
        username: username
      }).exec(function(err, user) { //check if user is authenticated 
        if (user && user.authenticate(password, user.password, function(err, isMatch) { //this method created later
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            console.log('Invalid Password');
            return done(null, false, {
              message: 'Invalid Password'
            });
          }
        }));
      });
    }));

  //These are directly from module examples: https://github.com/jaredhanson/passport
  passport.serializeUser(function(user, done) {
    if (user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}