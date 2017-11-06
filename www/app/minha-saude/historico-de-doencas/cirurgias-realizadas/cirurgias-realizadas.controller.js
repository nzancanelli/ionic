angular.module('app_hospitais.cirurgias_realizadas')

    .controller('CirurgiasRealizadasController', function ($scope, $state, CirurgiasRealizadasService, $ionicPopup, $rootScope) {
        
        CirurgiasRealizadasService.buscarCirurgiasRealizadas($rootScope.id).then(function (dados) {
            $scope.cirurgias = dados;
        }, function (erro) {
            $ionicPopup.alert({
                title: 'Ocorreu um erro, tente novamente mais tarde!'
            });
        });

        $scope.removerCirurgia = function (id) {
            CirurgiasRealizadasService.excluirCirurgiasRealizadas(id).then(function (dados) {
                $state.go($state.current, {}, { reload: true })
            }, function (erro) {
                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }
    })
    .controller('AdicionarCirurgiasRealizadasController', function ($scope, $state, CirurgiasRealizadasService, $ionicPopup, AppService, $filter, $rootScope) {
        $scope.listaCirurgiaDatas = [];
        $scope.cirurgia = {};
        $scope.cirurgia.Datas = [];
        $scope.cirurgiaData = {};
        $scope.opcoesData = [{ value: 'dias', label: 'dia(s)' }, { value: 'semanas', label: 'semana(s)' }, { value: 'meses', label: 'mese(s)' }, { value: 'anos', label: 'ano(s)' }];


        $scope.adicionarCirurgia = function () {

            var parametrosCirurgia = {
                IdUsuario: $rootScope.id,
                DescricaoCirurgia: $scope.cirurgia.DescricaoCirurgia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                Datas: $scope.listaCirurgiaDatas
            }

            //console.log(parametrosCirurgia)

            CirurgiasRealizadasService.salvarCirurgiasRealizadas(parametrosCirurgia).then(function (dados) {
                $state.go('menu.cirurgias-realizadas');
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

        $scope.cancelarCirurgia = function () {
            $scope.cirurgia = {};
            $scope.cirurgiaData = {};
            $state.go('menu.cirurgias-realizadas');
        }

        $scope.adicionarLista = function () {
            if (!$scope.cirurgiaData.tempoData || !$scope.cirurgiaData.valorData)
                return;

            var dataRelativa = AppService.transformarDataParaRelativa($scope.cirurgiaData.tempoData, $scope.cirurgiaData.valorData);

            var objFormatado = {
                IdCirurgia: $scope.cirurgia.Id,
                Ativo: true,
                DataRealizada: dataRelativa
            }

            $scope.cirurgia.Datas.push(objFormatado);

            var objReal = {
                IdCirurgia: $scope.cirurgia.Id,
                Ativo: true,
                DataRealizada: $filter('date')(dataRelativa, 'dd/MM/yyyy')
            }

            $scope.listaCirurgiaDatas.push(objReal);
            $scope.cirurgiaData = {};
            $scope.objCirurgia = {};
        }

        $scope.removerCirurgiaItem = function (item) {
            var index = $scope.cirurgia.Datas.indexOf(item);
            $scope.cirurgia.Datas.splice(index, 1);
        }


    })
    .controller('EditarCirurgiasRealizadasController', function ($scope, $state, CirurgiasRealizadasService, $ionicPopup, AppService, $filter) {
        $scope.cirurgia = angular.fromJson($state.params.cirurgia);
        $scope.listaCirurgiaDatas = angular.copy($scope.cirurgia.Datas);
        $scope.cirurgiaData = {};
        $scope.opcoesData = [{ value: 'dias', label: 'dia(s)' }, { value: 'semanas', label: 'semana(s)' }, { value: 'meses', label: 'mese(s)' }, { value: 'anos', label: 'ano(s)' }];


        $scope.adicionarCirurgia = function () {

            var parametrosCirurgia = {
                Id: $scope.cirurgia.Id,
                IdUsuario: $scope.cirurgia.IdUsuario,
                Ativo: true,
                DescricaoCirurgia: $scope.cirurgia.DescricaoCirurgia.replace(/[^\wáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ-\s]/gi, ''),
                Datas: $scope.listaCirurgiaDatas
            }

            //console.log(parametrosCirurgia)

            CirurgiasRealizadasService.editarCirurgiasRealizadas(parametrosCirurgia).then(function (dados) {
                $state.go('menu.cirurgias-realizadas');
            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!'
                });
            });
        }

        $scope.cancelarCirurgia = function () {
            $state.go('menu.cirurgias-realizadas');
        }

        $scope.adicionarLista = function () {
            if (!$scope.cirurgiaData.tempoData || !$scope.cirurgiaData.valorData)
                return;

            //console.log($scope.listaCirurgiaDatas)

            var dataRelativa = AppService.transformarDataParaRelativa($scope.cirurgiaData.tempoData, $scope.cirurgiaData.valorData);

            var objFormatado = {
                IdCirurgia: $scope.cirurgia.Id,
                Ativo: true,
                DataRealizada: dataRelativa
            }

            $scope.cirurgia.Datas.push(objFormatado);

            var objReal = {
                IdCirurgia: $scope.cirurgia.Id,
                Ativo: true,
                DataRealizada: $filter('date')(dataRelativa, 'dd/MM/yyyy')
            }

            $scope.listaCirurgiaDatas.push(objReal);
            //console.log($scope.listaCirurgiaDatas)
            $scope.cirurgiaData = {};
            $scope.objCirurgia = {};
        }

        $scope.removerCirurgiaItem = function (item) {
            var index = $scope.cirurgia.Datas.indexOf(item);
            $scope.cirurgia.Datas.splice(index, 1);
            var indexLista = $scope.listaCirurgiaDatas.indexOf(item);
            $scope.listaCirurgiaDatas.splice(indexLista, 1);
        }
    })
    ;


