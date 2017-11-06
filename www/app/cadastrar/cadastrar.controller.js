angular.module('app_hospitais.cadastrar')

  .controller('CadastrarController', function ($scope, $ionicPopup, $state, $ionicLoading, CadastrarService, $rootScope, $location) {
    $scope.service = CadastrarService;
    $scope.usuario = {};



    $scope.gravar = function () {

      var dadosUsuario = {

        nome: $scope.usuario.nome,
        email: $scope.usuario.email,
        cpf: $scope.usuario.cpf
      }

      CadastrarService.gravar(dadosUsuario).then(function (response) {
        $ionicPopup.alert({
          template: 'Usuário cadastrado com sucesso',
          title: 'Mensagem',
          cssClass: 'alerta'
        });

        $state.go('menu.alterarsenha');

      }, function (error) {

        $ionicPopup.alert({
          template: 'Erro na gravação do cadastro',
          title: 'Erro',
          cssClass: 'alerta'
        });

      })

    }

    $scope.cancelar = function () {

      $location.path('main');

    }

    $scope.$on('$ionicView.loaded', function (event) {
      $scope.usuario.nome = '';
    });



  });
