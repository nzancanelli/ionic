(function () {
  'use strict';
  angular.module('app_hospitais.senha-atendimento', [])
    .service('senhaAtendimentoService', senhaAtendimentoService);

  senhaAtendimentoService.$inject = ['$q', '$http'];

  function senhaAtendimentoService($q, $http) {
    var result = {};
    var service = {
      gerarSenha: gerarSenha,
      result: result
    }
    return service;

    function gerarSenha(dadosUsuario) {
      var deferred = $q.defer();
        /*
      $http.post(AppSettings.apiEndpoint + 'Senha', dadosUsuario).then(function (response) {
        result = response.data;
        deferred.resolve(relsult);
      }, function (error) {
        deferred.reject(error);
      });*/
      return deferred.promise;
    }
  };
})();
