angular.module('app_hospitais.hospitais')
    .controller('HospitaisController', function ($scope, $ionicPopup, $state, $ionicLoading, $ionicModal, $stateParams, $window, $location, HospitaisService, MapaHospitaisService, $rootScope) {
        $scope.service = HospitaisService;
        $scope.hospitais = HospitaisService.hospitais;
        $scope.carregando = HospitaisService.carregando;
        $scope.mapaLoaded = false;
        $scope.predicado = 'tempoEspera'; // tipo de ordenação
        $scope.sortReverse = false; // ordenação reversível
        $scope.carregouMapa = false;
        $scope.hospitaisBusca = [];
        $scope.model = {};
        $rootScope.especialidade = $location.search().especialidade;
        $rootScope.nmespecialidade = $location.search().nmespecialidade;


        //get parameters from url
        $scope.parameters = {
            especialidade: $location.search().especialidade,
            nmespecialidade: $location.search().nmespecialidade
        };


        $scope.buscarHospitais = function () {
            HospitaisService.buscarHospitais($stateParams.especialidade).then(function (data) {
                console.log('removing loading');
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

        $scope.ordenarPorTempo = function (hospital) {
            if (hospital.tempoEspera == 0)
                return 999;

            return parseInt(hospital.tempoEspera);
        };

        $scope.ordenar = function (hospital) {
            if ($scope.predicado == 'tempoEspera') {
                if (hospital.tempoEspera == 0)
                    return 999;

                return parseInt(hospital.tempoEspera);
            } else if ($scope.predicado == 'nome') {
                return hospital.nome;
            } else {
                return hospital.distancia;
            }
        };
        //Remover acentos da busca
        //  function removerAcentos (strBusca) {
        //    var map = {
        //         'a' : 'á|à|ã|â|À|Á|Ã|Â',
        //         'e' : 'é|è|ê|É|È|Ê',
        //         'i' : 'í|ì|î',
        //         'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        //         'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        //         'c' : 'ç|Ç',
        //         'n' : 'ñ|Ñ'
        //     };

        //     angular.forEach(map, function (pattern, newValue) {
        //         if(strBusca != undefined){
        //         strBusca = strBusca.replace(new RegExp(pattern, 'g'), newValue);
        //      }
        //     });

        //     return strBusca;
        // };


        $scope.filtrar = function (item) {
            if (HospitaisService.removerAcentos($scope.model.consulta) == undefined ||
                item.nome.toLowerCase().indexOf(HospitaisService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
                item.endereco.logradouro.toLowerCase().indexOf(HospitaisService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
                item.endereco.bairro.toLowerCase().indexOf(HospitaisService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
                item.endereco.cidade.toLowerCase().indexOf(HospitaisService.removerAcentos($scope.model.consulta.toLowerCase())) != -1 ||
                item.endereco.estado.toLowerCase().indexOf(HospitaisService.removerAcentos($scope.model.consulta.toLowerCase())) != -1)
                return true;


            return false;
        };

        $scope.$on('$ionicView.loaded', function () {
            //define qual o tipo de busca está sendo feita: por especialidade ou hospital
            $rootScope.buscaHospital = 'especialidade';
            $scope.buscarHospitais();


        });

        $scope.$watch('model.consulta', function (newValue, oldValue) {
            console.log("newValue: " + newValue + " - oldValue: " + oldValue);

            if (newValue == undefined || HospitaisService.carregando == true)
                return;

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                "address": newValue
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    var location = results[0].geometry.location;

                    HospitaisService.buscarHospitaisPorCoordenadas($stateParams.especialidade, {
                        latitude: location.lat(),
                        longitude: location.lng()
                    });
                }
            });
        });
    });
