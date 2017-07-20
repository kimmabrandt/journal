
(function () {

  angular
    .module('journalApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;

    // call isLoggedIn and currentUser methods, and save values
    // to be used in view.
    // to show sign in link if user isnt logged in, & username if they are
    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

  }

})();
