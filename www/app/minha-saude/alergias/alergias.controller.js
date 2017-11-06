angular.module('app_hospitais.alergias')

    .controller('AlergiasController', function ($scope, $state, AlergiasService, $ionicPopup, $rootScope) {
               
        AlergiasService.buscarAlergias($rootScope.id).then(function (dados) {
            $scope.alergias = dados;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        $scope.removerAlergia = function (id_alergia) {

            AlergiasService.excluirAlergia(id_alergia).then(function (dados) {
                $state.go($state.current, {}, { reload: true })
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

    })
    .controller('AdicionarAlergiasController', function ($scope, $state, AlergiasService, $ionicPopup, $rootScope) {

        $scope.alergia = {};

        $scope.adicionarAlergia = function () {

            var parametrosAlergia = {
                IdUsuario: $rootScope.id,
                NomeAlergia: $scope.alergia.NomeAlergia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                DescricaoAlergia: $scope.alergia.DescricaoAlergia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '')
            }

            AlergiasService.salvarAlergia(parametrosAlergia).then(function (dados) {
                $state.go('menu.alergias');
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

        $scope.cancelarAlergia = function () {
            $scope.alergia = {};
            $state.go('menu.alergias');
        }
    })

    .controller('EditarAlergiasController', function ($scope, $state, AlergiasService, $ionicPopup, $rootScope) {

        $scope.alergia = angular.fromJson($state.params.alergia);

        $scope.cancelarAlergia = function () {
            $state.go('menu.alergias');
        }

        $scope.adicionarAlergia = function () {
            var parametrosAlergia = {
                Id: $scope.alergia.Id,
                IdUsuario: $rootScope.id,
                NomeAlergia: $scope.alergia.NomeAlergia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                DescricaoAlergia: $scope.alergia.DescricaoAlergia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                Ativo: true
            }

            AlergiasService.editarAlergia(parametrosAlergia).then(function (dados) {
                $state.go('menu.alergias')
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

    })
    ;


