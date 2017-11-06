(function () {
  'use strict';
  angular
    .module('app_hospitais.shared')
    .controller('AppController', appController);

  appController.$injectt = ['$scope', '$rootScope', '$ionicLoading', '$ionicPopup', '$state', '$localStorage', '$cordovaSocialSharing', '$window', 'AppService', 'ConnectivityMonitor', 'gpsService', 'senhaAtendimentoService', 'ngCordova'];

  function appController($scope, $rootScope, $ionicLoading, $ionicPopup, $state, $localStorage, $cordovaSocialSharing, $window, AppService, ConnectivityMonitor, gpsService, senhaAtendimentoService, $cordovaAppVersion) {
    $rootScope.appVersion = [];
    $rootScope.usuario = {};
    $rootScope.id = '';
    $rootScope.usuarioEmail = '';

    $scope.falhaComunicacao = false;
    $scope.necessarioAtualizar = false;
    $scope.usuario = {};
    $scope.usuario.email = '';
    $scope.usuario.senha = '';
    $scope.usuario.cpf = '';

    function getHospitalCoordinades() {
      return [
        { senhaPreTriagem: '1', latitude: '-23.5466730', longitude: '-46.6410355', minimumDistanceToSendArrival: '5' }, // 800mts
        { senhaPreTriagem: '2', latitude: '-23.5466729', longitude: '-46.7410341', minimumDistanceToSendArrival: '4' }  // 10km
      ];
    }

    function getGpsHeartbeatTime() {
      return 10000;
    }

    function generateSenhaAtendimentoOnRange(deviceLatitude, deviceLongitude, itemValue) {
      var compareLatitude = itemValue['latitude'];
      var compareLongitude = itemValue['longitude'];
      var minimumDistanceToSendArrival = itemValue['minimumDistanceToSendArrival'];

      var distanceInKilometers =
        gpsService.calculateDistance(compareLatitude, compareLongitude, deviceLatitude, deviceLongitude);

      if (distanceInKilometers <= minimumDistanceToSendArrival) {
        var senhaPreTriagem = itemValue['senhaPreTriagem'];
        senhaAtendimentoService.gerarSenha(senhaPreTriagem);
      }

      /*console.log(distanceInKilometers);
      console.log(distanceInKilometers <= minimumDistanceToSendArrival);*/
    }

    function gpsHeartbeat() {
      setTimeout(function () {
        gpsService.getCurrentLocation().then(function (position) {
          var coordinadesOfHospital = getHospitalCoordinades();

          var deviceLatitude = position.coords.latitude;
          var deviceLongitude = position.coords.longitude;

          angular.forEach(coordinadesOfHospital,
            function (value) {
              generateSenhaAtendimentoOnRange(deviceLatitude, deviceLongitude, value);
            });
        });
        gpsHeartbeat();
      }, getGpsHeartbeatTime());
    }

    $scope.verificarVersao = function () {
      console.log(ionic.Platform.isIOS());
      console.log(ionic.Platform.isAndroid());
      if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
        cordova.getAppVersion.getVersionNumber().then(function (version) {
          $rootScope.appVersion = version.split('.');

          var appInfo = AppService.buscarInformacaoAplicativo(ionic.Platform.platform());
          var versaoMinima = appInfo.versaoMinima.split('.');

          if (parseInt($scope.appVersion[0]) < parseInt(versaoMinima[0]) || parseInt($rootScope.appVersion[1]) < parseInt(versaoMinima[1])
            || parseInt($rootScope.appVersion[2]) < parseInt(versaoMinima[2])) {
            $scope.necessarioAtualizar = true;
            var alertPopup = $ionicPopup.alert({
              title: 'Atenção!',
              template: 'É necessário atualizar o aplicativo'
            });

            alertPopup.then(function () {
              $window.open(appInfo.urlLoja, '_system', 'location=yes');
            });
          }
        });
      }
    }

    $scope.inicializar = function () {
      //gpsHeartbeat();

      $scope.falhaComunicacao = false;
      //$ionicLoading.show();    
      //Uma sobreposição que pode ser usada para indicar atividade enquanto bloqueia a interação do usuário

      AppService.buscarConfiguracao().then(function (data) {
        //$ionicLoading.hide();

        if (data.estaDisponivel == false) {
          $ionicPopup.alert({
            template: data.mensagemIndisponibilidade,
            title: 'Atenção'
          });

          return;
        }

        if ($localStorage.get('primeiroAcesso') != 'false') {//Defini primeiro acesso no app com mensagem do tempo de espera nos hospitais
          $ionicPopup.alert({
            template: data.mensagemPrimeiroAcesso,
            title: 'Atenção'
          });

          $localStorage.set('primeiroAcesso', false);//Armazena no cache da aplicação para não exibir a mensagem pela segunda vez.
          return;
        }

        ConnectivityMonitor.startWatching();//Definie status de monitoramento on-line e off-line 
        $scope.verificarVersao();   //Defini atualizacao do app caso haja uma nova versao.         
      }, function () {
        $scope.falhaComunicacao = true;

        $ionicPopup.alert({
          template: 'Este aplicativo funciona através da internet. Por favor, ative o WI-FI ou conexão de dados.',
          title: 'Sem Conexão'
        });
        // $ionicLoading.hide();
      });
    }

    if (AppService.configuracao.estaDisponivel === false) {
      console.log('estaDisponivel' + AppService.configuracao.estaDisponivel);
      $ionicPopup.alert({
        template: AppService.configuracao.mensagemIndisponibilidade,
        title: 'Atenção'
      });
    }

    $scope.autenticar = function () {
      console.log('entrei');

      if ($scope.falhaComunicacao === true) {
        $scope.inicializar();

        return;
      }

      if ($scope.necessarioAtualizar === true) {
        $scope.verificarVersao();

        return;
      }

      if (AppService.configuracao.estaDisponivel === false) {
        $ionicPopup.alert({
          template: AppService.configuracao.mensagemIndisponibilidade,
          title: 'Atenção'
        });

        return;
      }

      var dadoslogin = {

        Email: $scope.usuario.email,
        Senha: $scope.usuario.senha,
        Token: ''
      }

      AppService.autenticar(dadoslogin).then(function (response) {

        var token = response;

        if (response == null) {
          $ionicPopup.alert({
            template: 'Verifique se esta correto o login e a senha!',
            title: 'Atenção',
            cssClass: 'alerta'
          });

        } else {

          if (response.UsuarioValidado) {
            $rootScope.usuarioEmail = response.Email; //TODO: Transformar em singleton
            $rootScope.usuario = response.Nome;
            $rootScope.id = response.Id; //TODO: Remover no refactor
            $rootScope.usuarioId = response.Id;

            if (response.FlAlterarSenha !== 'S') {
              var url;
              if (response.FlUsuarioInterno)
                url = 'UsuarioInterno/';
              else
                url = 'UsuarioExterno/';

              AppService.UsuarioLocal(response, url).then(function (data) {
                console.log('O id que veio é:' + response.Id);
                $localStorage.set('usuarioLogado', response.Nome);
                $state.go('menu.principal');

                $rootScope.id = data.Id; //TODO: Remover no refactor
                $rootScope.usuarioId = data.Id;
              });
            } else {
              $state.go('menu.alterarsenha');
            }
          }

        }

      }, function () {

        $ionicPopup.alert({

          template: 'Verifique se esta correto a o login e a senha!',
          title: 'Atenção'

        });
      });

    }

    //commented
    $scope.validarLogin = function () {
      var dadoslogin = {
        Email: $scope.usuario.email,
        Senha: $scope.usuario.senha,
        Token: ''
      }
      AppService.validarLogin(dadoslogin).then(function (response) {
        return response;
      }, function () {
        $ionicPopup.alert({
          template: 'Verifique se esta correto a o login e a senha!',
          title: 'Atenção'
        });
      });
    }

    $scope.cadastrar = function () {

      // $ionicPopup.alert({
      //           template: 'Verifique se esta correto a o login e a senha!',
      //           title: 'Atenção'});

      $state.go('menu.cadastrar');

    }

    $scope.verificarlogado = function () {

      if ($rootScope.usuario == null || (Object.keys($rootScope.usuario).length == 0)) {
        $state.go('menu.principal');
      }
    }

    $scope.inicializar();
  }
})();
