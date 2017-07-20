(function () {

angular
  .module('journalApp')
  .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password: ""
    };

    vm.onSubmit = function() {
      console.log('Submitting registration');
      // authentication.register passes credentials from form
      authentication
      .register(vm.credentials)
      .error(function(err){
        alert(err);
      })
      // if success register, redirect to profile page
      .then(function(){
        $location.path('profile');
      });
    };
  }

})();
