angular
  .module('app_hospitais.notificacoes')
  .controller('NotificacoesController', NotificacoesController);

NotificacoesController.$inject = ['$scope', '$ionicPopup', '$state', '$stateParams', '$ionicLoading', 'NotificacoesService'];

function NotificacoesController($scope, $ionicPopup, $state, $stateParams, $ionicLoading, notificacoesService) {
  $scope.$on('$ionicView.loaded', function () {
    var userId = 1; //TODO: tirar Mock

    //var dadosBusca = {

    //  Id_Usuario: $state.params.Id_Usuario,
    //  Id_unidade: $state.params.Id_unidade,
    //  Tipo_notificacao: $state.params.Tipo_notificacao,
    //  Sem_senhaAtendimento: $state.params.Sem_senhaAtendimento,
    //  chamada : $state.params.Chamada
    //}

    notificacoesService.buscarNotificacoes(userId).then(function (dataResponse) {
      $scope.notificacoes = dataResponse;
    }, function () {
      $scope.notificacoes = [{ Menssagem: 'Não foi possivel trazer suas notificações' }];
    });
  });

  $scope.visualizarNotificacoes = function () {
    //$state.go("menu.notificacoes");
  }
}
