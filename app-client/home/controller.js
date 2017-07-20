(function() {

  angular
    .module('journalApp')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl () {
      console.log('Home controller is running');
    }

})();
