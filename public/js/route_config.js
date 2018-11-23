(function() {
  'use strict';

  angular 
    .module('app')
    .config(config)
    .run(run);

    //declare what dependencies to inject in config and run methods
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    run.$inject = ['$rootScope', '$state', 'Auth'];

    //followed documentations for each dependency

    //each state will have its controller
    //template URLs created in partials
    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('home', { //where user is directed to when logged in (similarly, different pages for restof states)
          url: '/',
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl' 
        })
        .state('login', { 
          url: '/login',
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
        })
        .state('register', {
          url: '/register',
          templateUrl: 'partials/register.html',
          controller: 'RegisterCtrl'
        })
        .state('add', {
          url: '/add',
          templateUrl: 'partials/addSite.html',
          controller: 'AddCtrl',
          restricted: true 
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true); //prevents angular from adding extra backslash or other symbols to URL
    }

    //To protect routes
    function run($rootScope, $state, Auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.restricted && Auth.isLoggedIn() === false) { //check if user is logged in, if not, send to login page (login state)
          $state.go('login');
          event.preventDefault(); //prevent default actions when user clicks on links
        }
      });
    }
})();