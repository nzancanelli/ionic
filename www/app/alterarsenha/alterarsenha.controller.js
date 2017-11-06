
angular.module('app_hospitais.alterarsenha')

  .controller('AlterarsenhaController', function ($scope, $ionicPopup, $state, $ionicLoading, $rootScope, $location, AlterarsenhaService) {
    $scope.usuario = {};



    $scope.alterar = function () {

      var dadosUsuario = {
        Email: $rootScope.usuarioEmail,
        senhaAntiga: $scope.usuario.senhaantiga,
        senhaNova: $scope.usuario.senhanova
      }
      console.log(dadosUsuario);


      if ($scope.usuario.senhanova == $scope.usuario.confirmarsenha) {


        //    $ionicPopup.alert({
        //       template: 'email ta certo',
        //       title: 'ops'
        //   }); 

        //    $state.go('pacientes');   


        AlterarsenhaService.alterar(dadosUsuario).then(function (response) {
          $ionicPopup.alert({
            template: 'Usuário cadastrado com sucesso',
            title: 'Mensagem',
            cssClass: 'alerta'
          });

          $state.go('pacientes');

        }, function (error) {

          $ionicPopup.alert({
            template: 'Erro na gravação do cadastro',
            title: 'Erro',
            cssClass: 'alerta'
          });

        })

      } else {
        $ionicPopup.alert({
          template: 'email e confirmação não conferem!',
          title: 'Atenção',
          cssClass: 'alerta'
        });

      }
    }

    $scope.cancelar = function () {

      $location.path('main');;

    }

  });

angular.module('app_hospitais.alterarsenha')

  .controller('AlterarsenhaController', function ($scope, $ionicPopup, $state, $ionicLoading, $rootScope, $location, AlterarsenhaService) {
    $scope.usuario = {};



    $scope.alterar = function () {

      var dadosUsuario = {
        Email: $rootScope.usuarioEmail,
        senhaAntiga: $scope.usuario.senhaantiga,
        senhaNova: $scope.usuario.senhanova
      }



      if ($scope.usuario.senhanova == $scope.usuario.confirmarsenha) {


        //    $ionicPopup.alert({
        //       template: 'email ta certo',
        //       title: 'ops'
        //   });

        //    $state.go('pacientes');


        AlterarsenhaService.alterar(dadosUsuario).then(function (response) {
          $ionicPopup.alert({
            template: 'Usuário cadastrado com sucesso',
            title: 'Mensagem',
            cssClass: 'alerta'
          });

          $state.go('pacientes');

        }, function (error) {

          $ionicPopup.alert({
            template: 'Erro na gravação do cadastro',
            title: 'Erro',
            cssClass: 'alerta'
          });

        })

      } else {
        $ionicPopup.alert({
          template: 'email e confirmação não conferem!',
          title: 'Atenção',
          cssClass: 'alerta'
        });

      }
    }

    $scope.cancelar = function () {

      $location.path('main');

    }

  });
