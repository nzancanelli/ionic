angular.module('app_hospitais.hospitais')
    .controller('DetalheHospitalController', function ($scope
        , $ionicPopup
        , $location
        , $rootScope
        , $state
        , $stateParams
        , $window
        , HospitaisService
        , HospitaisBuscaGeralService
        , AppService
        , NavigationService
        , $localStorage
    ) {


        $scope.hospital = {};
        $scope.configuracao = AppService.configuracao;
        $scope.fotoUrl = AppSettings.apiEndpoint + '/buscarfoto?identificador=';

        $scope.tracarRota = function () {

            console.log('tracar rota')

            var destination = [
                $scope.hospital.coordenadas.latitude,
                $scope.hospital.coordenadas.longitude
            ];

            $scope.formData = {
                dest: destination[0] + "," + destination[1]
                //dest: "RUA MARCELINA 441, SÃO PAULO - SP, BR"
                // HOSPITAL METROPOLITANO
            };

            $scope.$watch('formData', function (formData) {
                if (formData.start != "custom" || formData.custom_start) {
                    $('#start .custom input').removeClass('error');
                }
                if (formData.dest != "custom" || formData.custom_dest) {
                    $('#dest .custom input').removeClass('error');
                }
            }, true);

            // Validate
            if ($scope.formData.start == "custom" && !$scope.formData.custom_start) {
                $('#start .custom input').addClass('error');
                return;
            }

            if ($scope.formData.dest == "custom" && !$scope.formData.custom_dest) {
                $('#dest .custom input').addClass('error');
                return;
            }

            var start = $scope.formData.start == "custom" ? $scope.formData.custom_start : $scope.formData.start,
                dest = $scope.formData.dest == "custom" ? $scope.formData.custom_dest : $scope.formData.dest;

            NavigationService.navigate(dest, {
                start: start,
                enableDebug: true
            }).then(function () {
                alert("Navegação Iniciada.");
            }, function (err) {
                alert(err);
            });
        };

        $scope.abrirSite = function () {
            if ($scope.hospital.website == undefined)
                return;

            $window.open($scope.hospital.website, "_system", "location=yes");
        };

        $scope.Paciente = function (id) {

            $state.go("menu.pacientes", {
                Id_Usuario: $rootScope.id
                //     Id_Usuario: 1
            });

        };


        $scope.telefonarHospital = function () {
            if ($scope.hospital.telefone[0].DDD == undefined)
                return;

            var call = "tel:0" + $scope.hospital.telefone[0].DDD + $scope.hospital.telefone[0].numeroTelefone;
            document.location.href = call;
        };

        $scope.$on('$ionicView.beforeEnter', function () {
            console.log('Passo 5: detalhe do hospital número ' + $stateParams.idHospital)
            console.log('Passo 5: rootscope ' + $rootScope.buscaHospital)

            if ($rootScope.buscaHospital == 'especialidade') {
                HospitaisService.buscarHospital($stateParams.idHospital).then(function (data) {
                    $scope.hospital = data;
                    $localStorage.hospital = data;

                });
            }
            else if ($rootScope.buscaHospital == 'hospital') {
                HospitaisBuscaGeralService.buscarHospital($stateParams.idHospital).then(function (data) {
                    $scope.hospital = data;
                    $localStorage.hospital = data;

                });
            }
        });
    })
    .filter('extrairImagem', function () {
        return function (input) {
            if (typeof (input) == "undefined") {
                return "img/img_hospital_generica.jpg";
            } else {
                return 'data:image/jpeg;base64,' + input.buscarFotoResponseType.foto;
            }
        };
    })
    .directive('backImg', function () {
        return function (scope, element, attrs) {
            attrs.$observe('backImg', function (value) {
                element.css({
                    'background-image': 'url(data:image/jpeg;base64,' + value + ')',
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat'
                });
            });
        };
    });
