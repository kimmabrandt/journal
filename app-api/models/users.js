var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// create schema for users
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, // since email will be used for login credentials
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // instead of saving a password
  hash: String,
  salt: String
});


// SETTING THE PASSWORD (using mongoose method setPassword)
// (save a reference to the password by setting the salt and the hash)
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};


// CHECKING THE PASSWORD (using mongoose method validPassword)
// (encrypt the salt and the password and see if it matches the stored hash)
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};


// generate a JSON web token (JWT) (using mongoose method generateJwt)
// generate JWT so API can send it out as a response
// this will be called when a user registers and logs in
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET");
};
