angular.module('app_hospitais.qrcode', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state("menu.qrcode", {
        url: "/notificacoes?Id_Usuario&Id_unidade&Tipo_notificacao&Sem_senhaAtendimento&Chamada",
        views: {
          'menuContent': {
            templateUrl: 'app/qrcode/qrcode.html',
            controller: 'QrcodeController',             
          }
        }
      })
  });
