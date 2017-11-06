angular.module('app_hospitais.hospitais')

.factory('MapaHospitaisService', function ($cordovaGeolocation, $compile, HospitaisService) {
    var apiKey = false;
    var map = null;
    var scope;

    function initMap(scope) {
        this.scope = scope;

        var options = {
            timeout: 10000,
            enableHighAccuracy: true
        };

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            createMap(latLng);
        }, function (error) {
            console.log("Could not get location");
            
            latLng = new google.maps.LatLng(-23.587615, -46.664154);

            createMap(latLng);
        });

    }
    
    function createMap(latLng) {
        var mapOptions = {
            center: latLng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListenerOnce(map, 'idle', function () {

            //Load the markers
            loadMarkers();

        });    
    }

    function loadMarkers() {
        //Get all of the markers from our Markers factory
        angular.forEach(HospitaisService.hospitais, function (value) {
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(value.coordenadas.latitude, value.coordenadas.longitude)
            });

            var compiled = $compile(HospitaisService.templateMarca(value))(this.scope);
            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(compiled[0]);
            infoWindow.open();

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        });

        /*if (HospitaisService.hospitais.length > 0)
            map.setCenter(new google.maps.LatLng(HospitaisService.hospitais[0].coordenadas.latitude, HospitaisService.hospitais[0].coordenadas.longitude))*/
    }

    return {
        init: function (scope) {
            initMap(scope);
        }
    }
})
