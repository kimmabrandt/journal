(function() {
  angular.module('journalApp' ['ngRoute']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'home/home.html',
      controller: 'homeCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/auth/register/register.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/auth/login/login.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .when('/profile', {
      templateUrl: '/profile/profile.html',
      controller: 'profileCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

    // user the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  // protect profile route; if unauthorized user accesses, redirect to home
  function run($rootScope, $location, authentication) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
      $location.path('/');
    }
  });
}


  angular
  .module('journalApp')
  .config(['$routeProvider', '$locationProvider', config])
  .run(['$rootScope', '$location', 'authentication', run]);

})();
