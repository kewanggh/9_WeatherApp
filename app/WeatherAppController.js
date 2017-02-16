(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('WeatherAppController', WeatherAppController);

    WeatherAppController.$inject = ['WeatherAppFactory', 'toastr'];

    /* @ngInject */
    function WeatherAppController(WeatherAppFactory, toastr) {
        var vm = this;
        vm.search = search;
        vm.cities = [];
        vm.defaultCity = "tokyo";
        vm.convert = convert;

        function convert(number) {
          return ((number - 32) * 5.0/9.0).toFixed(2);
        }

        function search(city) {
          if(city === "") {
            toastr.error("You must enter a city name!");
          }
          else {
          WeatherAppFactory.getWeather(city).then(
            function(response){
              vm.cityWeather = response.data;
              toastr.success('We have found weather for ' + city);
              console.log(vm.cityWeather);
              // vm.tempC = ((vm.cityWeather.main.temp - 32) * 5.0/9.0).toFixed(2);
              // vm.tempMaxC = (vm.cityWeather.main.temp_max - 32) * 5.0/9.0;
              // vm.tempMinC = (vm.cityWeather.main.temp_min - 32) * 5.0/9.0;

              vm.cities.push({
                'name': vm.cityWeather.name,
                'time': new Date()
              });
              vm.city = "";
            })
            .catch(function(error){
              if(error.data) {
                toastr.error('There was a big problem: ' + error.data.message);
              } else {
                toastr.info('no data in my data!');
              }
              console.log(error);
            });
          }
        }
    }
})();
