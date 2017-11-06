angular.module('app_hospitais.antecedentes_pessoais')

    .controller('AntecedentesPessoaisController', function ($scope, $state, AntecedentePessoalService, $ionicPopup) {

        //TODO: alterar o id do usuario
        AntecedentePessoalService.buscarAntecendete(1).then(function (dados) {
            $scope.antecedentesP = dados;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        $scope.removerAntecedenteP = function (id_antecedente) {
            AntecedentePessoalService.excluirAntecendete(id_antecedente).then(function (dados) {
                $state.go($state.current, {}, { reload: true })
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });

        }
    })
    .controller('AdicionarAntecedentesPessoaisController', function ($scope, $state, AntecedentePessoalService, $ionicPopup) {

        $scope.antecedenteP = {};

        $scope.adicionarAntecedenteP = function () {
            var parametrosAntecedentesP = {
                IdUsuario: 1,
                DescricaoAntecedenteParametro: $scope.antecedenteP.DescricaoAntecedenteParametro.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '')
            }

            AntecedentePessoalService.salvarAntecendete(parametrosAntecedentesP).then(function (dados) {
                $state.go('menu.antecedentes-pessoais');
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });

        }

        $scope.cancelarAntecedenteP = function () {
            $scope.antecedenteP = {};
            $state.go('menu.antecedentes-pessoais');
        }
    })

    .controller('EditarAntecedentesPessoaisController', function ($scope, $state, AntecedentePessoalService, $ionicPopup) {

        $scope.antecedenteP = angular.fromJson($state.params.antecedente);

        $scope.adicionarAntecedenteP = function () {

            var parametrosAntecedentesP = {
                Id: $scope.antecedenteP.Id,
                IdUsuario: 1,
                DescricaoAntecedenteParametro: $scope.antecedenteP.DescricaoAntecedenteParametro.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                Ativo: true
            }

            AntecedentePessoalService.editarAntecendete(parametrosAntecedentesP).then(function (dados) {
                $state.go('menu.antecedentes-pessoais');
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });

        }

        $scope.cancelarAntecedenteP = function () {
            $scope.antecedenteP = {};
            $state.go('menu.antecedentes-pessoais');
        }
    })
    ;