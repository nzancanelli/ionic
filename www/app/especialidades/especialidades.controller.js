angular.module('app_hospitais.especialidades')

    .controller('EspecialidadesController', function ($scope, $ionicPopup, $state, $ionicLoading, EspecialidadesService) {
        $scope.service = EspecialidadesService;
        $scope.especialidades = EspecialidadesService.especialidades;

        $scope.$on('$ionicView.loaded', function () {

            EspecialidadesService.buscarEspecialidades();
        });

        $scope.visualizarEspecialidades = function () {

            $state.go("menu.especialidades");
        }

    });
