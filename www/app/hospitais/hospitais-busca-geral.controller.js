angular.module('app_hospitais.hospitais')
.controller('HospitaisBuscaGeralController', function ($scope, $ionicPopup, $state, $ionicLoading, $ionicModal, $stateParams, $window, $location, HospitaisBuscaGeralService, MapaHospitaisService , $rootScope) {
    $scope.service = HospitaisBuscaGeralService;
    $scope.hospitais = HospitaisBuscaGeralService.hospitais_geral;
    $scope.carregando = HospitaisBuscaGeralService.carregando;
    $scope.mapaLoaded = false;
    $scope.predicado = 'nome'; // tipo de ordenação
    $scope.sortReverse = false; // ordenação reversível
    $scope.carregouMapa = false;
    $scope.hospitaisBusca = [];
    $scope.model = {}; 
    $rootScope.especialidade = $location.search().especialidade;
    $rootScope.nmespecialidade = $location.search().nmespecialidade;    
    $rootScope.buscaHospital = {};

//get parameters from url
    $scope.parameters = { 
            nmespecialidade: $location.search().nmespecialidade
        };

   
    $scope.buscarHospitais = function () {        
        HospitaisBuscaGeralService.buscarHospitais().then(function (data) {                      
        }, function (error) {
            $ionicPopup.alert({
                template: error.message,
                title: error.title
            });            
        });
    };

    $scope.mostrarMapa = function () {
        $scope.exibirMapa = true;

        if (!$scope.carregouMapa) {
            MapaHospitaisService.init($scope);

            $scope.carregouMapa = true;
        }
    };

    $scope.esconderMapa = function () {
        $scope.exibirMapa = false;
    };

    $scope.detalharHospital = function (id) {
        if ($scope.modal != undefined)
            $scope.fecharPesquisa();

        $state.go("menu.detalhe-hospital", {
            idHospital: id
        });
    };

    
    $ionicModal.fromTemplateUrl('app/hospitais/busca-hospitais.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.abrirPesquisa = function () {
    $scope.model.consulta = null;
    $scope.modal.show();
    };

    $scope.fecharPesquisa = function () {
        //location.reload();
        $scope.modal.hide();  
            
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    $scope.mudarOrdenacao = function (ordenacao) {
        $scope.predicado = ordenacao;
    }

    
    $scope.ordenar = function (hospital) {
        if ($scope.predicado == 'nome') {
            return hospital.nome;
        } else {
            return hospital.distancia;
        }
    };
   

    $scope.filtrar = function (item) {
        if (HospitaisBuscaGeralService.removerAcentos($scope.model.consulta) == undefined ||
            item.nome.toLowerCase().indexOf(HospitaisBuscaGeralService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
            item.endereco.logradouro.toLowerCase().indexOf(HospitaisBuscaGeralService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
            item.endereco.bairro.toLowerCase().indexOf(HospitaisBuscaGeralService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
            item.endereco.cidade.toLowerCase().indexOf(HospitaisBuscaGeralService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
            item.endereco.estado.toLowerCase().indexOf(HospitaisBuscaGeralService.removerAcentos($scope.model.consulta.toLowerCase())) != -1)
            return true;


        return false;
    };
    
    $scope.$on('$ionicView.loaded', function(){      
        //define qual o tipo de busca está sendo feita: por especialidade ou hospital
        $rootScope.buscaHospital = 'hospital';     
        console.log('Passo 1: define qual o tipo de busca está sendo feita -> ' + $rootScope.buscaHospital) 
        $scope.buscarHospitais();
    });

    $scope.$watch('model.consulta', function (newValue, oldValue) {
        console.log("newValue: " + newValue + " - oldValue: " + oldValue);

        if (newValue == undefined || HospitaisBuscaGeralService.carregando == true)
            return;

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            "address": newValue
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                var location = results[0].geometry.location;

                HospitaisBuscaGeralService.buscarHospitaisPorCoordenadas($stateParams.especialidade, {
                        latitude: location.lat(),
                        longitude: location.lng()
                });                
            }
        });
    });
});
