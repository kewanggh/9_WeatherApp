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

        function getWeather(city) {
          var defer = $q.defer();

          $http({
            method: 'GET',
            url: ('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=8d341ab1bde4d1589b7108af6c9267fd')

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
