angular.module('app_hospitais.antecedentes_familiares')

    .controller('AntecedentesFamiliaresController', function ($scope, $state, AntecedenteFamiliarService, $ionicPopup) {

        //TODO: alterar o id do usuario
        AntecedenteFamiliarService.buscarAntecendete(1).then(function (dados) {           
            $scope.antecedentesF = dados;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        $scope.removerAntecedenteF = function (id_antecedente) {
            AntecedenteFamiliarService.excluirAntecendete(id_antecedente).then(function (dados) {
                $state.go($state.current, {}, { reload: true })
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });

        }
    })
    .controller('AdicionarAntecedentesFamiliaresController', function ($scope, $state, AntecedenteFamiliarService, $ionicPopup) {

        $scope.antecedenteF = {};
        $scope.antecedenteF.AntecedentesFamiliares = [];
        $scope.antecedente = {};

        $scope.adicionarAntecedenteF = function () {

            var parametrosAntecedentesF = {
                IdUsuario: 1,
                DescricaoParentesco: $scope.antecedenteF.DescricaoParentesco.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                AntecedentesFamiliares: $scope.antecedenteF.AntecedentesFamiliares
            }

            //console.log(parametrosAntecedentesF)
            AntecedenteFamiliarService.salvarAntecendete(parametrosAntecedentesF).then(function (dados) {

                $state.go('menu.antecedentes-familiares');
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });

        }

        $scope.cancelarAntecedenteF = function () {
            $scope.antecedenteF = {};
            $state.go('menu.antecedentes-familiares');
        }

        $scope.adicionarLista = function () {
            if ($scope.antecedente.Descricao) {
                $scope.antecedente.Descricao = $scope.antecedente.Descricao.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '');               
                $scope.antecedenteF.AntecedentesFamiliares.push($scope.antecedente);
                $scope.antecedente = {};
            }
        }

        $scope.removerAntecedente = function (item) {
            var index = $scope.antecedenteF.AntecedentesFamiliares.indexOf(item);
            $scope.antecedenteF.AntecedentesFamiliares.splice(index, 1);
        }

    })

    .controller('EditarAntecedentesFamiliaresController', function ($scope, $state, AntecedenteFamiliarService, $ionicPopup) {
      
        $scope.antecedenteF = angular.fromJson($state.params.antecedente);
        $scope.antecedente = {};

       
        $scope.adicionarAntecedenteF = function () {

            var parametrosAntecedentesF = {
                Id: $scope.antecedenteF.Id,
                IdUsuario: 1,
                DescricaoParentesco: $scope.antecedenteF.DescricaoParentesco.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                AntecedentesFamiliares: $scope.antecedenteF.AntecedentesFamiliares,
                Ativo: true
            }

            AntecedenteFamiliarService.editarAntecendete(parametrosAntecedentesF).then(function (dados) {
                $state.go('menu.antecedentes-familiares');
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });

        }

        $scope.cancelarAntecedenteF = function () {
            $state.go('menu.antecedentes-familiares');
        }


        $scope.adicionarLista = function () {
            if ($scope.antecedente.Descricao) {
                $scope.antecedente.novoItem = true;
                $scope.antecedente.Descricao = $scope.antecedente.Descricao.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, '');               
                $scope.antecedenteF.AntecedentesFamiliares.push($scope.antecedente);
                $scope.antecedente = {};
            }
        }

        $scope.removerAntecedente = function (item) {
            var index = $scope.antecedenteF.AntecedentesFamiliares.indexOf(item);
            $scope.antecedenteF.AntecedentesFamiliares.splice(index, 1);
        }


    })
    ;
