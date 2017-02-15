(function() {
    'use strict';

    angular
        .module('WeatherApp')
        .controller('WeatherAppController', WeatherAppController);

    WeatherAppController.$inject = ['WeatherAppFactory'];

    /* @ngInject */
    function WeatherAppController(WeatherAppFactory) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
