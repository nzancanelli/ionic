angular.module('app_hospitais.pacientes')
  .controller('FinalizarPreTriagemController', function ($scope, $ionicPopup, $state, PacientesService, $timeout, $localStorage, $rootScope, $location, $ionicHistory) {
    $scope.hospital = $localStorage.hospital;
    $scope.nmespecialidade = $rootScope.nmespecialidade;
    $scope.preferencfial = $rootScope.preferencial;
    $scope.nmpaciente = $rootScope.nmpaciente
    $scope.numpretriagem = $rootScope.numpretriagem;
    $scope.paciente = PacientesService.paciente
    console.log("pretriagem fim");

    $scope.VoltarParaHome = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $state.go('menu.principal');
    };

    $scope.finalizapretriagem = function () {
      var telefone_paciente = $scope.paciente.Telefone;
      var dadosPaciente = {
        IdUsuario: $rootScope.id,
        IdPaciente: $scope.paciente.Id,
        IdUnidade: 32,
        IdEspecialidade: $rootScope.especialidade,
        Especialidade: $scope.nmespecialidade,
        IdConvenio: $scope.paciente.IdConvenio,
        NumeroCarteirinha: $scope.paciente.NumeroMatricula,
        NomePaciente: $scope.paciente.Nome,
        DataNascimento: $scope.paciente.DataNascimento,
        CPF: $scope.paciente.CPF,
        DDD: telefone_paciente.substring(0, 2),
        Telefone: telefone_paciente.substring(2, ),
        Preferencial: $scope.preferencfial
        /*  CodigoCorporativo: 1,
          Especialidade: $rootScope.especialidade,
          Convenio: $scope.paciente.IdConvenio,
          NumeroMatricula: $scope.paciente.NumeroMatricula,
          DataNascimento: $scope.paciente.DataNascimento,
          Nome: $scope.paciente.Nome,
          CPF: $scope.paciente.CPF,
          Telefone: $scope.paciente.Telefone,
          Preferencial: $scope.preferencfial */
      }

      //  $state.go('menu.finalizacao-pretriagem');

      PacientesService.buscaSenhaPreTriagem(dadosPaciente).then(function (response) {
        $rootScope.numpretriagem = response.SenhaPreTriagem;
        $state.go('menu.finalizacao-pretriagem');
      }, function (error) {
        $ionicPopup.alert({
          template: 'erro na busca da senha de pre-triagem',
          title: 'Ateção',
          cssClass: 'alerta'
        });
      })

      var dadospretriagemvalida = {
        IdUsuario: $rootScope.id,
        IdPaciente: $scope.paciente.Id
      }

   /*   PacientesService.verificarPreTriagemValida(dadosPaciente.idUsuario, dadosPaciente.IdPaciente).then(function (response) {
        if (response == null) {
          PacientesService.buscaSenhaPreTriagem(dadospretriagemvalida).then(function (response) {
            $state.go('menu.finalizarPreTriagem');
          }, function (error) {
            $ionicPopup.alert({
              template: 'erro na busca da senha de pre-triagem',
              title: 'Ateção',
              cssClass: 'alerta'
            });
          })
        } else {
          $scope.pretriagemExistente = responde.data.numeroPretriagem;
          $ionicPopup.show({
            title: 'Pretriagem', subTitle: 'Paciente já tem pre-triagem ativa numero : ' + responde.data.numeroPretriagem +
            ' Deseja substituir por uma nova pré-triagem?',
            scope: $scope, buttons: [
              {
                text: 'Não',
                onTap: function (e) {
                  return 'Não';
                }
              },
              {
                text: '<b>Sim</b>',
                type: 'button-positive',
                onTap: function (e) {
                  return "Sim";
                }
              },]
          }).then(function (res) {
            if (res == 'Não') {
              $state.go($state.current, {}, { reload: true })
            }
            else {

              var dadoscancelamento = {

                IdPaciente: $scope.paciente.Id,
                Idpretriagem: $scope.pretriagemExistente

              }

              PacientesService.cancelaPreTriagem(dadoscancelamento).then(function (response) {
                $Scope.canceladaPretriagem = response.canceladaPretriagem;

              }, function (error) {
                $ionicPopup.alert({
                  template: 'Erro no cancelamento de pre-triagem',
                  title: 'Atenção',
                  cssClass: 'alerta'
                });

                if ($Scope.canceladaPretriagem) {
                  PacientesService.buscaSenhaPreTriagem(dadosPaciente).then(function (response) {
                    $rootScope.numpretriagem = response.SenhaPreTriagem;
                    $state.go('menu.finalizacao-pretriagem');
                  }, function (error) {
                    $ionicPopup.alert({
                      template: 'Erro na busca da senha de pre-triagem',
                      title: 'Atenção',
                      cssClass: 'alerta'
                    });
                  }
               
               $state.go($state.current, {}, { reload: true })
     
             }
              }, function (err) {
                console.log('Err:', err);
              }, function (msg) {
                console.log('message:', msg);
              });
            })  
        },

        $scope.Paciente = function () {
          $state.go("menu.pacientes", {
            Id_Usuario: $rootScope.id
          }); */
        }; 
    });
