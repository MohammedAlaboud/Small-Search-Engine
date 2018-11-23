(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddCtrl', AddCtrl);

    AddCtrl.$inject = ['Results', '$scope', '$alert', '$cookies'];

    //to add site
    function AddCtrl(Results, $scope, $alert, $cookies) {
      $scope.error = false;
      $scope.formField = null;
      var userId = $cookies.get('userId'); //track user that adds it (cookie)

      //what's displayed
      $scope.addForm = function() {
        var alertSuccess = $alert({
          title: 'Succss',
          content: 'New website has been added',
          container: '#alertContainer',
          type: 'success',
          duration: 6
        });
        //object to send back to database
        var add = {
          title: $scope.title,
          url: $scope.url,
          description: $scope.description,
          id: userId
        }
        //reset title and description and url when something added
        Results.postSite(add)
          .then(function(data) {
            console.log('new site added to db');
            console.log(data);
            $scope.url = '';
            $scope.description = '';
            $scope.title = '';
            alertSuccess.show();
          })
          .catch(function() {
            console.log('website failed to save');
          });
      }

    }
})();