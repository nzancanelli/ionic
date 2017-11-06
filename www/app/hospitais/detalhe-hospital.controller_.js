angular.module('app_hospitais.hospitais')

.controller('DetalheHospitalController', function ($scope, $ionicPopup, $state, $stateParams, $window, HospitaisService, AppService, NavigationService) {
    $scope.hospital = {};
    $scope.configuracao = AppService.configuracao;
    $scope.fotoUrl = AppSettings.apiEndpoint + '/buscarfoto?identificador=';

    $scope.tracarRota = function () {
        var destination = [
			$scope.hospital.coordenadas.latitude,
			$scope.hospital.coordenadas.longitude
		];

        if (destination[0] == undefined || destination[1] == undefined)                        
            return;        
        
       NavigationService.navigate(destination[0], destination[1], $scope);
    };

    $scope.abrirSite = function () {
        if ($scope.hospital.website == undefined)
            return;
        
        $window.open($scope.hospital.website, "_system", "location=yes");
    };
    
    $scope.telefonarHospital = function() {
        if ($scope.hospital.telefone[0].DDD == undefined)
            return;
        
        var call = "tel:0" + $scope.hospital.telefone[0].DDD + $scope.hospital.telefone[0].numeroTelefone;        
        document.location.href = call;
    };

    $scope.$on('$ionicView.beforeEnter', function(){
        HospitaisService.buscarHospital($stateParams.idHospital).then(function (data) {
            $scope.hospital = data;
        });
    });
})
.filter('extrairImagem', function() {      
    return function(input) {
        if (typeof(input) == "undefined") {
            return "img/img_hospital_generica.jpg";
        } else { 
            return 'data:image/jpeg;base64,' + input.buscarFotoResponseType.foto;
        }
    };
})
.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(data:image/jpeg;base64,' + value +')',
                'background-size' : 'cover',
                'background-repeat': 'no-repeat'
            });
        });
    };
});