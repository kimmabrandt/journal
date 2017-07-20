(function() {

  angular
    .module('journalApp')
    .service('journalData', journalData);

  journalData.$inject = ['$http', 'authentication'];
  function journalData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

})();
