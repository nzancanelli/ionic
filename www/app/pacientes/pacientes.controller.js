angular.module('app_hospitais.pacientes')
  .controller('PacientesController', function ($rootScope, $scope, $ionicPopup, $state, $ionicModal, $ionicLoading, PacientesService, $timeout, $localStorage) {

    $scope.service = PacientesService;
    //$scope.idUsuario = $rootScope.usuarioId;
    PacientesService.Id_Usuario = $state.params.Id_Usuario;
    $scope.pacientes = {};
    $scope.id_paciente = {};
    $scope.id_pacienteAnterior = {};
    $scope.mostrarBotaoEditar = $scope.id_paciente.id > 0;
    $scope.model = {};
    $scope.mostrarBotaoCancelar = false;

    $scope.mostrarBotao = function () {
      $scope.mostrarBotaoCancelar = !$scope.mostrarBotaoCancelar;
    }

    PacientesService.obterPacientes($rootScope.usuarioId).then(function (dados) {
      $scope.pacientes = dados;
    });

    $scope.$on('$ionicView.loaded', function () {
    });

    $scope.detalharPesquisa = function (id) {
      if ($scope.modal != undefined)
        $scope.fecharPesquisa();

      $state.go("menu.detalhe-paciente", {
        id_paciente: id
      });
    };

    $scope.detalharPaciente = function (id) {

      $state.go("menu.detalhe-paciente", {
        id_paciente: id
      });
    };

    $scope.ValidarCheckUnchek = function (id, event) {

      if (id == $scope.id_pacienteAnterior.id) {
        $scope.id_paciente = {};
        $scope.id_pacienteAnterior = {};
        event.target.value = false;
      }
      else {
        $scope.id_pacienteAnterior.id = $scope.id_paciente.id;
      }
    };

    $ionicModal.fromTemplateUrl('app/pacientes/busca-pacientes.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.abrirPesquisa = function () {
      $scope.model.consulta = null;
      $scope.modal.show();
    };

    $scope.fecharPesquisa = function () {
      $scope.modal.hide();
    };

    $scope.data = {
      showDelete: false
    };

    $scope.onItemDelete = function (item, id_usuario) {
      $timeout(function () {
        $scope.pacientes.splice($scope.pacientes.indexOf(item), 1);
      }, 300);

      PacientesService.deletarPaciente(id_usuario).then(function (dados) {
        $state.go($state.current, {}, { reload: true })
      });
    };

    $scope.edit = function (item, id) {
      $state.go("detalhe-paciente", { id_paciente: id });
    };

    $scope.excluirPaciente = function (item, id_usuario) {
      $ionicPopup.show({
        title: 'Pacientes', subTitle: 'Tem certeza de deseja apagar o paciente?',
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
          $scope.onItemDelete(item, id_usuario);

        }
      }, function (err) {
        console.log('Err:', err);
      }, function (msg) {
        console.log('message:', msg);
      });
    };

    $scope.filtrar = function (item) {
      if (PacientesService.removerAcentos($scope.model.consulta) == undefined ||
        item.Nome.toLowerCase().indexOf(PacientesService.removerAcentos($scope.model.consulta.toLowerCase())) != -1)
        return true;

      return false;
    };

  });
