angular.module('app_hospitais.qrcode')

  .controller('QrcodeController', function ($scope, $ionicPopup, $state, $stateParams, $ionicLoading, NotificacoesService) {
    //$scope.service = NotificacoesService;
    // $scope.notificacoes = NotificacoesService.notificacoes;



    $scope.$on('$ionicView.loaded', function () {

      var dadosBusca = {

        Id_Usuario: $state.params.Id_Usuario,
        Id_unidade: $state.params.Id_unidade,
        Tipo_notificacao: $state.params.Tipo_notificacao,
        Sem_senhaAtendimento: $state.params.Sem_senhaAtendimento,
        chamada : $state.params.Chamada
      }

      QrcodeService.buscarNotificacoes(dadosBusca);

      $scope.notificacoes = [
        {
          date: 'Hoje',
          hour: '12:45',
          numeroPreTriagem: '123541321354787',
          numeroSenhaAtendimento: 'HRT 25486',
          hospital: 'HOSPITAL BENEFICÊNCIA PORTUGUESA SANTO ANDRÉ',
          especialidade: 'Clinico Geral',
          paciente: 'Albert Kellner Lescinskiene',
        },
        {
          date: 'Hoje',
          hour: '10:00',
          numeroPreTriagem: '38735413884358',
          numeroSenhaAtendimento: 'YTR 654123',
          hospital: 'HOSPITAL METROPOLITANO LAPA',
          especialidade: 'Ortopedista',
          paciente: 'Fulano Nome Genérico da Silva',
        },
      ];
    });

    $scope.visualizarNotificacoes = function () {
      //$state.go("menu.notificacoes");
    }

 /*   $scope.senhaAtendimento = function () {
      NotificacaoService.buscaSenhaAtendimento(dadosBusca).then(function (response) {
        $ionicPopup.alert({
          template: 'Numero :' + response.SenhaAtendimentosenha,
          title: 'Senha de atendimento',
          cssClass: 'alerta'
        });
          
      }, function (error) {
        $ionicPopup.alert({
          template: 'erro na busca da senha de Atendimento',
          title: 'Atenção',
          cssClass: 'alerta'
        });
     //   $route.reload();
      })

        //$state.go("menu.notificacoes");
      } */
  });
