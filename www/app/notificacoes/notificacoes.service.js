(function () {
  'use strict';
  angular.module('app_hospitais.notificacoes')
    .service('NotificacoesService', notificacoesService);

  notificacoesService.$inject = ['$q', '$http'];

  function notificacoesService($q, $http) {
    var notificacoes = '';
    var service = {
      buscarNotificacoes: buscarNotificacoes,
      notificacoes: notificacoes
    }
    return service;

    function buscarNotificacoes(userId) {
      return $http({
        method: 'GET',
        url: AppSettings.apiEndpoint + 'notificacoes/' + userId,
        params: 'limit=10, sort_by=created:desc',
        headers: { 'Authorization': 'Token token=xxxxYYYYZzzz' }
      }).then(function (dataResponse) {
        return dataResponse.data;
      });
    }

    function buscarSenhaAtendimento() {
      notificacoes.splice(0, notificacoes.length);

      $http.get(AppSettings.apiEndpoint + '/buscarSenhaAtendimento').then(function () {
      });
    }
  };
})();
