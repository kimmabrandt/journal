var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// REGISTER API CONTROLLER
module.exports.register = function(req, res) {
  var user = new User();

  // take the data from the submitted form and create a new mongoose model instance
  user.name = req.body.name;
  user.email = req.body.email;

  // call setPassword method to add the salt & hash to the instance
  user.setPassword(req.body.password);

  // save instance as a record to the DB
  // TODO later include error catches and form validations inside save function here
  user.save(function(err) {
    var token;
    // generate a jwt and send inside json response
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};


// LOGIN API CONTROLLER
// TODO add form validation here; check reqd fields
// call authenticate method which callsback parameters
// err, user and info. if user exists, it can be used to
// generate a JWT to return to browser
module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){
    var token;

    // if passport throws an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // if a user is Found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // if a user is not Found
      res.status(401).json(info);
    }
  })(req, res);
};
