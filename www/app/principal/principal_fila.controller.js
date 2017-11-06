angular.module('app_hospitais.principal')

  .controller('PrincipalController', function ($scope, $rootScope, $ionicPopup, $state, $ionicLoading, $cordovaSocialSharing, $window, AppService) {

    function versaoFormatada() {
      if ($rootScope.appVersion.length == 0)
        return "0.0.0";
      return $rootScope.appVersion[0] + '.' + $rootScope.appVersion[1] + '.' + $rootScope.appVersion[2];
    }


    $scope.visualizarEspecialidades = function () {

      $state.go("menu.especialidades");
    }


    $scope.compartilhar = function () {
      var message = "Estou usando o ASM Med, achei que você gostaria de experimentar também.";
      var subject = "Aplicativo Sem Espera";

      message += "Você pode encontrar nosso aplicativo na Play Store (" + AppService.buscarInformacaoAplicativo('android').urlLoja
        + ") ou na Itunes Store (" + AppService.buscarInformacaoAplicativo('ios').urlLoja + ")."

      $cordovaSocialSharing
        .share(message, subject/*, file, link*/) // Share via native share sheet
        .then(function (result) {

        }, function (err) {

        });
    };

    $scope.mostrarInformativo = function () {
      if ($scope.falhaComunicacao == true)
        return;

      $ionicPopup.alert({
        template: '<p>' + AppService.configuracao.mensagemInformativo + '</p><p>Versão atual: ' + versaoFormatada() + '</p>',
        title: 'Atenção'
      });
    };

  });
