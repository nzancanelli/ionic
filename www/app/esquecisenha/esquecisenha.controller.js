angular.module('app_hospitais.esquecisenha')

    .controller('EsquecisenhaController', function ($scope, $ionicPopup, $state, $ionicLoading, EsquecisenhaService, $rootScope, $location) {
        $scope.service = EsquecisenhaService;
        $scope.usuario = {};


        $scope.enviaremail = function () {

            var dadosUsuario = {

                Email: $scope.usuario.email

            }

            //   var mensagem = 'Senha enviada para o e-mail ' +  $scope.usuario.email;
            //   $ionicPopup.alert({
            //      template: mensagem,
            //      title: 'Mensagem' 
            //     });  

            // $state.go('/main');
            // $location.path('main'); 

           
           // var dadosUsuario = { 

           // Email: 'flanders@yahoo.com',
           //    Senha: '"123456'
         //   }

            
            EsquecisenhaService.enviaremail(dadosUsuario).then(function (dados) {
                var mensagem = 'Senha enviada para o e-mail ' + $scope.usuario.email;
                $ionicPopup.alert({
                    template: 'Senha enviada para o e-mail ' + $scope.usuario.email,
                    title: 'Mensagem',
                    cssClass: 'alerta'

                });
               
                 $state.go('shared');

            }, function (erro) {

                $ionicPopup.alert({
                    title: 'Ocorreu um erro, tente novamente mais tarde!',
                    cssClass: 'alerta'
                });
            });           

        }

    });