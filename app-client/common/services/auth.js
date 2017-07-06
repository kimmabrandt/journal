
// localStorage - keeps a user logged in between visits
// sessionStorage (not using) - only keeps token / them logged in during browser session

// creating a new service called authentication
(function() {
  angular
  .module('journalApp')
  .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    // creating and returning these methods:

    // saveToken method
    var saveToken = function(token) {
      $window.localStorage['journal-token'] = token;
    };

    // getToken method
    var getToken = function() {
      return $window.localStorage['journal-token'];
    };

    // isLoggedIn method
    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      // decode the payload (2nd part of token) & parse as JSON
      if(token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        //check if expiry date passed
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    // currentUser method
    // get user data from JWT (check if they are logged in, then decode payload etc)
    // gets the email and name from JWT and returns them in an object
    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    // logout method
    logout = function() {
      $window.localStorage.removeItem('journal-token');
    };

    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout
    };
  }
})();
