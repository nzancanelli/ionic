angular.module('app_hospitais.especialidades')

    .controller('EspecialidadesPorUnidadeController', function ($scope, $ionicPopup, $state, $ionicLoading, EspecialidadesPorUnidadeService) {
        $scope.service = EspecialidadesPorUnidadeService;
        $scope.especialidades = EspecialidadesPorUnidadeService.especialidades;
        $scope.idHospital = $state.params.idHospital;
        //get parameters from url

        $scope.$on('$ionicView.loaded', function () {
            console.log('passo 4: especialidade')      
            EspecialidadesPorUnidadeService.buscarEspecialidades($state.params.idHospital);
        });

        /*  $scope.visualizarEspecialidades = function () {
                     
              $state.go("menu.especialidades");
          }*/

    });
