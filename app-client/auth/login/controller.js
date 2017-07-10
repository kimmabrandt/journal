(function () {

angular
  .module('meanApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($loation, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password: ""
    };

    vm.onSubmit = function() {
      console.log('Submitting login');
      // authentication.register passes credentials from form
      authentication
      .login(vm.credentials)
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
