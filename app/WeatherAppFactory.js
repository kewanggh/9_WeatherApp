(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .factory('WeatherAppFactory', WeatherAppFactory);

    WeatherAppFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function WeatherAppFactory($http, $q) {
        var service = {
            getWeather: getWeather
        };

        return service;

        function getWeather() {
          var defer = $q.defer();

          $http({
            method: 'GET',
            url: ''
          }).then(function(response) {
            if (typeof response.data === 'object') {
              defer.resolve(response);
            } else {
              defer.reject('no data found :(');
            }

          }, function(error) {
            //catch statement
            console.log(error);
            defer.reject(error);
          });

          return defer.promise;
        }
    }
})();
