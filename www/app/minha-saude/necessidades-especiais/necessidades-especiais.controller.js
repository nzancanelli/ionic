angular.module('app_hospitais.necessidades-especiais')


    .controller('DetalheNecessidadesEspeciaisController', function ($scope, $state, NecessidadeEspecialService, $ionicPopup, $rootScope) {

        $scope.selecionadas = [];

        NecessidadeEspecialService.buscarItensNecessidadesEspeciais($rootScope.id).then(function (dados) {
            $scope.necessidades = dados;

            angular.forEach($scope.necessidades, function (necessidade) {
                if (necessidade.Checked == true) {
                    var id = { 'Id': necessidade.Id }
                    $scope.selecionadas.push(id);
                    $scope.nenhumaSelecao = false;
                }
                else {
                    $scope.nenhumaSelecao = true;
                }
            });

        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });


        $scope.Selecionar = function (ativo, necessidade) {
            var id = { 'Id': necessidade.Id }
            $scope.nenhumaSelecao = false;

            if (ativo) {
                $scope.selecionadas.push(id);
            }
            else {
                $scope.selecionadas.splice($scope.selecionadas.indexOf(id), 1);
            }
            //console.log($scope.selecionadas)
        };

        $scope.SelecionarNenhumaOpcao = function (necessidades, ativo) {
            if (ativo) {
                angular.forEach($scope.necessidades, function (item) {
                    item.Checked = false;
                });
                $scope.selecionadas = [];
            }
        }

        $scope.adicionarNecessidades = function () {

            var parametrosNecessidadesEspeciais = {
                IdUsuario: $rootScope.id,
                Itens: $scope.necessidadesUsuario
            }
            //console.log(parametrosNecessidadesEspeciais)

            NecessidadeEspecialService.salvarNecessidadesEspeciais(parametrosNecessidadesEspeciais).then(function (dados) {
                $state.go('menu.necessidades-especiais');
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }
    })

    .controller('NecessidadesEspeciaisController', function ($scope, $state, NecessidadeEspecialService, $ionicPopup, $rootScope) {
        $scope.exibeNecessidadeEspecais = false;

        $scope.atualizarNecessidades = function () {

            var parametrosNecessidadesEspeciais = {
                IdUsuario: $rootScope.id,
                Itens: $scope.necessidadesUsuario
            }
            //console.log(parametrosNecessidadesEspeciais)

            NecessidadeEspecialService.salvarNecessidadesEspeciais(parametrosNecessidadesEspeciais).then(function (dados) {
                $state.go('menu.necessidades-especiais');
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }




        //Carrega a home de Necessidades Especiais
        NecessidadeEspecialService.buscarItensNecessidadesEspeciais($rootScope.id).then(function (dados) {
            $scope.necessidadesUsuario = dados;            
            for (var i = 0; i < $scope.necessidadesUsuario.length; i++) {

                if ($scope.necessidadesUsuario[i].Checked == true)
                {
                    $scope.exibeNecessidadeEspecais = true;                 
                }
            }       
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

    });
