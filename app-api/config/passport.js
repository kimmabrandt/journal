var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
// require user model
var User = mongoose.model('User');

// passport can work with many auth. strategies
// use local strategy - users a username & pass stored locally

// perform a mongoose query on user model to find a user
// with the email specified, then call validPassword to see
// if hashes matche

passport.use(new LocalStrategy({
  usernameField: 'email' // since we are using 'email' instead of 'username'
},
function(username, password, done) {
  User.findOne({ email: username }, function(err, user) {
    if (err) { return done(err); }
    // return if user not found in DB
    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }
    // return if password is wrong
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Password is wrong'
      });
    }
    // if credentials are correct, return the user object
    return done(null, user);
  });
}
));
