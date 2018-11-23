(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$cookies'];

    function LoginCtrl($scope, Auth, $state, $cookies) {
      $scope.error = false;

      $scope.login = function() { //for ng submit for login functions in index
        var user = {
          username: $scope.username,
          password: $scope.password
        } 
        Auth.login(user) //pass in user obj to auth methods
        .success(function(data) {
          console.log('log in successful');
          $cookies.put('user', data.user.username); //track user by cookies 
          $cookies.put('userId', data.user._id);
          $state.go('add');
        })
        .error(function() { //incase
          console.log('Error logging in');
          $scope.error = true;
          $scope.errorMessage = 'Something went wrong';
        });
      }
    }
})();