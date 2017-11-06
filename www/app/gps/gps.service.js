(function () {
  'use strict';
  angular
    .module('app_hospitais.gps', [])
    .service('gpsService', gpsService);

  gpsService.$inject = ['$q'];

  function gpsService($q) {
    var service = {
      getCurrentLocation: getCurrentLocation,
      calculateDistance: calculateDistance
    }
    return service;

    function getCurrentLocation() {
      var deferred = $q.defer();

      navigator.geolocation.getCurrentPosition(function (result) {
        deferred.resolve(result);
      },
        function (err) {
          deferred.reject(err);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true
        });

      return deferred.promise;
    }

    function degreeToRadius(degree) {
      return degree * (Math.PI / 180);
    }

    function calculateDistance(compareLatitude, compareLongitude, deviceLatitude, deviceLongitude) {
      var radius = 6371; // Radius of the earth in km
      var degreeLatitude = degreeToRadius(deviceLatitude - compareLatitude);
      var degreeLongitude = degreeToRadius(deviceLongitude - compareLongitude);

      var step1 =
        Math.sin(degreeLatitude / 2) * Math.sin(degreeLatitude / 2) +
        Math.cos(degreeToRadius(compareLatitude)) * Math.cos(degreeToRadius(deviceLatitude)) *
        Math.sin(degreeLongitude / 2) * Math.sin(degreeLongitude / 2);

      var step2 = 2 * Math.atan2(Math.sqrt(step1), Math.sqrt(1 - step1));
      var distanceInKilometers = radius * step2;

      return distanceInKilometers;
    }
  };
})();
