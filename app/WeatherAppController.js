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
        //toastr
        function search(city) {
          WeatherAppFactory.getWeather(city).then(
            function(response){
              vm.cityWeather = response.data;
              toastr.success('We have found weather for ' + city);
              console.log(vm.cityWeather);
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
})();
