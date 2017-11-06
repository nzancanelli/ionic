angular.module('app_hospitais.medicamentos')

    .controller('MedicamentosController', function ($scope, $state, $ionicPopup, ionicDatePicker, medicamentosService, $rootScope) {                 
        
    $scope.toggleGroup = function (medicamento) {
        if ($scope.isGroupShown(medicamento)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = medicamento;
        }
    };
    $scope.isGroupShown = function (medicamento)
     {
        return $scope.shownGroup === medicamento;
    };          
   
                        
    $scope.listaMedicamentos = {};
    //##### Alterar para pegar o Id do usuario logado ###### 
    medicamentosService.buscarMedicamentos($rootScope.id).then(function (dados) {
        $scope.listaMedicamentos = dados;
    }, function (erro) {
        $ionicPopup.alert({
            title: 'Ocorreu um erro, tente novamente mais tarde!'
        });
    });

    $scope.cadastroMedicamentos = function () {
        $state.go("menu.cadastro-medicamentos");
    };

    $scope.historicoPeriodo = function () {
        $ionicPopup.alert({
            title: 'Selecione o periodo!'
        });
    }; 


}) ;


  




