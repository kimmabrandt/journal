(function() {

angular
  .module('journalApp')
  .controller('profileCtrl', profileCtrl);

profileCtrl.$inject = ['$location', 'journalData'];
function profileCtrl($location, journalData) {
  var vm = this;

  vm.user = {};

  journalData.getProfile()
    .success(function(data) {
      vm.user = data;
    })
    .error(function (e) {
      console.log(e);
    });
}

})();
