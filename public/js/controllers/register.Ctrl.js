(function() {
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['$scope', '$state', 'Auth'];

  function RegisterCtrl($scope, $state, Auth) {
    $scope.error = false;

    $scope.register = function(form) {
      var user = { //properties to pass back to server
        username: $scope.username,
        password: $scope.password,
        password2: $scope.password2,
        email: $scope.email
      }

      Auth.register(user)
        .success(function() {
          console.log('User registered successfully ');
          $state.go('login'); //send back to login
        })
        .error(function() {
          $scope.error = true;
          $scope.errorMessage = 'Something went wrong'
        });
    }
  }

})();