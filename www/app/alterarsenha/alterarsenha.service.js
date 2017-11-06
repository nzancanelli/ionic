angular.module('app_hospitais.alterarsenha')

  .service('AlterarsenhaService', function ($q, $http) {

    var self = {

      result: {},


      alterar: function (dadosUsuario) {
        var deferred = $q.defer();

        $http.post(AppSettings.loginEndpoint + 'AlterarSenha', dadosUsuario).then(function (response) {
          self.relsult = response.data;

          deferred.resolve(self.relsult);

        }, function (error) {

          deferred.reject(error);
        });

        return deferred.promise;
      }
    }

    return self;
  });
