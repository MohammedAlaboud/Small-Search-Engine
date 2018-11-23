(function() {
  'use strict';

  angular
    .module('app')
    .factory('Results', Results);

    Results.$inject = ['$http'];

    function Results($http) {

      return {
        searchResults: searchResults,
        postSite: postSite
      }

      function searchResults(id) { //display results user searched for
        return $http.post('/website/search', id);
      }

      function postSite(site) { //save site
        return $http.post('/website/create', site);
      }

    }
})();