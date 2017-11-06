angular.module('app_hospitais.notificacoes', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state("menu.notificacoes", {
        url: "/notificacoes?Id_Usuario&Id_unidade&Tipo_notificacao&Sem_senhaAtendimento&Chamada",
        views: {
          'menuContent': {
            templateUrl: 'app/notificacoes/notificacoes.html',
            controller: 'NotificacoesController',             
          }
        }
      })
  });
