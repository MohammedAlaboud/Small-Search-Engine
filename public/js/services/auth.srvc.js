(function() {
  'use strict';

  angular
    .module('app')
    .factory('Auth', Auth);

    Auth.$inject = ['$http']; 

    //Auth function 
    function Auth($http) {
      var loggedIn = false; //user logged in or not
      var currentUser = {}; //track user

      return { //methods returned
        register: register,
        login: login,
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus
      }

      //set if user is logged in
      function isLoggedIn() {
        if(loggedIn) {
          return true;
        } else {
          return false;
        }
      }

      //Check if user is logged in
      function getUserStatus() {
        return loggedIn;
      }

      //register
      function register(user) {
        return $http.post('/users/register', user); ////post request to register route
      }

      //process user request to log in
      function login(user) {
        return $http.post('/users/login', user) //post request to login route
        .success(function(data) {
          loggedIn = true;
        })
        .error(function(data) {
          console.log('error occured');
          loggedIn = false;
        });
      };

    }
})();