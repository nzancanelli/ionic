angular.module('app_hospitais.principal')

  .controller('PrincipalController', function ($scope, $rootScope, $ionicPopup, $state, $ionicLoading, $cordovaSocialSharing, $window, AppService, $ionicHistory, $cordovaBarcodeScanner, NotificacoesService) {
    $ionicHistory.clearHistory();

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

    $scope.mostrarNotificacoes = function () {
      $state.go("menu.notificacoes");
    };

    $scope.qrcode = function () {

      $cordovaBarcodeScanner.scan().then(function (imageData) {

        $state.go("menu.notificacoes", {

          Id_Usuario: $rootScope.id,
          Id_unidade: imageData.text,
          Id_unidade: 1234567890,
          Tipo_notificacao: 1,
          Sem_senhaAtendimento: true

        });

      }, function (error) {

        $ionicPopup.alert({
          template: 'Erro na leitura do QRCODE',
          title: 'Erro',
          cssClass: 'alerta'
        });
      });
    };


    $scope.visualizarMeusRemedios = function () {
      /*if ($scope.falhaComunicacao == true){
          $scope.inicializar();

          return;
      }

      if ($scope.necessarioAtualizar == true){
          $scope.verificarVersao();

          return;
      }

      if (AppService.configuracao.estaDisponivel == false){
          $ionicPopup.alert({
              template: AppService.configuracao.mensagemIndisponibilidade,
              title: 'Atenção'
          });

          return;
      }*/

      $state.go("menu.medicamentos");
    }

    $scope.visualizarMinhaSaude = function () {
      /*if ($scope.falhaComunicacao == true){
          $scope.inicializar();

          return;
      }

      if ($scope.necessarioAtualizar == true){
          $scope.verificarVersao();

          return;
      }

      if (AppService.configuracao.estaDisponivel == false){
          $ionicPopup.alert({
              template: AppService.configuracao.mensagemIndisponibilidade,
              title: 'Atenção'
          });

          return;
      }*/

      $state.go("menu.minha-saude");
    }

    $scope.visualizarHospitais = function () {

      $state.go("menu.hospitais-busca-geral");
    }

    $scope.$on('$ionicView.loaded', function () {
      try {
        cordova.plugins.diagnostic.isGpsLocationEnabled(function (enabled) {
          alert("GPS location is " + (enabled ? "enabled" : "disabled"));
        }, function (error) {
          alert("error");
        });
      } catch (e){
        console.log('falha no cordova')
      }
    });

  })
  .directive('allowOnlyNumbers', function () {
    return {
      restrict: 'A',
      link: function (scope, elm, attrs, ctrl) {
        elm.on('keydown', function (event) {
          var $input = $(this);
          var value = $input.val();
          value = value.replace(/[^0-9]/g, '')
          $input.val(value);
          if (event.which == 64 || event.which == 16) {
            // to allow numbers
            return false;
          } else if (event.which >= 48 && event.which <= 57) {
            // to allow numbers
            return true;
          } else if (event.which >= 96 && event.which <= 105) {
            // to allow numpad number
            return true;
          } else if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
            // to allow backspace, enter, escape, arrows
            return true;
          } else {
            event.preventDefault();
            // to stop others
            //alert("Sorry Only Numbers Allowed");
            return false;
          }
        });
      }
    }
  })

  .filter('decodeURIComponent', function () {
    return window.decodeURIComponent;
  });

